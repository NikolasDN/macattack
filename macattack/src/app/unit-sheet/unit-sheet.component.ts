import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Module } from '../interfaces/module';
import { Weapon } from '../interfaces/weapon';
import { Hardware } from '../interfaces/hardware';
import { MAC } from '../interfaces/MAC';
import { AuxiliaryUnit } from '../interfaces/auxiliaryunit';

@Component({
  selector: 'app-unit-sheet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-sheet.component.html',
  styleUrl: './unit-sheet.component.css'
})
export class UnitSheetComponent {
  // 📦 All modules: weapons and hardware
  private allModules: Module[] = [
    // 🔫 Notable Weapons
    { type: "weapon", weapon: { name: "LaserCarbine", range: "S", type: "P", power: 1 } },
    { type: "weapon", weapon: { name: "AutoCannon", range: "L", type: "B", power: 2 } },
    { type: "weapon", weapon: { name: "GodHammer", range: "A", type: "G", power: 4 } },
    { type: "weapon", weapon: { name: "Howitzer", range: "A", type: "B", power: 2 } },
    { type: "weapon", weapon: { name: "Annihilator", range: "L", type: "P", power: 4 } },
    { type: "weapon", weapon: { name: "SmartCannon", range: "L", type: "G", power: 2 } },
    { type: "weapon", weapon: { name: "FlakRepeater", range: "S", type: "M", power: 1 } },
    { type: "weapon", weapon: { name: "ImploderPod", range: "L", type: "P", power: 4, subtype: "X" } },
    { type: "weapon", weapon: { name: "ShockOrb", range: "A", type: "M", power: 2, subtype: "J" } },
    { type: "weapon", weapon: { name: "FusionBomb", range: "S", type: "P", power: 1, subtype: "X" } },
    { type: "weapon", weapon: { name: "GammaRay", range: "S", type: "P", power: 2, subtype: "R" } },
    { type: "weapon", weapon: { name: "HellSurge", range: "S", type: "B", power: 4, subtype: "T" } },
    { type: "weapon", weapon: { name: "FlareMissiles", range: "L", type: "B", power: 2, subtype: "TX" } },
    { type: "weapon", weapon: { name: "BarometricBombs", range: "A", type: "B", power: 3, subtype: "JX" } },
    { type: "weapon", weapon: { name: "ToxiPods", range: "S", type: "P", power: 2, subtype: "RX" } },

    // 🤜 Brawl Weapons
    { type: "weapon", weapon: { name: "Piston", isBrawl: true, power: 2, type: "P" } },
    { type: "weapon", weapon: { name: "Blade", isBrawl: true, power: 2, type: "B" } },
    { type: "weapon", weapon: { name: "Grapple", isBrawl: true, power: 2, type: "G" } },
    { type: "weapon", weapon: { name: "Mower", isBrawl: true, power: 2, type: "M" } },
    { type: "weapon", weapon: { name: "GravTether", isBrawl: true, power: 2, type: "B", subtype: "J" } },
    { type: "weapon", weapon: { name: "ImpactNeedle", isBrawl: true, power: 2, type: "P", subtype: "X" } },
    { type: "weapon", weapon: { name: "FireScythe", isBrawl: true, power: 2, type: "M", subtype: "T" } },

    // ⚙️ Common Hardware (name, applicableTo, effect)
    { type: "hardware", hardware: { name: "Aerodrive", applicableTo: "V", effect: "Ignore terrain and collisions. Motion 3." } },
    { type: "hardware", hardware: { name: "Amplifier", applicableTo: "M", effect: "Increase weapon power by 1." } },
    { type: "hardware", hardware: { name: "Armour", applicableTo: "V", effect: "Ignore hits on 5+ (3+ with 2 modules)." } },
    { type: "hardware", hardware: { name: "Booster", applicableTo: "A", effect: "Heat = class to move 3” once per attack turn." } },
    { type: "hardware", hardware: { name: "Carrier", applicableTo: "A", effect: "Carry up to 2 infantry. They cannot act." } },
    { type: "hardware", hardware: { name: "Casing", applicableTo: "M", effect: "Take internal damage to this module instead." } },
    { type: "hardware", hardware: { name: "Catalyst", applicableTo: "M", effect: "First attack generates 1 less Heat." } },
    { type: "hardware", hardware: { name: "Cloak", applicableTo: "A", effect: "Hold to set Motion to 6." } },
    { type: "hardware", hardware: { name: "Conductor", applicableTo: "A", effect: "Cause 1 Heat to visible MAC within 3”." } },
    { type: "hardware", hardware: { name: "Coolant", applicableTo: "M", effect: "Lose 2 Heat in cooldown. Gain 2 Heat if destroyed." } },
    { type: "hardware", hardware: { name: "Disruptor", applicableTo: "A", effect: "Force system check or crash to MAC within 3”." } },
    { type: "hardware", hardware: { name: "Dozer", applicableTo: "V", effect: "Count as 2 class higher for collisions." } },
    { type: "hardware", hardware: { name: "ECM", applicableTo: "M", effect: "Gain +1 Motion at end of attack turn." } },
    { type: "hardware", hardware: { name: "Emitter", applicableTo: "A", effect: "Cause 1 Rad to MAC within 3”." } },
    { type: "hardware", hardware: { name: "Frame", applicableTo: "M", effect: "Reduce MAC cost by 1pt." } },
    { type: "hardware", hardware: { name: "Gravlock", applicableTo: "A", effect: "Set Motion to 1. AUs can use." } },
    { type: "hardware", hardware: { name: "Guardian", applicableTo: "M", effect: "Roll 4+ to ignore Rad, Heat, or Jolt." } },
    { type: "hardware", hardware: { name: "Gyro", applicableTo: "A", effect: "Move through rough and cover as open." } },
    { type: "hardware", hardware: { name: "Hooks", applicableTo: "I", effect: "Move with touching MAC." } },
    { type: "hardware", hardware: { name: "Hotstepper", applicableTo: "A", effect: "+1 hit and 1 Heat when jumping into enemy." } },
    { type: "hardware", hardware: { name: "Hoverfoil", applicableTo: "A", effect: "Move through rough and water as open." } },
    { type: "hardware", hardware: { name: "Intake", applicableTo: "M", effect: "Jumping generates 1 less Heat." } },
    { type: "hardware", hardware: { name: "Jet", applicableTo: "A", effect: "Each allows 9” jump." } },
    { type: "hardware", hardware: { name: "Mesh", applicableTo: "M", effect: "Ignore hits to module if fewer than 3 hits." } },
    { type: "hardware", hardware: { name: "Plate", applicableTo: "M", effect: "Roll 4+ to ignore hits to this module." } },
    { type: "hardware", hardware: { name: "Precog", applicableTo: "M", effect: "Gain 1 Heat to delay activation." } },
    { type: "hardware", hardware: { name: "Prism", applicableTo: "M", effect: "Lose 1 Heat per ranged weapon fired." } },
    { type: "hardware", hardware: { name: "Radiator", applicableTo: "M", effect: "Lose 1 Heat in cooldown." } },
    { type: "hardware", hardware: { name: "Reflector", applicableTo: "M", effect: "Ignore hits to this module if 3+ hits." } },
    { type: "hardware", hardware: { name: "Rotor", applicableTo: "M", effect: "Extra rotate during move." } },
    { type: "hardware", hardware: { name: "Servo", applicableTo: "M", effect: "Gain 1 less Heat for shift or rush." } },
    { type: "hardware", hardware: { name: "Shield", applicableTo: "M", effect: "Gain 1 Heat to ignore hits to module." } },
    { type: "hardware", hardware: { name: "Tether", applicableTo: "A", effect: "Cause 1 Jolt to MAC within 3”." } },
    { type: "hardware", hardware: { name: "Transport", applicableTo: "I", effect: "Unit can rush." } },
    { type: "hardware", hardware: { name: "Vent", applicableTo: "M", effect: "Lose 2 Heat when holding in move phase." } },
  ];
  @Input() unit: MAC | AuxiliaryUnit = {
    name: "(your unit name)",
    class: 1,
    modules: []
  }

  isMAC(unit: MAC | AuxiliaryUnit): unit is MAC {
    return 'class' in unit;
  }

  isClass(unit: MAC | AuxiliaryUnit, classNum: number): boolean {
    return this.isMAC(unit) && unit.class === classNum;
  }

  isAuxiliaryType(unit: MAC | AuxiliaryUnit, type: 'infantry' | 'vehicle'): boolean {
    return !this.isMAC(unit) && unit.type === type;
  }

  selectUnitType(type: string) {
    if (type.startsWith('Class')) {
      const classNum = parseInt(type.split(' ')[1]);
      this.unit = {
        ...this.unit,
        class: classNum as 1 | 2 | 3,
        modules: []
      };
    } else if (type === 'Infantry AU') {
      this.unit = {
        name: this.unit.name,
        type: 'infantry',
        formationSize: 1,
        modules: []
      };
    } else if (type === 'Vehicle AU') {
      this.unit = {
        name: this.unit.name,
        type: 'vehicle',
        formationSize: 1,
        modules: []
      };
    }
  }

  getCost(unit: MAC | AuxiliaryUnit): number {
    if (this.isMAC(unit)) {
      switch (unit.class) {
        case 1:
          return 12;
        case 2:
          return 16;
        case 3:
          return 20;
      }
    } else {
      return 1 + unit.modules.filter(f => f.type === 'hardware').length + unit.modules.filter(f => f.type === 'weapon').reduce((sum, weapon) => sum + (weapon.weapon?.power || 0), 0);
    }
  }

  getAvailableModules(unit: MAC | AuxiliaryUnit, slot: number): Module[] {
    return this.allModules.filter(module => {
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
