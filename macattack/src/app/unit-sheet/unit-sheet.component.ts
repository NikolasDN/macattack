import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Module, ModuleOrNull } from '../interfaces/module';
import { Weapon } from '../interfaces/weapon';
import { Hardware } from '../interfaces/hardware';
import { MAC, MACClass } from '../interfaces/mac';
import { AuxiliaryUnit } from '../interfaces/auxiliaryunit';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-unit-sheet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-sheet.component.html',
  styleUrl: './unit-sheet.component.css'
})
export class UnitSheetComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() unit: MAC | AuxiliaryUnit = {
    name: "(your unit name)",
    class: 1,
    modules: [],
    image: ""
  };
  @Input() printMode: boolean = false;
  @Output() unitChanged = new EventEmitter<MAC | AuxiliaryUnit>();
  @Output() deleteUnit = new EventEmitter<void>();

  constructor(private utils: UtilsService) {}

  isMAC(unit: MAC | AuxiliaryUnit): unit is MAC {
    return 'class' in unit;
  }

  isClass(unit: MAC | AuxiliaryUnit, classNum: number): boolean {
    return this.isMAC(unit) && unit.class === classNum;
  }

  isAuxiliaryType(unit: MAC | AuxiliaryUnit, type: 'infantry' | 'vehicle'): boolean {
    return !this.isMAC(unit) && unit.type === type;
  }

  isHitboxActive(unit: MAC | AuxiliaryUnit, hitboxIndex: number): boolean {
    if (this.isMAC(unit)) {
      // For MACs, only show hitboxes up to the class number
      return hitboxIndex < unit.class;
    } else {
      // For auxiliary units, show all hitboxes (they have their own styling)
      return true;
    }
  }

  getCost(unit: MAC | AuxiliaryUnit): number {
    return this.utils.getCost(unit);
  }

  selectText(event: MouseEvent) {
    (event.target as HTMLInputElement).select();
  }

  selectUnitType(type: string) {
    if (type.includes('MAC')) {
      const classNum = parseInt(type.split(' ')[1]);
      // Only reset modules if the class is actually changing
      if (!this.isMAC(this.unit) || this.unit.class !== classNum) {
        this.unit = {
          name: this.unit.name,
          class: classNum as MACClass,
          modules: [],
          image: this.unit.image,
          imageWidth: this.unit.imageWidth,
          imageHeight: this.unit.imageHeight
        };
        this.unitChanged.emit(this.unit);
      }
    } else if (type.includes('AU')) {
      const unitType = type.toLowerCase().includes('infantry') ? 'infantry' : 'vehicle';
      // Only reset modules if the type is actually changing
      if (this.isMAC(this.unit) || this.unit.type !== unitType) {
        this.unit = {
          name: this.unit.name,
          type: unitType,
          formationSize: 1,
          modules: [],
          image: this.unit.image,
          imageWidth: this.unit.imageWidth,
          imageHeight: this.unit.imageHeight
        };
        this.unitChanged.emit(this.unit);
      }
    }
  }

  getAvailableModules(unit: MAC | AuxiliaryUnit, slot: number): Module[] {
    return this.utils.allModules.filter(module => {
      if (module.type === 'hardware') {
        const applicableTo = module.hardware?.applicableTo;
        if (this.isMAC(unit)) {
          return applicableTo === 'M' || applicableTo === 'A';
        } else if (unit.type === 'infantry') {
          return applicableTo === 'I' || applicableTo === 'A';
        } else if (unit.type === 'vehicle') {
          return applicableTo === 'V' || applicableTo === 'A';
        }
      }
      if (module.type === 'weapon' && !module.weapon?.isBrawl) {
        if (this.isAuxiliaryType(unit, 'infantry') && (module.weapon?.power || 0) > 1) return false;
        if (this.isAuxiliaryType(unit, 'vehicle') && (module.weapon?.power || 0) > 2) return false;
        if (this.isMAC(unit) && slot === 1 && (module.weapon?.power || 0) > unit.class + 1) return false;
        if (this.isMAC(unit) && slot > 1 && (module.weapon?.power || 0) > unit.class) return false;
      }
      if (module.type === 'weapon' && module.weapon?.isBrawl) {
        if (this.isAuxiliaryType(unit, 'infantry') && (module.weapon?.power || 0) != 2) return false;
        if (this.isAuxiliaryType(unit, 'vehicle') && (module.weapon?.power || 0) != 1) return false;
        if (this.isMAC(unit) && (module.weapon?.power || 0) != unit.class) return false;
      }
      return true; // All weapons are available to all unit types
    });
  }

  getModuleName(module: Module | null): string {
    if (!module) return '';
    if (module.type === 'weapon' && module.weapon && module.weapon.subtype) {
      return `${module.weapon.range || ''}${module.weapon.type}${module.weapon.power}-${module.weapon.subtype || ''} ${module.weapon.name}`;
    }
    if (module.type === 'weapon' && module.weapon) {
      return `${module.weapon.range || ''}${module.weapon.type}${module.weapon.power} ${module.weapon.name}`;
    }
    return module.hardware?.name || '';
  }

  getModuleEffect(module: Module | null): string {
    if (!module) return '';
    
    if (module.type === 'weapon') {
      return "";// `${module.weapon?.name || ''} (${module.weapon?.power || 0})`;
    } else if (module.type === 'hardware') {
      return module.hardware?.effect || '';
    }
    return '';
  }

  selectModule(index: number, module: Module | null) {
    if (index >= 0 && index < 6) {
      // Ensure the modules array has enough slots
      while (this.unit.modules.length <= index) {
        this.unit.modules.push({
          type: 'weapon',
          status: 'intact'
        });
      }
      this.unit.modules[index] = module || {
        type: 'weapon', 
        status: 'intact'
      };
      this.unitChanged.emit(this.unit);
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          // Create a temporary image to get dimensions
          const img = new Image();
          img.onload = () => {
            // Store the original image dimensions
            this.unit.imageWidth = img.naturalWidth;
            this.unit.imageHeight = img.naturalHeight;
            
            // Create a canvas to resize the image
            const canvas = document.createElement('canvas');
            canvas.width = 399;
            canvas.height = 217;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
              // Draw the image scaled to fit
              ctx.drawImage(img, 0, 0, 399, 217);
              
              // Determine the output format based on the input file type
              let outputFormat = 'image/png';
              let quality = 0.9;
              
              if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                outputFormat = 'image/jpeg';
              }
              
              // Convert to base64 with appropriate format
              const dataUrl = canvas.toDataURL(outputFormat, quality);
              const base64 = dataUrl.split(',')[1];
              
              // Store the format information in the image data
              // We'll prefix the base64 data with the format type
              const formatPrefix = outputFormat === 'image/jpeg' ? 'jpeg:' : 'png:';
              this.unit.image = formatPrefix + base64;
              this.unitChanged.emit(this.unit);
            }
          };
          img.src = e.target.result as string;
        }
      };
      
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    if (!this.printMode) {
      this.fileInput.nativeElement.click();
    }
  }

  getImageSrc(imageData: string): string {
    // Handle empty or null image data
    if (!imageData || imageData === '') {
      return '';
    }
    
    // Check if the image data has a format prefix
    if (imageData.startsWith('jpeg:')) {
      return 'data:image/jpeg;base64,' + imageData.substring(5);
    } else if (imageData.startsWith('png:')) {
      return 'data:image/png;base64,' + imageData.substring(4);
    } else {
      // For backward compatibility, assume PNG format for existing data
      return 'data:image/png;base64,' + imageData;
    }
  }

  getImageStyle(): string {
    if (!this.unit.imageWidth || !this.unit.imageHeight) {
      // Fallback to default styling if dimensions are not available
      return 'object-fit: contain; display: block; margin: auto; max-width: 100%; max-height: 132px; border: 1px solid #ddd; background-color: #f9f9f9;';
    }

    // Calculate the aspect ratio
    const aspectRatio = this.unit.imageWidth / this.unit.imageHeight;
    const containerWidth = 292; // 300px - 8px padding
    const containerHeight = 132;

    // Calculate the scaled dimensions that fit within the container
    let scaledWidth, scaledHeight;
    
    if (aspectRatio > containerWidth / containerHeight) {
      // Image is wider than container aspect ratio - fit to width
      scaledWidth = containerWidth;
      scaledHeight = containerWidth / aspectRatio;
    } else {
      // Image is taller than container aspect ratio - fit to height
      scaledHeight = containerHeight;
      scaledWidth = containerHeight * aspectRatio;
    }

    return `width: ${scaledWidth}px; height: ${scaledHeight}px; display: block; margin: auto; border: 1px solid #ddd; background-color: #f9f9f9;`;
  }
}
