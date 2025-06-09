import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitSheetComponent } from '../unit-sheet/unit-sheet.component';
import { MAC } from '../interfaces/mac';
import { AuxiliaryUnit } from '../interfaces/auxiliaryunit';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-roster',
  standalone: true,
  imports: [CommonModule, UnitSheetComponent],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.css'
})
export class RosterComponent {
  unitSheets: (MAC | AuxiliaryUnit)[] = [];
  totalCost: number = 0;

  constructor(private utils: UtilsService) {}

  addUnitSheet() {
    this.unitSheets.push({
      name: "(your unit name)",
      class: 1,
      modules: []
    });
    this.totalCost = this.getTotalCost();
  }

  removeUnitSheet(index: number) {
    this.unitSheets.splice(index, 1);
    this.totalCost = this.getTotalCost();
  }

  getTotalCost(): number {
    return this.unitSheets.reduce((total, unit) => {
      return total + this.utils.getCost(unit);
    }, 0);
  }

  onUnitChanged() {
    this.totalCost = this.getTotalCost();
  }
}
