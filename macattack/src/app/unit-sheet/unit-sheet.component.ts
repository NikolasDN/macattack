import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Module } from '../interfaces/module';
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
  @Input() unit: MAC | AuxiliaryUnit = {
    name: "(your unit name)",
    class: 1,
    modules: []
  };
  @Output() unitChanged = new EventEmitter<MAC | AuxiliaryUnit>();

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

  getCost(unit: MAC | AuxiliaryUnit): number {
    return this.utils.getCost(unit);
  }

  selectUnitType(type: string) {
    if (type.includes('MAC')) {
      const classNum = parseInt(type.split(' ')[1]);
      this.unit = {
        name: this.unit.name,
        class: classNum as MACClass,
        modules: []
      };
    } else if (type.includes('AU')) {
      const unitType = type.toLowerCase().includes('infantry') ? 'infantry' : 'vehicle';
      this.unit = {
        name: this.unit.name,
        type: unitType,
        formationSize: 1, 
        modules: []
      };
    }
    this.unitChanged.emit(this.unit);
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
      if (module.type === 'weapon') {
        if (this.isAuxiliaryType(unit, 'infantry') && (module.weapon?.power || 0) > 1) return false;
        if (this.isAuxiliaryType(unit, 'vehicle') && (module.weapon?.power || 0) > 2) return false;
        if (this.isMAC(unit) && slot === 1 && (module.weapon?.power || 0) > unit.class + 1) return false;
        if (this.isMAC(unit) && slot > 1 && (module.weapon?.power || 0) > unit.class) return false;
      }
      return true; // All weapons are available to all unit types
    });
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
    }
  }

  getModuleName(module: Module | null): string {
    if (!module) return '';
    if (module.type === 'weapon' && module.weapon) {
      return `${module.weapon.range || ''}${module.weapon.type}${module.weapon.power}-${module.weapon.subtype || ''} ${module.weapon.name}`;
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
}
