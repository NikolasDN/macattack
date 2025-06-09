import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitSheetComponent } from '../unit-sheet/unit-sheet.component';

@Component({
  selector: 'app-roster',
  standalone: true,
  imports: [CommonModule, UnitSheetComponent],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.css'
})
export class RosterComponent {
  unitSheets: number[] = [];

  addUnitSheet() {
    this.unitSheets.push(this.unitSheets.length + 1);
  }

  removeUnitSheet(index: number) {
    this.unitSheets.splice(index, 1);
  }
}
