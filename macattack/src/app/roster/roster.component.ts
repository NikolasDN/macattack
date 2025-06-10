import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitSheetComponent } from '../unit-sheet/unit-sheet.component';
import { FormsModule } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { Force } from '../interfaces/force';
import { MAC } from '../interfaces/mac';
import { AuxiliaryUnit } from '../interfaces/auxiliaryunit';

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

  constructor(private utils: UtilsService) {}

  ngOnInit() {
    this.loadSavedForces();
  }

  addUnitSheet() {
    const newMAC: MAC = {
      name: "(your unit name)",
      class: 1,
      modules: []
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
  }

  getTotalCost(force: Force = this.force): number {
    return force.units.reduce((total, unit) => total + this.utils.getCost(unit), 0);
  }

  saveForce() {
    const timestamp = new Date().getTime();
    const key = `force_${timestamp}`;
    const savedForce: SavedForce = {
      key,
      date: new Date(timestamp),
      force: JSON.parse(JSON.stringify(this.force)) // Deep copy
    };
    
    localStorage.setItem(key, JSON.stringify(savedForce));
    this.loadSavedForces();
  }

  loadForce(force: Force) {
    this.force = JSON.parse(JSON.stringify(force)); // Deep copy
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
}
