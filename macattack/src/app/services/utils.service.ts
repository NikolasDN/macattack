import { Injectable } from '@angular/core';
import { MAC } from '../interfaces/mac';
import { AuxiliaryUnit } from '../interfaces/auxiliaryunit';
import { Module } from '../interfaces/module';
import { range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  // 📦 All modules: weapons and hardware
  allModules: Module[] = [
        
    // 🤜 Brawl Weapons
    // Power 1
    { type: "weapon", weapon: { name: "LightPiston", isBrawl: true, power: 1, type: "P" } },
    { type: "weapon", weapon: { name: "LightBlade", isBrawl: true, power: 1, type: "B" } },
    { type: "weapon", weapon: { name: "LightGrapple", isBrawl: true, power: 1, type: "G" } },
    { type: "weapon", weapon: { name: "LightMower", isBrawl: true, power: 1, type: "M" } },
    { type: "weapon", weapon: { name: "LightGravTether", isBrawl: true, power: 1, type: "B", subtype: "J" } },
    { type: "weapon", weapon: { name: "LightImpactNeedle", isBrawl: true, power: 1, type: "P", subtype: "X" } },
    { type: "weapon", weapon: { name: "LightFireScythe", isBrawl: true, power: 1, type: "M", subtype: "T" } },
    { type: "weapon", weapon: { name: "LightRadPunch", isBrawl: true, power: 1, type: "P", subtype: "R" } },
    { type: "weapon", weapon: { name: "LightHeatBlade", isBrawl: true, power: 1, type: "B", subtype: "T" } },
    { type: "weapon", weapon: { name: "LightStunClaw", isBrawl: true, power: 1, type: "G", subtype: "J" } },

    // Power 2 (existing ones)
    { type: "weapon", weapon: { name: "Piston", isBrawl: true, power: 2, type: "P" } },
    { type: "weapon", weapon: { name: "Blade", isBrawl: true, power: 2, type: "B" } },
    { type: "weapon", weapon: { name: "Grapple", isBrawl: true, power: 2, type: "G" } },
    { type: "weapon", weapon: { name: "Mower", isBrawl: true, power: 2, type: "M" } },
    { type: "weapon", weapon: { name: "GravTether", isBrawl: true, power: 2, type: "B", subtype: "J" } },
    { type: "weapon", weapon: { name: "ImpactNeedle", isBrawl: true, power: 2, type: "P", subtype: "X" } },
    { type: "weapon", weapon: { name: "FireScythe", isBrawl: true, power: 2, type: "M", subtype: "T" } },
    { type: "weapon", weapon: { name: "RadPunch", isBrawl: true, power: 2, type: "P", subtype: "R" } },
    { type: "weapon", weapon: { name: "HeatBlade", isBrawl: true, power: 2, type: "B", subtype: "T" } },
    { type: "weapon", weapon: { name: "StunClaw", isBrawl: true, power: 2, type: "G", subtype: "J" } },

    // Power 3
    { type: "weapon", weapon: { name: "HeavyPiston", isBrawl: true, power: 3, type: "P" } },
    { type: "weapon", weapon: { name: "HeavyBlade", isBrawl: true, power: 3, type: "B" } },
    { type: "weapon", weapon: { name: "HeavyGrapple", isBrawl: true, power: 3, type: "G" } },
    { type: "weapon", weapon: { name: "HeavyMower", isBrawl: true, power: 3, type: "M" } },
    { type: "weapon", weapon: { name: "HeavyGravTether", isBrawl: true, power: 3, type: "B", subtype: "J" } },
    { type: "weapon", weapon: { name: "HeavyImpactNeedle", isBrawl: true, power: 3, type: "P", subtype: "X" } },
    { type: "weapon", weapon: { name: "HeavyFireScythe", isBrawl: true, power: 3, type: "M", subtype: "T" } },
    { type: "weapon", weapon: { name: "HeavyRadPunch", isBrawl: true, power: 3, type: "P", subtype: "R" } },
    { type: "weapon", weapon: { name: "HeavyHeatBlade", isBrawl: true, power: 3, type: "B", subtype: "T" } },
    { type: "weapon", weapon: { name: "HeavyStunClaw", isBrawl: true, power: 3, type: "G", subtype: "J" } },

    // ⚙️ Common Hardware (name, applicableTo, effect)
    { type: "hardware", hardware: { name: "Aerodrive", applicableTo: "V", effect: "Ignore terrain and collisions. Motion 3." } },
    { type: "hardware", hardware: { name: "Amplifier", applicableTo: "M", effect: "Increase weapon power by 1." } },
    { type: "hardware", hardware: { name: "Armour", applicableTo: "V", effect: "Ignore hits on 5+ (3+ with 2 modules)." } },
    { type: "hardware", hardware: { name: "Booster", applicableTo: "A", effect: "Heat = class to move 3\" once per attack turn." } },
    { type: "hardware", hardware: { name: "Carrier", applicableTo: "A", effect: "Carry up to 2 infantry. They cannot act." } },
    { type: "hardware", hardware: { name: "Casing", applicableTo: "M", effect: "Take internal damage to this module instead." } },
    { type: "hardware", hardware: { name: "Catalyst", applicableTo: "M", effect: "First attack generates 1 less Heat." } },
    { type: "hardware", hardware: { name: "Cloak", applicableTo: "A", effect: "Hold to set Motion to 6." } },
    { type: "hardware", hardware: { name: "Conductor", applicableTo: "A", effect: "Cause 1 Heat to visible MAC within 3\"." } },
    { type: "hardware", hardware: { name: "Coolant", applicableTo: "M", effect: "Lose 2 Heat in cooldown. Gain 2 Heat if destroyed." } },
    { type: "hardware", hardware: { name: "Disruptor", applicableTo: "A", effect: "Force system check or crash to MAC within 3\"." } },
    { type: "hardware", hardware: { name: "Dozer", applicableTo: "V", effect: "Count as 2 class higher for collisions." } },
    { type: "hardware", hardware: { name: "ECM", applicableTo: "M", effect: "Gain +1 Motion at end of attack turn." } },
    { type: "hardware", hardware: { name: "Emitter", applicableTo: "A", effect: "Cause 1 Rad to MAC within 3\"." } },
    { type: "hardware", hardware: { name: "Frame", applicableTo: "M", effect: "Reduce MAC cost by 1pt." } },
    { type: "hardware", hardware: { name: "Gravlock", applicableTo: "A", effect: "Set Motion to 1. AUs can use." } },
    { type: "hardware", hardware: { name: "Guardian", applicableTo: "M", effect: "Roll 4+ to ignore Rad, Heat, or Jolt." } },
    { type: "hardware", hardware: { name: "Gyro", applicableTo: "A", effect: "Move through rough and cover as open." } },
    { type: "hardware", hardware: { name: "Hooks", applicableTo: "I", effect: "Move with touching MAC." } },
    { type: "hardware", hardware: { name: "Hotstepper", applicableTo: "A", effect: "+1 hit and 1 Heat when jumping into enemy." } },
    { type: "hardware", hardware: { name: "Hoverfoil", applicableTo: "A", effect: "Move through rough and water as open." } },
    { type: "hardware", hardware: { name: "Intake", applicableTo: "M", effect: "Jumping generates 1 less Heat." } },
    { type: "hardware", hardware: { name: "Jet", applicableTo: "A", effect: "Each allows 9\" jump." } },
    { type: "hardware", hardware: { name: "Mesh", applicableTo: "M", effect: "Ignore hits to module if fewer than 3 hits." } },
    { type: "hardware", hardware: { name: "Plate", applicableTo: "M", effect: "Roll 4+ to ignore hits to this module." } },
    { type: "hardware", hardware: { name: "Precog", applicableTo: "M", effect: "Gain 1 Heat to delay activation." } },
    { type: "hardware", hardware: { name: "Prism", applicableTo: "M", effect: "Lose 1 Heat per ranged weapon fired." } },
    { type: "hardware", hardware: { name: "Radiator", applicableTo: "M", effect: "Lose 1 Heat in cooldown." } },
    { type: "hardware", hardware: { name: "Reflector", applicableTo: "M", effect: "Ignore hits to this module if 3+ hits." } },
    { type: "hardware", hardware: { name: "Rotor", applicableTo: "M", effect: "Extra rotate during move." } },
    { type: "hardware", hardware: { name: "Servo", applicableTo: "M", effect: "Gain 1 less Heat for shift or rush." } },
    { type: "hardware", hardware: { name: "Shield", applicableTo: "M", effect: "Gain 1 Heat to ignore hits to module." } },
    { type: "hardware", hardware: { name: "Tether", applicableTo: "A", effect: "Cause 1 Jolt to MAC within 3\"." } },
    { type: "hardware", hardware: { name: "Transport", applicableTo: "I", effect: "Unit can rush." } },
    { type: "hardware", hardware: { name: "Vent", applicableTo: "M", effect: "Lose 2 Heat when holding in move phase." } },
  ];

  constructor() {
    for(const range of ["S", "L", "A"] as const) {
      for(const type of ["P", "B", "G", "M"] as const) {
        for(const power of [1, 2, 3, 4] as const) {
          this.allModules.push({ type: "weapon", weapon: { name: this.getWeaponName(`${range}${type}${power}`), range, type, power } });
          for(const subtype of ["X", "T", "J", "R", "TX", "RX", "JX"] as const) {
            this.allModules.push({ type: "weapon", weapon: { name: this.getWeaponName(`${range}${type}${power}-${subtype}`), range, type, power, subtype } });
          }
        }
      }
    }
  }

  getWeaponName(signature: string): string {
    if (signature == "SP1") return "LaserCarbine";
    if (signature == "LB2") return "AutoCannon";
    if (signature == "AG4") return "GodHammer";
    if (signature == "AB2") return "Howitzer";
    if (signature == "LG2") return "SmartCannon";
    if (signature == "SM1") return "FlakRepeater";
    if (signature == "LP4-X") return "ImploderPod";
    if (signature == "AM2-J") return "ShockOrb";
    if (signature == "SP1-X") return "FusionBomb";
    if (signature == "SP2-R") return "GammaRay";
    if (signature == "SB4-T") return "HellSurge";
    if (signature == "LB2-TX") return "FlareMissiles";
    if (signature == "AB3-JX") return "BarometricBombs";
    if (signature == "SP2-RX") return "ToxiPods";

    // Base Weapons (no subtypes)
    if (signature == "SP1") return "LaserCarbine";
    if (signature == "SB1") return "BlasterPistol";
    if (signature == "SG1") return "SmartGun";
    if (signature == "SM1") return "FlakRepeater";
    if (signature == "LP1") return "LaserRifle";
    if (signature == "LB1") return "Cannon";
    if (signature == "LG1") return "SmartCannon";
    if (signature == "LM1") return "MultiCannon";
    if (signature == "AP1") return "ArcRifle";
    if (signature == "AB1") return "ArcCannon";
    if (signature == "AG1") return "ArcMissile";
    if (signature == "AM1") return "ArcBeam";

    if (signature == "SP2") return "PlasmaPistol";
    if (signature == "SB2") return "BurstBlaster";
    if (signature == "SG2") return "GuidedGun";
    if (signature == "SM2") return "MissilePod";
    if (signature == "LP2") return "PlasmaCannon";
    if (signature == "LB2") return "BurstCannon";
    if (signature == "LG2") return "GuidedMissile";
    if (signature == "LM2") return "FlakCannon";
    if (signature == "AP2") return "ArcLance";
    if (signature == "AB2") return "ArcBlast";
    if (signature == "AG2") return "ArcStorm";
    if (signature == "AM2") return "ArcWave";

    if (signature == "SP3") return "QuantumPistol";
    if (signature == "SB3") return "ClusterBlaster";
    if (signature == "SG3") return "DroneGun";
    if (signature == "SM3") return "ParticlePod";
    if (signature == "LP3") return "QuantumLance";
    if (signature == "LB3") return "ClusterBomb";
    if (signature == "LG3") return "DroneSwarm";
    if (signature == "LM3") return "ParticleBeam";
    if (signature == "AP3") return "ArcBeam";
    if (signature == "AB3") return "ArcBlast";
    if (signature == "AG3") return "ArcStorm";
    if (signature == "AM3") return "ArcWave";

    if (signature == "SP4") return "AnnihilatorPistol";
    if (signature == "SB4") return "MegaBlaster";
    if (signature == "SG4") return "DeathGun";
    if (signature == "SM4") return "DoomPod";
    if (signature == "LP4") return "Annihilator";
    if (signature == "LB4") return "MegaCannon";
    if (signature == "LG4") return "DeathMissile";
    if (signature == "LM4") return "DoomCannon";
    if (signature == "AP4") return "ArcAnnihilator";
    if (signature == "AB4") return "ArcDoom";
    if (signature == "AG4") return "ArcDeath";
    if (signature == "AM4") return "ArcApocalypse";

    // Power 1 with subtypes
    if (signature == "SP1-R") return "RadCarbine";
    if (signature == "SP1-T") return "HeatCarbine";
    if (signature == "SP1-J") return "JoltCarbine";
    if (signature == "SP1-X") return "FusionBombCarbine";
    if (signature == "SP1-RX") return "RadBombCarbine";
    if (signature == "SP1-TX") return "HeatBombCarbine";
    if (signature == "SP1-JX") return "JoltBombCarbine";
    if (signature == "SB1-R") return "RadBlasterPistol";
    if (signature == "SB1-T") return "HeatBlasterPistol";
    if (signature == "SB1-J") return "JoltBlasterPistol";
    if (signature == "SB1-X") return "FusionBombPistol";
    if (signature == "SB1-RX") return "RadBombPistol";
    if (signature == "SB1-TX") return "HeatBombPistol";
    if (signature == "SB1-JX") return "JoltBombPistol";
    if (signature == "SG1-R") return "RadSmartGun";
    if (signature == "SG1-T") return "HeatSmartGun";
    if (signature == "SG1-J") return "JoltSmartGun";
    if (signature == "SG1-X") return "FusionBombGun";
    if (signature == "SG1-RX") return "RadBombGun";
    if (signature == "SG1-TX") return "HeatBombGun";
    if (signature == "SG1-JX") return "JoltBombGun";
    if (signature == "SM1-R") return "RadRepeater";
    if (signature == "SM1-T") return "HeatRepeater";
    if (signature == "SM1-J") return "JoltRepeater";
    if (signature == "SM1-X") return "FusionBombRepeater";
    if (signature == "SM1-RX") return "RadBombRepeater";
    if (signature == "SM1-TX") return "HeatBombRepeater";
    if (signature == "SM1-JX") return "JoltBombRepeater";

    // Long Range Power 1 with subtypes
    if (signature == "LP1-R") return "RadLaserRifle";
    if (signature == "LP1-T") return "HeatLaserRifle";
    if (signature == "LP1-J") return "JoltLaserRifle";
    if (signature == "LP1-X") return "FusionBombRifle";
    if (signature == "LP1-RX") return "RadBombRifle";
    if (signature == "LP1-TX") return "HeatBombRifle";
    if (signature == "LP1-JX") return "JoltBombRifle";
    if (signature == "LB1-R") return "RadAutoCannon";
    if (signature == "LB1-T") return "HeatAutoCannon";
    if (signature == "LB1-J") return "JoltAutoCannon";
    if (signature == "LB1-X") return "FusionBombCannon";
    if (signature == "LB1-RX") return "RadBombCannon";
    if (signature == "LB1-TX") return "HeatBombCannon";
    if (signature == "LB1-JX") return "JoltBombCannon";
    if (signature == "LG1-R") return "RadSmartCannon";
    if (signature == "LG1-T") return "HeatSmartCannon";
    if (signature == "LG1-J") return "JoltSmartCannon";
    if (signature == "LG1-X") return "FusionBombSmart";
    if (signature == "LG1-RX") return "RadBombSmart";
    if (signature == "LG1-TX") return "HeatBombSmart";
    if (signature == "LG1-JX") return "JoltBombSmart";
    if (signature == "LM1-R") return "RadMultiCannon";
    if (signature == "LM1-T") return "HeatMultiCannon";
    if (signature == "LM1-J") return "JoltMultiCannon";
    if (signature == "LM1-X") return "FusionBombMulti";
    if (signature == "LM1-RX") return "RadBombMulti";
    if (signature == "LM1-TX") return "HeatBombMulti";
    if (signature == "LM1-JX") return "JoltBombMulti";

    // Arc Range Power 1 with subtypes
    if (signature == "AP1-R") return "RadArcRifle";
    if (signature == "AP1-T") return "HeatArcRifle";
    if (signature == "AP1-J") return "JoltArcRifle";
    if (signature == "AP1-X") return "FusionBombArcRifle";
    if (signature == "AP1-RX") return "RadBombArcRifle";
    if (signature == "AP1-TX") return "HeatBombArcRifle";
    if (signature == "AP1-JX") return "JoltBombArcRifle";
    if (signature == "AB1-R") return "RadArcCannon";
    if (signature == "AB1-T") return "HeatArcCannon";
    if (signature == "AB1-J") return "JoltArcCannon";
    if (signature == "AB1-X") return "FusionBombArcCannon";
    if (signature == "AB1-RX") return "RadBombArcCannon";
    if (signature == "AB1-TX") return "HeatBombArcCannon";
    if (signature == "AB1-JX") return "JoltBombArcCannon";
    if (signature == "AG1-R") return "RadArcMissile";
    if (signature == "AG1-T") return "HeatArcMissile";
    if (signature == "AG1-J") return "JoltArcMissile";
    if (signature == "AG1-X") return "FusionBombArcMissile";
    if (signature == "AG1-RX") return "RadBombArcMissile";
    if (signature == "AG1-TX") return "HeatBombArcMissile";
    if (signature == "AG1-JX") return "JoltBombArcMissile";
    if (signature == "AM1-R") return "RadArcBeam";
    if (signature == "AM1-T") return "HeatArcBeam";
    if (signature == "AM1-J") return "JoltArcBeam";
    if (signature == "AM1-X") return "FusionBombArcBeam";
    if (signature == "AM1-RX") return "RadBombArcBeam";
    if (signature == "AM1-TX") return "HeatBombArcBeam";
    if (signature == "AM1-JX") return "JoltBombArcBeam";

    // Power 2 with subtypes
    if (signature == "SP2-R") return "RadPlasmaPistol";
    if (signature == "SP2-T") return "HeatPlasmaPistol";
    if (signature == "SP2-J") return "JoltPlasmaPistol";
    if (signature == "SP2-X") return "FusionBombPlasmaPistol";
    if (signature == "SP2-RX") return "RadBombPlasmaPistol";
    if (signature == "SP2-TX") return "HeatBombPlasmaPistol";
    if (signature == "SP2-JX") return "JoltBombPlasmaPistol";
    if (signature == "SB2-R") return "RadBurstBlaster";
    if (signature == "SB2-T") return "HeatBurstBlaster";
    if (signature == "SB2-J") return "JoltBurstBlaster";
    if (signature == "SB2-X") return "FusionBombBurstBlaster";
    if (signature == "SB2-RX") return "RadBombBurstBlaster";
    if (signature == "SB2-TX") return "HeatBombBurstBlaster";
    if (signature == "SB2-JX") return "JoltBombBurstBlaster";
    if (signature == "SG2-R") return "RadGuidedGun";
    if (signature == "SG2-T") return "HeatGuidedGun";
    if (signature == "SG2-J") return "JoltGuidedGun";
    if (signature == "SG2-X") return "FusionBombGuidedGun";
    if (signature == "SG2-RX") return "RadBombGuidedGun";
    if (signature == "SG2-TX") return "HeatBombGuidedGun";
    if (signature == "SG2-JX") return "JoltBombGuidedGun";
    if (signature == "SM2-R") return "RadMissilePod";
    if (signature == "SM2-T") return "HeatMissilePod";
    if (signature == "SM2-J") return "JoltMissilePod";
    if (signature == "SM2-X") return "FusionBombMissilePod";
    if (signature == "SM2-RX") return "RadBombMissilePod";
    if (signature == "SM2-TX") return "HeatBombMissilePod";
    if (signature == "SM2-JX") return "JoltBombMissilePod";

    // Power 3 with subtypes
    if (signature == "SP3-R") return "RadQuantumPistol";
    if (signature == "SP3-T") return "HeatQuantumPistol";
    if (signature == "SP3-J") return "JoltQuantumPistol";
    if (signature == "SP3-X") return "FusionBombQuantum";
    if (signature == "SP3-RX") return "RadBombQuantum";
    if (signature == "SP3-TX") return "HeatBombQuantum";
    if (signature == "SP3-JX") return "JoltBombQuantum";
    if (signature == "SB3-R") return "RadClusterBlaster";
    if (signature == "SB3-T") return "HeatClusterBlaster";
    if (signature == "SB3-J") return "JoltClusterBlaster";
    if (signature == "SB3-X") return "FusionBombCluster";
    if (signature == "SB3-RX") return "RadBombCluster";
    if (signature == "SB3-TX") return "HeatBombCluster";
    if (signature == "SB3-JX") return "JoltBombCluster";
    if (signature == "SG3-R") return "RadDroneGun";
    if (signature == "SG3-T") return "HeatDroneGun";
    if (signature == "SG3-J") return "JoltDroneGun";
    if (signature == "SG3-X") return "FusionBombDrone";
    if (signature == "SG3-RX") return "RadBombDrone";
    if (signature == "SG3-TX") return "HeatBombDrone";
    if (signature == "SG3-JX") return "JoltBombDrone";
    if (signature == "SM3-R") return "RadParticlePod";
    if (signature == "SM3-T") return "HeatParticlePod";
    if (signature == "SM3-J") return "JoltParticlePod";
    if (signature == "SM3-X") return "FusionBombParticle";
    if (signature == "SM3-RX") return "RadBombParticle";
    if (signature == "SM3-TX") return "HeatBombParticle";
    if (signature == "SM3-JX") return "JoltBombParticle";

    // Power 4 with subtypes
    if (signature == "SP4-R") return "RadAnnihilatorPistol";
    if (signature == "SP4-T") return "HeatAnnihilatorPistol";
    if (signature == "SP4-J") return "JoltAnnihilatorPistol";
    if (signature == "SP4-X") return "FusionBombAnnihilator";
    if (signature == "SP4-RX") return "RadBombAnnihilator";
    if (signature == "SP4-TX") return "HeatBombAnnihilator";
    if (signature == "SP4-JX") return "JoltBombAnnihilator";
    if (signature == "SB4-R") return "RadMegaBlaster";
    if (signature == "SB4-T") return "HeatMegaBlaster";
    if (signature == "SB4-J") return "JoltMegaBlaster";
    if (signature == "SB4-X") return "FusionBombMega";
    if (signature == "SB4-RX") return "RadBombMega";
    if (signature == "SB4-TX") return "HeatBombMega";
    if (signature == "SB4-JX") return "JoltBombMega";
    if (signature == "SG4-R") return "RadDeathGun";
    if (signature == "SG4-T") return "HeatDeathGun";
    if (signature == "SG4-J") return "JoltDeathGun";
    if (signature == "SG4-X") return "FusionBombDeath";
    if (signature == "SG4-RX") return "RadBombDeath";
    if (signature == "SG4-TX") return "HeatBombDeath";
    if (signature == "SG4-JX") return "JoltBombDeath";
    if (signature == "SM4-R") return "RadDoomPod";
    if (signature == "SM4-T") return "HeatDoomPod";
    if (signature == "SM4-J") return "JoltDoomPod";
    if (signature == "SM4-X") return "FusionBombDoom";
    if (signature == "SM4-RX") return "RadBombDoom";
    if (signature == "SM4-TX") return "HeatBombDoom";
    if (signature == "SM4-JX") return "JoltBombDoom";

    // Long Range Power 2 with subtypes
    if (signature == "LP2-R") return "RadPlasmaCannon";
    if (signature == "LP2-T") return "HeatPlasmaCannon";
    if (signature == "LP2-J") return "JoltPlasmaCannon";
    if (signature == "LP2-X") return "FusionBombPlasmaCannon";
    if (signature == "LP2-RX") return "RadBombPlasmaCannon";
    if (signature == "LP2-TX") return "HeatBombPlasmaCannon";
    if (signature == "LP2-JX") return "JoltBombPlasmaCannon";
    if (signature == "LB2-R") return "RadBurstCannon";
    if (signature == "LB2-T") return "HeatBurstCannon";
    if (signature == "LB2-J") return "JoltBurstCannon";
    if (signature == "LB2-X") return "FusionBombBurstCannon";
    if (signature == "LB2-RX") return "RadBombBurstCannon";
    if (signature == "LB2-TX") return "HeatBombBurstCannon";
    if (signature == "LB2-JX") return "JoltBombBurstCannon";
    if (signature == "LG2-R") return "RadGuidedMissile";
    if (signature == "LG2-T") return "HeatGuidedMissile";
    if (signature == "LG2-J") return "JoltGuidedMissile";
    if (signature == "LG2-X") return "FusionBombGuidedMissile";
    if (signature == "LG2-RX") return "RadBombGuidedMissile";
    if (signature == "LG2-TX") return "HeatBombGuidedMissile";
    if (signature == "LG2-JX") return "JoltBombGuidedMissile";
    if (signature == "LM2-R") return "RadFlakCannon";
    if (signature == "LM2-T") return "HeatFlakCannon";
    if (signature == "LM2-J") return "JoltFlakCannon";
    if (signature == "LM2-X") return "FusionBombFlakCannon";
    if (signature == "LM2-RX") return "RadBombFlakCannon";
    if (signature == "LM2-TX") return "HeatBombFlakCannon";
    if (signature == "LM2-JX") return "JoltBombFlakCannon";

    // Long Range Power 3 with subtypes
    if (signature == "LP3-R") return "RadQuantumLance";
    if (signature == "LP3-T") return "HeatQuantumLance";
    if (signature == "LP3-J") return "JoltQuantumLance";
    if (signature == "LP3-X") return "FusionBombQuantumLance";
    if (signature == "LP3-RX") return "RadBombQuantumLance";
    if (signature == "LP3-TX") return "HeatBombQuantumLance";
    if (signature == "LP3-JX") return "JoltBombQuantumLance";
    if (signature == "LB3-R") return "RadClusterBomb";
    if (signature == "LB3-T") return "HeatClusterBomb";
    if (signature == "LB3-J") return "JoltClusterBomb";
    if (signature == "LB3-X") return "FusionBombClusterBomb";
    if (signature == "LB3-RX") return "RadBombClusterBomb";
    if (signature == "LB3-TX") return "HeatBombClusterBomb";
    if (signature == "LB3-JX") return "JoltBombClusterBomb";
    if (signature == "LG3-R") return "RadDroneSwarm";
    if (signature == "LG3-T") return "HeatDroneSwarm";
    if (signature == "LG3-J") return "JoltDroneSwarm";
    if (signature == "LG3-X") return "FusionBombDroneSwarm";
    if (signature == "LG3-RX") return "RadBombDroneSwarm";
    if (signature == "LG3-TX") return "HeatBombDroneSwarm";
    if (signature == "LG3-JX") return "JoltBombDroneSwarm";
    if (signature == "LM3-R") return "RadParticleBeam";
    if (signature == "LM3-T") return "HeatParticleBeam";
    if (signature == "LM3-J") return "JoltParticleBeam";
    if (signature == "LM3-X") return "FusionBombParticleBeam";
    if (signature == "LM3-RX") return "RadBombParticleBeam";
    if (signature == "LM3-TX") return "HeatBombParticleBeam";
    if (signature == "LM3-JX") return "JoltBombParticleBeam";

    // Long Range Power 4 with subtypes
    if (signature == "LP4-R") return "RadAnnihilator";
    if (signature == "LP4-T") return "HeatAnnihilator";
    if (signature == "LP4-J") return "JoltAnnihilator";
    if (signature == "LP4-X") return "FusionBombAnnihilator";
    if (signature == "LP4-RX") return "RadBombAnnihilator";
    if (signature == "LP4-TX") return "HeatBombAnnihilator";
    if (signature == "LP4-JX") return "JoltBombAnnihilator";
    if (signature == "LB4-R") return "RadMegaCannon";
    if (signature == "LB4-T") return "HeatMegaCannon";
    if (signature == "LB4-J") return "JoltMegaCannon";
    if (signature == "LB4-X") return "FusionBombMegaCannon";
    if (signature == "LB4-RX") return "RadBombMegaCannon";
    if (signature == "LB4-TX") return "HeatBombMegaCannon";
    if (signature == "LB4-JX") return "JoltBombMegaCannon";
    if (signature == "LG4-R") return "RadDeathMissile";
    if (signature == "LG4-T") return "HeatDeathMissile";
    if (signature == "LG4-J") return "JoltDeathMissile";
    if (signature == "LG4-X") return "FusionBombDeathMissile";
    if (signature == "LG4-RX") return "RadBombDeathMissile";
    if (signature == "LG4-TX") return "HeatBombDeathMissile";
    if (signature == "LG4-JX") return "JoltBombDeathMissile";
    if (signature == "LM4-R") return "RadDoomCannon";
    if (signature == "LM4-T") return "HeatDoomCannon";
    if (signature == "LM4-J") return "JoltDoomCannon";
    if (signature == "LM4-X") return "FusionBombDoomCannon";
    if (signature == "LM4-RX") return "RadBombDoomCannon";
    if (signature == "LM4-TX") return "HeatBombDoomCannon";
    if (signature == "LM4-JX") return "JoltBombDoomCannon";

    // Arc Range Power 2 with subtypes
    if (signature == "AP2-R") return "RadArcLance";
    if (signature == "AP2-T") return "HeatArcLance";
    if (signature == "AP2-J") return "JoltArcLance";
    if (signature == "AP2-X") return "FusionBombArcLance";
    if (signature == "AP2-RX") return "RadBombArcLance";
    if (signature == "AP2-TX") return "HeatBombArcLance";
    if (signature == "AP2-JX") return "JoltBombArcLance";
    if (signature == "AB2-R") return "RadArcBlast";
    if (signature == "AB2-T") return "HeatArcBlast";
    if (signature == "AB2-J") return "JoltArcBlast";
    if (signature == "AB2-X") return "FusionBombArcBlast";
    if (signature == "AB2-RX") return "RadBombArcBlast";
    if (signature == "AB2-TX") return "HeatBombArcBlast";
    if (signature == "AB2-JX") return "JoltBombArcBlast";
    if (signature == "AG2-R") return "RadArcStorm";
    if (signature == "AG2-T") return "HeatArcStorm";
    if (signature == "AG2-J") return "JoltArcStorm";
    if (signature == "AG2-X") return "FusionBombArcStorm";
    if (signature == "AG2-RX") return "RadBombArcStorm";
    if (signature == "AG2-TX") return "HeatBombArcStorm";
    if (signature == "AG2-JX") return "JoltBombArcStorm";
    if (signature == "AM2-R") return "RadArcWave";
    if (signature == "AM2-T") return "HeatArcWave";
    if (signature == "AM2-J") return "JoltArcWave";
    if (signature == "AM2-X") return "FusionBombArcWave";
    if (signature == "AM2-RX") return "RadBombArcWave";
    if (signature == "AM2-TX") return "HeatBombArcWave";
    if (signature == "AM2-JX") return "JoltBombArcWave";

    // Arc Range Power 3 with subtypes
    if (signature == "AP3-R") return "RadArcBeam";
    if (signature == "AP3-T") return "HeatArcBeam";
    if (signature == "AP3-J") return "JoltArcBeam";
    if (signature == "AP3-X") return "FusionBombArcBeam";
    if (signature == "AP3-RX") return "RadBombArcBeam";
    if (signature == "AP3-TX") return "HeatBombArcBeam";
    if (signature == "AP3-JX") return "JoltBombArcBeam";
    if (signature == "AB3-R") return "RadArcBlast";
    if (signature == "AB3-T") return "HeatArcBlast";
    if (signature == "AB3-J") return "JoltArcBlast";
    if (signature == "AB3-X") return "FusionBombArcBlast";
    if (signature == "AB3-RX") return "RadBombArcBlast";
    if (signature == "AB3-TX") return "HeatBombArcBlast";
    if (signature == "AB3-JX") return "JoltBombArcBlast";
    if (signature == "AG3-R") return "RadArcStorm";
    if (signature == "AG3-T") return "HeatArcStorm";
    if (signature == "AG3-J") return "JoltArcStorm";
    if (signature == "AG3-X") return "FusionBombArcStorm";
    if (signature == "AG3-RX") return "RadBombArcStorm";
    if (signature == "AG3-TX") return "HeatBombArcStorm";
    if (signature == "AG3-JX") return "JoltBombArcStorm";
    if (signature == "AM3-R") return "RadArcWave";
    if (signature == "AM3-T") return "HeatArcWave";
    if (signature == "AM3-J") return "JoltArcWave";
    if (signature == "AM3-X") return "FusionBombArcWave";
    if (signature == "AM3-RX") return "RadBombArcWave";
    if (signature == "AM3-TX") return "HeatBombArcWave";
    if (signature == "AM3-JX") return "JoltBombArcWave";

    // Arc Range Power 4 with subtypes
    if (signature == "AP4-R") return "RadArcAnnihilator";
    if (signature == "AP4-T") return "HeatArcAnnihilator";
    if (signature == "AP4-J") return "JoltArcAnnihilator";
    if (signature == "AP4-X") return "FusionBombArcAnnihilator";
    if (signature == "AP4-RX") return "RadBombArcAnnihilator";
    if (signature == "AP4-TX") return "HeatBombArcAnnihilator";
    if (signature == "AP4-JX") return "JoltBombArcAnnihilator";
    if (signature == "AB4-R") return "RadArcDoom";
    if (signature == "AB4-T") return "HeatArcDoom";
    if (signature == "AB4-J") return "JoltArcDoom";
    if (signature == "AB4-X") return "FusionBombArcDoom";
    if (signature == "AB4-RX") return "RadBombArcDoom";
    if (signature == "AB4-TX") return "HeatBombArcDoom";
    if (signature == "AB4-JX") return "JoltBombArcDoom";
    if (signature == "AG4-R") return "RadArcDeath";
    if (signature == "AG4-T") return "HeatArcDeath";
    if (signature == "AG4-J") return "JoltArcDeath";
    if (signature == "AG4-X") return "FusionBombArcDeath";
    if (signature == "AG4-RX") return "RadBombArcDeath";
    if (signature == "AG4-TX") return "HeatBombArcDeath";
    if (signature == "AG4-JX") return "JoltBombArcDeath";
    if (signature == "AM4-R") return "RadArcApocalypse";
    if (signature == "AM4-T") return "HeatArcApocalypse";
    if (signature == "AM4-J") return "JoltArcApocalypse";
    if (signature == "AM4-X") return "FusionBombArcApocalypse";
    if (signature == "AM4-RX") return "RadBombArcApocalypse";
    if (signature == "AM4-TX") return "HeatBombArcApocalypse";
    if (signature == "AM4-JX") return "JoltBombArcApocalypse";

    return "Unknown";
  }

  isMAC(unit: MAC | AuxiliaryUnit): unit is MAC {
    return 'class' in unit;
  }

  getCost(unit: MAC | AuxiliaryUnit): number {
    if (this.isMAC(unit)) {
      let baseCost = 0;
      switch (unit.class) {
        case 1:
          baseCost = 12;
          break;
        case 2:
          baseCost = 16;
          break;
        case 3:
          baseCost = 20;
          break;
      }
      // Count Frame modules and reduce cost
      const frameCount = unit.modules.filter((m: Module) => 
        m.type === 'hardware' && m.hardware?.name === 'Frame'
      ).length;
      return baseCost - frameCount;
    } else {
      let cost = 1; // Base cost of 1 for auxiliary units
      // Add cost for each module
      unit.modules.forEach((module: Module) => {
        if (module.type === "weapon" && module.weapon) {
          cost += module.weapon.power;
        } else if (module.type === "hardware") {
          cost += 1;
        }
      });
      // Multiply cost by formation size for auxiliary units
      return cost * (unit.formationSize || 1);
    }
  }

} 