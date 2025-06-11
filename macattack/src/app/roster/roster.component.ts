import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitSheetComponent } from '../unit-sheet/unit-sheet.component';
import { FormsModule } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { Force } from '../interfaces/force';
import { MAC } from '../interfaces/mac';
import { AuxiliaryUnit } from '../interfaces/auxiliaryunit';
import { Module } from '../interfaces/module';

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
    name: "MAC Attack",
    pointsLimit: 50,
    units: []
  };
  validationMessages: string[] = [];
  savedForces: SavedForce[] = [];
  printMode: boolean = false;

  constructor(private utils: UtilsService) {}

  ngOnInit() {
    this.loadSavedForces();
  }

  addUnitSheet() {
    const newMAC: MAC = {
      name: "(your unit name)",
      class: 1,
      modules: [],
      image: this.utils.getDefaultImage()
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
      const brawlWeapons = unit.modules.filter(m => m.type === 'weapon' && m.weapon?.isBrawl);
      if (brawlWeapons.length > 2) {
        this.validationMessages.push(`${unit.name} has more than 2 brawl weapons`);
      }
      if (brawlWeapons.length === 2) {
        const firstBrawlType = brawlWeapons[0].weapon?.name;
        const secondBrawlType = brawlWeapons[1].weapon?.name;
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
    const key = `force_${this.force.name.trim().toLowerCase().replace(/\s+/g, '_')}`;
    const savedForce: SavedForce = {
      key,
      date: new Date(),
      force: JSON.parse(JSON.stringify(this.force)) // Deep copy
    };
    
    localStorage.setItem(key, JSON.stringify(savedForce));
    this.loadSavedForces();
  }

  isForceNameValid(): boolean {
    return this.force.name.trim().length > 0;
  }

  loadForce(force: Force) {
    // Deep copy the force
    const loadedForce = JSON.parse(JSON.stringify(force));
    
    // Reconstruct modules for each unit
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
    this.savedForces = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('force_')) {
        const savedForce = JSON.parse(localStorage.getItem(key) || '');
        this.savedForces.push(savedForce);
      }
    }
    // Sort by date, newest first
    this.savedForces.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
}
