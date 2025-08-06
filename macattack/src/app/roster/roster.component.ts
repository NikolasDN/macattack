import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitSheetComponent } from '../unit-sheet/unit-sheet.component';
import { FormsModule } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { Force } from '../interfaces/force';
import { MAC } from '../interfaces/mac';
import { AuxiliaryUnit } from '../interfaces/auxiliaryunit';
import { Module, ModuleOrNull } from '../interfaces/module';
import { ImagesService } from '../services/images.service';

interface SavedForce {
  key: string;
  date: Date;
  force: Force;
}

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
  standalone: true,
  imports: [CommonModule, UnitSheetComponent, FormsModule]
})
export class RosterComponent implements OnInit {
  force: Force = {
    name: "(your force name)",
    pointsLimit: 50,
    units: []
  };
  validationMessages: string[] = [];
  savedForces: SavedForce[] = [];
  printMode: boolean = false;

  constructor(private utils: UtilsService, private images: ImagesService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSavedForces();
  }

  selectText(event: MouseEvent) {
    (event.target as HTMLInputElement).select();
  }

  newForce() {
    // Reset the current force to a new empty force
    this.force = {
      name: "(your force name)",
      pointsLimit: 50,
      units: []
    };
    this.validationMessages = [];
  }

  addUnitSheet() {
    const newMAC: MAC = {
      name: "(your unit name)",
      class: 1,
      modules: [],
      image: this.images.getDefaultImage()
    };
    this.force.units.push(newMAC);
    this.validateForce();
  }

  removeUnitSheet(index: number) {
    this.force.units.splice(index, 1);
    this.validateForce();
  }

  onUnitChanged(unit: MAC | AuxiliaryUnit, index: number) {
    this.force.units[index] = unit;
    this.validateForce();
  }

  validateForce() {
    this.validationMessages = [];
    const macs = this.force.units.filter(unit => this.utils.isMAC(unit));
    const auxiliaries = this.force.units.filter(unit => !this.utils.isMAC(unit));

    if (macs.length < 3) {
      this.validationMessages.push("Your force needs to consist of at least 3 MACs");
    }

    if (auxiliaries.length > macs.length) {
      this.validationMessages.push("You cannot have more auxiliary units than MACs");
    }

    // Check if any MAC has incomplete modules
    const hasIncompleteMACs = macs.some(mac => mac.modules.length !== 6);
    if (hasIncompleteMACs) {
      this.validationMessages.push("Not all MACs have 6 modules");
    }

    // Check brawl weapon restrictions
    this.force.units.forEach(unit => {
      const brawlWeapons = unit.modules.filter(m => m && m.type === 'weapon' && m.weapon?.isBrawl);
      if (brawlWeapons.length > 2) {
        this.validationMessages.push(`${unit.name} has more than 2 brawl weapons`);
      }
      if (brawlWeapons.length === 2) {
        const firstBrawlType = brawlWeapons[0]?.weapon?.name;
        const secondBrawlType = brawlWeapons[1]?.weapon?.name;
        if (firstBrawlType !== secondBrawlType) {
          this.validationMessages.push(`${unit.name} has different types of brawl weapons`);
        }
      }
    });
  }

  getTotalCost(force: Force = this.force): number {
    return force.units.reduce((total, unit) => total + this.utils.getCost(unit), 0);
  }

  saveForce() {
    if (!this.force.name.trim()) {
      return;
    }
    
    try {
      const key = `force_${this.force.name.trim().toLowerCase().replace(/\s+/g, '_')}`;
      
      // Save the force with image data to preserve uploaded images
      const savedForce: SavedForce = {
        key,
        date: new Date(),
        force: JSON.parse(JSON.stringify(this.force))
      };
      
      // Try to save the force
      localStorage.setItem(key, JSON.stringify(savedForce));
      this.loadSavedForces();
      
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        // Handle quota exceeded error
        this.handleStorageQuotaExceeded();
      } else {
        console.error('Error saving force:', error);
        alert('Error saving force. Please try again.');
      }
    }
  }

  private handleStorageQuotaExceeded() {
    // Try to free up space by removing old saved forces
    const savedForces = this.getSavedForcesList();
    
    if (savedForces.length > 5) {
      // Remove oldest forces to free up space
      const forcesToRemove = savedForces.slice(5); // Keep only the 5 newest
      
      forcesToRemove.forEach(force => {
        localStorage.removeItem(force.key);
      });
      
      // Try saving again
      try {
        const key = `force_${this.force.name.trim().toLowerCase().replace(/\s+/g, '_')}`;
        
        const savedForce: SavedForce = {
          key,
          date: new Date(),
          force: JSON.parse(JSON.stringify(this.force))
        };
        
        localStorage.setItem(key, JSON.stringify(savedForce));
        this.loadSavedForces();
      } catch (error) {
        console.error('Still cannot save after cleanup:', error);
        alert('Cannot save force. Storage is full. Please delete some saved forces manually.');
      }
    } else {
      alert('Cannot save force. Storage is full. Please delete some saved forces manually.');
    }
  }

  private getSavedForcesList(): SavedForce[] {
    const forces: SavedForce[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('force_')) {
        try {
          const savedForce = JSON.parse(localStorage.getItem(key) || '');
          forces.push(savedForce);
        } catch (error) {
          console.error('Error parsing saved force:', error);
          // Remove corrupted data
          localStorage.removeItem(key);
        }
      }
    }
    // Sort by date, newest first
    return forces.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  isForceNameValid(): boolean {
    return this.force.name.trim().length > 0;
  }

  loadForce(force: Force) {
    // Deep copy the force
    const loadedForce = JSON.parse(JSON.stringify(force));
    
    // Reconstruct modules for each unit and restore default images if needed
    loadedForce.units = loadedForce.units.map((unit: MAC | AuxiliaryUnit) => {
      if (unit.modules) {
        unit.modules = unit.modules
          .map((module: Module | null) => {
            if (module) {
              // Find the matching module from allModules to ensure proper structure
              const matchingModule = this.utils.allModules.find(m => {
                if (module.type === 'weapon' && m.type === 'weapon') {
                  return m.weapon?.name === module.weapon?.name;
                } else if (module.type === 'hardware' && m.type === 'hardware') {
                  return m.hardware?.name === module.hardware?.name;
                }
                return false;
              });
              return matchingModule || module;
            }
            return null;
          })
          .filter((module): module is Module => module !== null);
      }
      
      // Restore default image only if the image is empty (for backward compatibility)
      if (!unit.image || unit.image === '') {
        unit.image = this.images.getDefaultImage();
      }
      
      return unit;
    });

    this.force = loadedForce;
    this.validateForce();
  }

  deleteSavedForce(key: string) {
    localStorage.removeItem(key);
    this.loadSavedForces();
  }

  private loadSavedForces() {
    this.savedForces = this.getSavedForcesList();
  }

  printRoster() {
    this.printMode = true;
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        this.printMode = false;
      }, 100);
    }, 100);
  }

  generateRandomForce() {
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
      // Clear current force
      this.force.units = [];
      
      // Generate 3 MACs (minimum requirement)
      const macNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa'];
      const macClasses = [1, 2, 3] as const;
      
          // Generate 3 MACs with random classes
    for (let i = 0; i < 3; i++) {
      const macClass = macClasses[Math.floor(Math.random() * macClasses.length)];
      const modules = this.generateRandomModulesForMAC(macClass);
      const mac: MAC = {
        name: macNames[i] || `MAC-${i + 1}`,
        class: macClass,
        modules: [...modules], // Create a new array to ensure change detection
        image: this.images.getDefaultImage()
      };
      this.force.units.push(mac);
    }
      
      // Calculate current cost after MACs
      let currentCost = this.getTotalCost();
      let remainingPoints = 50 - currentCost;
      
      // If we have points left, try to add auxiliary units
      if (remainingPoints >= 1) {
        const auxTypes = ['infantry', 'vehicle'] as const;
        const maxAuxUnits = Math.min(3, Math.floor(remainingPoints / 1)); // Minimum cost for aux unit is 1
        
        for (let i = 0; i < maxAuxUnits && remainingPoints > 0; i++) {
          const auxType = auxTypes[Math.floor(Math.random() * auxTypes.length)];
          const modules = this.generateRandomModulesForAuxiliary(auxType);
          const aux: AuxiliaryUnit = {
            name: `AU-${i + 1}`,
            type: auxType,
            formationSize: 1, // Start with formation size 1
            modules: [...modules], // Create a new array to ensure change detection
            image: this.images.getDefaultImage()
          };
          this.force.units.push(aux);
          
          // Recalculate cost
          currentCost = this.getTotalCost();
          remainingPoints = 50 - currentCost;
        }
      }
      
      // If we're over 50 points, try to reduce cost by adjusting modules
      if (currentCost > 50) {
        this.adjustForceToTargetCost(50);
        currentCost = this.getTotalCost();
      }
      
      // If we're under 50 points, try to add more modules or increase formation sizes
      if (currentCost < 50) {
        this.adjustForceToTargetCost(50);
        currentCost = this.getTotalCost();
      }
      
      // If we got exactly 50 points, we're done!
      if (currentCost === 50) {
        break;
      }
      
      attempts++;
    }
    
    // Debug: log the modules for each unit
    console.log('Generated force modules:');
    this.force.units.forEach((unit, index) => {
      console.log(`Unit ${index} (${unit.name}):`, unit.modules);
    });
    
    // Force change detection to update the UI
    this.cdr.detectChanges();
    
    // Trigger validation to ensure UI updates
    setTimeout(() => {
      this.validateForce();
      this.cdr.detectChanges();
    }, 0);
  }

  private generateRandomModulesForMAC(macClass: number): ModuleOrNull[] {
    const modules: ModuleOrNull[] = [];
    
    // Initialize with 6 null slots first
    for (let i = 0; i < 6; i++) {
      modules.push(null);
    }
    
    // Fill all 6 module slots with random modules using the same filtering as the dropdown
    for (let i = 0; i < 6; i++) {
      const slot = i + 1; // Slot numbers are 1-based
      const availableModules = this.getAvailableModulesForMAC(macClass, slot);
      
      if (availableModules.length > 0) {
        const randomModule = availableModules[Math.floor(Math.random() * availableModules.length)];
        // Create a proper deep copy of the module
        if (randomModule.type === 'weapon') {
          modules[i] = {
            type: 'weapon',
            weapon: { ...randomModule.weapon! }
          };
        } else if (randomModule.type === 'hardware') {
          modules[i] = {
            type: 'hardware',
            hardware: { ...randomModule.hardware! }
          };
        }
      }
    }
    
    // Ensure brawl weapon restrictions are met
    this.fixBrawlWeaponRestrictions(modules);
    
    return modules;
  }

  private getAvailableModulesForMAC(macClass: number, slot: number): Module[] {
    return this.utils.allModules.filter(module => {
      if (module.type === 'hardware') {
        const applicableTo = module.hardware?.applicableTo;
        return applicableTo === 'M' || applicableTo === 'A';
      }
      if (module.type === 'weapon' && !module.weapon?.isBrawl) {
        if (slot === 1 && (module.weapon?.power || 0) > macClass + 1) return false;
        if (slot > 1 && (module.weapon?.power || 0) > macClass) return false;
      }
      if (module.type === 'weapon' && module.weapon?.isBrawl) {
        if ((module.weapon?.power || 0) != macClass) return false;
      }
      return true;
    });
  }

  private generateRandomModulesForAuxiliary(auxType: 'infantry' | 'vehicle'): ModuleOrNull[] {
    const modules: ModuleOrNull[] = [];
    const availableModules = this.getAvailableModulesForAuxiliary(auxType);
    
    // Add 1-3 modules for auxiliary units
    const moduleCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < moduleCount; i++) {
      if (availableModules.length > 0) {
        const randomModule = availableModules[Math.floor(Math.random() * availableModules.length)];
        // Create a proper deep copy of the module
        if (randomModule.type === 'weapon') {
          modules.push({
            type: 'weapon',
            weapon: { ...randomModule.weapon! }
          });
        } else if (randomModule.type === 'hardware') {
          modules.push({
            type: 'hardware',
            hardware: { ...randomModule.hardware! }
          });
        }
      }
    }
    
    return modules;
  }

  private getAvailableModulesForAuxiliary(auxType: 'infantry' | 'vehicle'): Module[] {
    return this.utils.allModules.filter(module => {
      if (module.type === 'hardware') {
        const applicableTo = module.hardware?.applicableTo;
        if (auxType === 'infantry') {
          return applicableTo === 'I' || applicableTo === 'A';
        } else { // vehicle
          return applicableTo === 'V' || applicableTo === 'A';
        }
      }
      if (module.type === 'weapon' && !module.weapon?.isBrawl) {
        if (auxType === 'infantry' && (module.weapon?.power || 0) > 1) return false;
        if (auxType === 'vehicle' && (module.weapon?.power || 0) > 2) return false;
      }
      if (module.type === 'weapon' && module.weapon?.isBrawl) {
        if (auxType === 'infantry' && (module.weapon?.power || 0) != 2) return false;
        if (auxType === 'vehicle' && (module.weapon?.power || 0) != 1) return false;
      }
      return true;
    });
  }

  private fixBrawlWeaponRestrictions(modules: ModuleOrNull[]): void {
    const brawlWeapons = modules.filter(m => m && m.type === 'weapon' && m.weapon?.isBrawl);
    
    if (brawlWeapons.length > 2) {
      // Remove excess brawl weapons, keeping only 2
      const nonBrawlModules = modules.filter(m => m && !(m.type === 'weapon' && m.weapon?.isBrawl));
      const brawlWeaponTypes = new Set(brawlWeapons.map(w => w?.weapon?.name));
      
      // Keep only 2 brawl weapons of the same type
      const weaponType = Array.from(brawlWeaponTypes)[0];
      const sameTypeBrawl = brawlWeapons.filter(w => w?.weapon?.name === weaponType).slice(0, 2);
      
      // Clear and rebuild the modules array
      modules.length = 0;
      modules.push(...nonBrawlModules, ...sameTypeBrawl);
      
      // Ensure exactly 6 slots for MACs
      while (modules.length < 6) {
        modules.push(null);
      }
      
              // Fill remaining slots with random non-brawl modules
        // We need to determine the MAC class to get proper filtering
        // For now, use a default approach that avoids brawl weapons
        const availableModules = this.utils.allModules.filter(m => !(m.type === 'weapon' && m.weapon?.isBrawl));
        for (let i = 0; i < modules.length; i++) {
          if (modules[i] === null) {
            const randomModule = availableModules[Math.floor(Math.random() * availableModules.length)];
            if (randomModule.type === 'weapon') {
              modules[i] = {
                type: 'weapon',
                weapon: { ...randomModule.weapon! }
              };
            } else if (randomModule.type === 'hardware') {
              modules[i] = {
                type: 'hardware',
                hardware: { ...randomModule.hardware! }
              };
            }
          }
        }
    } else if (brawlWeapons.length === 2) {
      // Ensure both brawl weapons are the same type
      const firstType = brawlWeapons[0]?.weapon?.name;
      const secondType = brawlWeapons[1]?.weapon?.name;
      
      if (firstType !== secondType) {
        // Replace the second brawl weapon with the same type as the first
        const nonBrawlModules = modules.filter(m => m && !(m.type === 'weapon' && m.weapon?.isBrawl));
        const firstBrawl = brawlWeapons[0];
        
        // Clear and rebuild the modules array
        modules.length = 0;
        modules.push(...nonBrawlModules, firstBrawl, { 
          type: 'weapon',
          weapon: { ...firstBrawl!.weapon! }
        });
        
        // Ensure exactly 6 slots for MACs
        while (modules.length < 6) {
          modules.push(null);
        }
        
        // Fill remaining slots
        const availableModules = this.utils.allModules.filter(m => !(m.type === 'weapon' && m.weapon?.isBrawl));
        for (let i = 0; i < modules.length; i++) {
          if (modules[i] === null) {
            const randomModule = availableModules[Math.floor(Math.random() * availableModules.length)];
            if (randomModule.type === 'weapon') {
              modules[i] = {
                type: 'weapon',
                weapon: { ...randomModule.weapon! }
              };
            } else if (randomModule.type === 'hardware') {
              modules[i] = {
                type: 'hardware',
                hardware: { ...randomModule.hardware! }
              };
            }
          }
        }
      }
    }
    
    // Final check: ensure exactly 6 slots for MACs
    while (modules.length < 6) {
      modules.push(null);
    }
    if (modules.length > 6) {
      modules.length = 6;
    }
  }

  private adjustForceToTargetCost(targetCost: number): void {
    const currentCost = this.getTotalCost();
    const difference = targetCost - currentCost;
    
    if (difference === 0) return;
    
    if (difference > 0) {
      // Need to add points - try to add modules or increase formation sizes
      this.addPointsToForce(difference);
    } else {
      // Need to remove points - try to remove modules or decrease formation sizes
      this.removePointsFromForce(Math.abs(difference));
    }
  }

  private addPointsToForce(pointsToAdd: number): void {
    let remainingPoints = pointsToAdd;
    
    // First, try to increase auxiliary unit formation sizes
    const auxUnits = this.force.units.filter(unit => !this.utils.isMAC(unit)) as AuxiliaryUnit[];
    for (const aux of auxUnits) {
      if (remainingPoints <= 0) break;
      
      const currentCost = this.utils.getCost(aux);
      const maxFormationSize = Math.min(5, aux.formationSize + Math.floor(remainingPoints / (currentCost / aux.formationSize)));
      
      if (maxFormationSize > aux.formationSize) {
        const costIncrease = (maxFormationSize - aux.formationSize) * (currentCost / aux.formationSize);
        if (costIncrease <= remainingPoints) {
          aux.formationSize = maxFormationSize;
          remainingPoints -= costIncrease;
        }
      }
    }
    
    // Then try to add modules to MACs
    const macs = this.force.units.filter(unit => this.utils.isMAC(unit)) as MAC[];
    for (const mac of macs) {
      if (remainingPoints <= 0) break;
      
      // Find empty module slots
      const emptySlots = [];
      for (let i = 0; i < 6; i++) {
        if (!mac.modules[i] || mac.modules[i] === null) {
          emptySlots.push(i);
        }
      }
      
      // Add modules to empty slots
      for (const slot of emptySlots) {
        if (remainingPoints <= 0) break;
        
        const availableModules = this.utils.allModules.filter(module => {
          if (module.type === 'hardware') {
            return module.hardware?.applicableTo === 'M';
          }
          return true;
        });
        
        const randomModule = availableModules[Math.floor(Math.random() * availableModules.length)];
        if (randomModule.type === 'weapon') {
          mac.modules[slot] = {
            type: 'weapon',
            weapon: { ...randomModule.weapon! }
          };
        } else if (randomModule.type === 'hardware') {
          mac.modules[slot] = {
            type: 'hardware',
            hardware: { ...randomModule.hardware! }
          };
        }
        
        remainingPoints -= 1; // Assume each module costs at least 1 point
      }
    }
  }

  private removePointsFromForce(pointsToRemove: number): void {
    let remainingPoints = pointsToRemove;
    
    // First, try to decrease auxiliary unit formation sizes
    const auxUnits = this.force.units.filter(unit => !this.utils.isMAC(unit)) as AuxiliaryUnit[];
    for (const aux of auxUnits) {
      if (remainingPoints <= 0) break;
      
      if (aux.formationSize > 1) {
        const costDecrease = aux.formationSize - 1;
        aux.formationSize = 1;
        remainingPoints -= costDecrease;
      }
    }
    
    // Then try to remove modules from MACs (starting with the most expensive ones)
    const macs = this.force.units.filter(unit => this.utils.isMAC(unit)) as MAC[];
    for (const mac of macs) {
      if (remainingPoints <= 0) break;
      
      // Sort modules by cost (weapons with higher power first, then hardware)
      const moduleSlots = mac.modules.map((module, index) => ({ module, index }))
        .filter(item => item.module !== null)
        .sort((a, b) => {
          const aCost = a.module!.type === 'weapon' ? (a.module!.weapon?.power || 0) : 1;
          const bCost = b.module!.type === 'weapon' ? (b.module!.weapon?.power || 0) : 1;
          return bCost - aCost; // Sort descending
        });
      
      // Remove modules starting with the most expensive
      for (const { index } of moduleSlots) {
        if (remainingPoints <= 0) break;
        
        const moduleCost = mac.modules[index]?.type === 'weapon' ? 
          (mac.modules[index]?.weapon?.power || 0) : 1;
        
        if (moduleCost <= remainingPoints) {
          mac.modules[index] = null;
          remainingPoints -= moduleCost;
        }
      }
    }
  }
}
