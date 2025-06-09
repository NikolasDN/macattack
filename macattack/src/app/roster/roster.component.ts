import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitSheetComponent } from '../unit-sheet/unit-sheet.component';
import { MAC } from '../interfaces/mac';
import { AuxiliaryUnit } from '../interfaces/auxiliaryunit';

@Component({
  selector: 'app-roster',
  standalone: true,
  imports: [CommonModule, UnitSheetComponent],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.css'
})
export class RosterComponent {
  unitSheets: (MAC | AuxiliaryUnit)[] = [];

  addUnitSheet() {
    this.unitSheets.push({
      name: "(your unit name)",
      class: 1,
      modules: []
    });
  }

  removeUnitSheet(index: number) {
    this.unitSheets.splice(index, 1);
  }
}
