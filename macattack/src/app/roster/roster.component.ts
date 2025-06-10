import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitSheetComponent } from '../unit-sheet/unit-sheet.component';
import { MAC } from '../interfaces/mac';
import { AuxiliaryUnit } from '../interfaces/auxiliaryunit';
import { UtilsService } from '../services/utils.service';
import { Force } from '../interfaces/force';

@Component({
  selector: 'app-roster',
  standalone: true,
  imports: [CommonModule, UnitSheetComponent],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.css'
})
export class RosterComponent {
  force: Force = {
    name: "MAC Attack",
    pointsLimit: 50,
    units: []
  };
  totalCost: number = 0;
  validationMessages: string[] = [];

  constructor(private utils: UtilsService) {}

  validateForce() {
    this.validationMessages = [];
    
    // Count MACs and auxiliary units
    const macs = this.force.units.filter(unit => this.utils.isMAC(unit));
    const auxiliaries = this.force.units.filter(unit => !this.utils.isMAC(unit));
    
    // Check minimum MAC requirement
    if (macs.length < 3) {
      this.validationMessages.push("Your force needs to consist of at least 3 MACs");
    }
    
    // Check auxiliary unit limit
    if (auxiliaries.length > macs.length) {
      this.validationMessages.push("You cannot have more auxiliary units than MACs");
    }
    
    // Check MAC module count
    const macsWithIncompleteModules = macs.filter(mac => mac.modules.length !== 6);
    if (macsWithIncompleteModules.length > 0) {
      this.validationMessages.push("Not all MACs have 6 modules");
    }
  }

  addUnitSheet() {
    this.force.units.push({
      name: "(your unit name)",
      class: 1,
      modules: []
    });
    this.totalCost = this.getTotalCost();
    this.validateForce();
  }

  removeUnitSheet(index: number) {
    this.force.units.splice(index, 1);
    this.totalCost = this.getTotalCost();
    this.validateForce();
  }

  getTotalCost(): number {
    return this.force.units.reduce((total, unit) => {
      return total + this.utils.getCost(unit);
    }, 0);
  }

  onUnitChanged(updatedUnit: MAC | AuxiliaryUnit, index: number) {
    this.force.units[index] = updatedUnit;
    this.totalCost = this.getTotalCost();
    this.validateForce();
  }
}
