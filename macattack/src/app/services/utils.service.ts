import { Injectable } from '@angular/core';
import { MAC } from '../interfaces/mac';
import { AuxiliaryUnit } from '../interfaces/auxiliaryunit';
import { Module } from '../interfaces/module';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  // 📦 All modules: weapons and hardware
  allModules: Module[] = [
    // Short Range Weapons (S)
    // Power 1
    { type: "weapon", weapon: { name: "LaserCarbine", range: "S", type: "P", power: 1 } },
    { type: "weapon", weapon: { name: "PulseBlaster", range: "S", type: "B", power: 1 } },
    { type: "weapon", weapon: { name: "SeekerDart", range: "S", type: "G", power: 1 } },
    { type: "weapon", weapon: { name: "FlakRepeater", range: "S", type: "M", power: 1 } },
    // Power 1 with subtypes
    { type: "weapon", weapon: { name: "RadPistol", range: "S", type: "P", power: 1, subtype: "R" } },
    { type: "weapon", weapon: { name: "HeatBlaster", range: "S", type: "B", power: 1, subtype: "T" } },
    { type: "weapon", weapon: { name: "StunGun", range: "S", type: "G", power: 1, subtype: "J" } },
    { type: "weapon", weapon: { name: "FusionBomb", range: "S", type: "M", power: 1, subtype: "X" } },
    { type: "weapon", weapon: { name: "RadBolt", range: "S", type: "P", power: 1, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatWave", range: "S", type: "B", power: 1, subtype: "TX" } },
    { type: "weapon", weapon: { name: "StunPod", range: "S", type: "G", power: 1, subtype: "JX" } },

    // Power 2
    { type: "weapon", weapon: { name: "PlasmaRifle", range: "S", type: "P", power: 2 } },
    { type: "weapon", weapon: { name: "BurstCannon", range: "S", type: "B", power: 2 } },
    { type: "weapon", weapon: { name: "HomingMissile", range: "S", type: "G", power: 2 } },
    { type: "weapon", weapon: { name: "ScatterGun", range: "S", type: "M", power: 2 } },
    // Power 2 with subtypes
    { type: "weapon", weapon: { name: "GammaRay", range: "S", type: "P", power: 2, subtype: "R" } },
    { type: "weapon", weapon: { name: "FlameThrower", range: "S", type: "B", power: 2, subtype: "T" } },
    { type: "weapon", weapon: { name: "ShockOrb", range: "S", type: "G", power: 2, subtype: "J" } },
    { type: "weapon", weapon: { name: "FragGrenade", range: "S", type: "M", power: 2, subtype: "X" } },
    { type: "weapon", weapon: { name: "ToxiPods", range: "S", type: "P", power: 2, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatBurst", range: "S", type: "B", power: 2, subtype: "TX" } },
    { type: "weapon", weapon: { name: "StunMissile", range: "S", type: "G", power: 2, subtype: "JX" } },

    // Power 3
    { type: "weapon", weapon: { name: "PlasmaCutter", range: "S", type: "P", power: 3 } },
    { type: "weapon", weapon: { name: "BlastCannon", range: "S", type: "B", power: 3 } },
    { type: "weapon", weapon: { name: "SeekerMissile", range: "S", type: "G", power: 3 } },
    { type: "weapon", weapon: { name: "MultiCannon", range: "S", type: "M", power: 3 } },
    // Power 3 with subtypes
    { type: "weapon", weapon: { name: "RadBeam", range: "S", type: "P", power: 3, subtype: "R" } },
    { type: "weapon", weapon: { name: "HellSurge", range: "S", type: "B", power: 3, subtype: "T" } },
    { type: "weapon", weapon: { name: "JoltCannon", range: "S", type: "G", power: 3, subtype: "J" } },
    { type: "weapon", weapon: { name: "ClusterBomb", range: "S", type: "M", power: 3, subtype: "X" } },
    { type: "weapon", weapon: { name: "RadCluster", range: "S", type: "P", power: 3, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatCluster", range: "S", type: "B", power: 3, subtype: "TX" } },
    { type: "weapon", weapon: { name: "JoltCluster", range: "S", type: "G", power: 3, subtype: "JX" } },

    // Power 4
    { type: "weapon", weapon: { name: "PlasmaLance", range: "S", type: "P", power: 4 } },
    { type: "weapon", weapon: { name: "MegaCannon", range: "S", type: "B", power: 4 } },
    { type: "weapon", weapon: { name: "DeathMissile", range: "S", type: "G", power: 4 } },
    { type: "weapon", weapon: { name: "DoomCannon", range: "S", type: "M", power: 4 } },
    // Power 4 with subtypes
    { type: "weapon", weapon: { name: "RadLance", range: "S", type: "P", power: 4, subtype: "R" } },
    { type: "weapon", weapon: { name: "HellCannon", range: "S", type: "B", power: 4, subtype: "T" } },
    { type: "weapon", weapon: { name: "JoltLance", range: "S", type: "G", power: 4, subtype: "J" } },
    { type: "weapon", weapon: { name: "MegaBomb", range: "S", type: "M", power: 4, subtype: "X" } },
    { type: "weapon", weapon: { name: "RadBomb", range: "S", type: "P", power: 4, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatBomb", range: "S", type: "B", power: 4, subtype: "TX" } },
    { type: "weapon", weapon: { name: "JoltBomb", range: "S", type: "G", power: 4, subtype: "JX" } },

    // Long Range Weapons (L)
    // Power 1
    { type: "weapon", weapon: { name: "LaserRifle", range: "L", type: "P", power: 1 } },
    { type: "weapon", weapon: { name: "AutoCannon", range: "L", type: "B", power: 1 } },
    { type: "weapon", weapon: { name: "SmartCannon", range: "L", type: "G", power: 1 } },
    { type: "weapon", weapon: { name: "MultiCannon", range: "L", type: "M", power: 1 } },
    // Power 1 with subtypes
    { type: "weapon", weapon: { name: "RadRifle", range: "L", type: "P", power: 1, subtype: "R" } },
    { type: "weapon", weapon: { name: "HeatCannon", range: "L", type: "B", power: 1, subtype: "T" } },
    { type: "weapon", weapon: { name: "JoltRifle", range: "L", type: "G", power: 1, subtype: "J" } },
    { type: "weapon", weapon: { name: "ImpactNeedle", range: "L", type: "M", power: 1, subtype: "X" } },
    { type: "weapon", weapon: { name: "RadNeedle", range: "L", type: "P", power: 1, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatNeedle", range: "L", type: "B", power: 1, subtype: "TX" } },
    { type: "weapon", weapon: { name: "JoltNeedle", range: "L", type: "G", power: 1, subtype: "JX" } },
    { type: "weapon", weapon: { name: "FragGrenade", range: "L", type: "B", power: 1, subtype: "X" } },
    { type: "weapon", weapon: { name: "PierceGrenade", range: "L", type: "P", power: 1, subtype: "X" } },
    { type: "weapon", weapon: { name: "SeekerGrenade", range: "L", type: "G", power: 1, subtype: "X" } },
    { type: "weapon", weapon: { name: "ScatterGrenade", range: "L", type: "M", power: 1, subtype: "X" } },

    // Power 2
    { type: "weapon", weapon: { name: "PlasmaCannon", range: "L", type: "P", power: 2 } },
    { type: "weapon", weapon: { name: "BurstCannon", range: "L", type: "B", power: 2 } },
    { type: "weapon", weapon: { name: "GuidedMissile", range: "L", type: "G", power: 2 } },
    { type: "weapon", weapon: { name: "FlakCannon", range: "L", type: "M", power: 2 } },
    // Power 2 with subtypes
    { type: "weapon", weapon: { name: "RadCannon", range: "L", type: "P", power: 2, subtype: "R" } },
    { type: "weapon", weapon: { name: "FireCannon", range: "L", type: "B", power: 2, subtype: "T" } },
    { type: "weapon", weapon: { name: "GravTether", range: "L", type: "G", power: 2, subtype: "J" } },
    { type: "weapon", weapon: { name: "FlareMissiles", range: "L", type: "M", power: 2, subtype: "X" } },
    { type: "weapon", weapon: { name: "RadMissile", range: "L", type: "P", power: 2, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatMissile", range: "L", type: "B", power: 2, subtype: "TX" } },
    { type: "weapon", weapon: { name: "JoltMissile", range: "L", type: "G", power: 2, subtype: "JX" } },
    { type: "weapon", weapon: { name: "BurstMissile", range: "L", type: "B", power: 2, subtype: "X" } },
    { type: "weapon", weapon: { name: "LanceMissile", range: "L", type: "P", power: 2, subtype: "X" } },
    { type: "weapon", weapon: { name: "HomingMissile", range: "L", type: "G", power: 2, subtype: "X" } },
    { type: "weapon", weapon: { name: "ClusterMissile", range: "L", type: "M", power: 2, subtype: "X" } },

    // Power 3
    { type: "weapon", weapon: { name: "QuantumLance", range: "L", type: "P", power: 3 } },
    { type: "weapon", weapon: { name: "ClusterBomb", range: "L", type: "B", power: 3 } },
    { type: "weapon", weapon: { name: "DroneSwarm", range: "L", type: "G", power: 3 } },
    { type: "weapon", weapon: { name: "ParticleBeam", range: "L", type: "M", power: 3 } },
    // Power 3 with subtypes
    { type: "weapon", weapon: { name: "RadLance", range: "L", type: "P", power: 3, subtype: "R" } },
    { type: "weapon", weapon: { name: "HeatLance", range: "L", type: "B", power: 3, subtype: "T" } },
    { type: "weapon", weapon: { name: "JoltLance", range: "L", type: "G", power: 3, subtype: "J" } },
    { type: "weapon", weapon: { name: "BarometricBombs", range: "L", type: "M", power: 3, subtype: "X" } },
    { type: "weapon", weapon: { name: "RadBomb", range: "L", type: "P", power: 3, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatBomb", range: "L", type: "B", power: 3, subtype: "TX" } },
    { type: "weapon", weapon: { name: "JoltBomb", range: "L", type: "G", power: 3, subtype: "JX" } },
    { type: "weapon", weapon: { name: "ClusterStorm", range: "L", type: "B", power: 3, subtype: "X" } },
    { type: "weapon", weapon: { name: "QuantumBolt", range: "L", type: "P", power: 3, subtype: "X" } },
    { type: "weapon", weapon: { name: "DroneBomb", range: "L", type: "G", power: 3, subtype: "X" } },
    { type: "weapon", weapon: { name: "ParticleBomb", range: "L", type: "M", power: 3, subtype: "X" } },

    // Power 4
    { type: "weapon", weapon: { name: "Annihilator", range: "L", type: "P", power: 4 } },
    { type: "weapon", weapon: { name: "MegaCannon", range: "L", type: "B", power: 4 } },
    { type: "weapon", weapon: { name: "DeathMissile", range: "L", type: "G", power: 4 } },
    { type: "weapon", weapon: { name: "DoomCannon", range: "L", type: "M", power: 4 } },
    // Power 4 with subtypes
    { type: "weapon", weapon: { name: "RadAnnihilator", range: "L", type: "P", power: 4, subtype: "R" } },
    { type: "weapon", weapon: { name: "HeatAnnihilator", range: "L", type: "B", power: 4, subtype: "T" } },
    { type: "weapon", weapon: { name: "JoltAnnihilator", range: "L", type: "G", power: 4, subtype: "J" } },
    { type: "weapon", weapon: { name: "ImploderPod", range: "L", type: "M", power: 4, subtype: "X" } },
    { type: "weapon", weapon: { name: "RadImploder", range: "L", type: "P", power: 4, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatImploder", range: "L", type: "B", power: 4, subtype: "TX" } },
    { type: "weapon", weapon: { name: "JoltImploder", range: "L", type: "G", power: 4, subtype: "JX" } },
    { type: "weapon", weapon: { name: "DoomBomb", range: "L", type: "B", power: 4, subtype: "X" } },
    { type: "weapon", weapon: { name: "AnnihilatorBomb", range: "L", type: "P", power: 4, subtype: "X" } },
    { type: "weapon", weapon: { name: "DeathBomb", range: "L", type: "G", power: 4, subtype: "X" } },
    { type: "weapon", weapon: { name: "ApocalypseBomb", range: "L", type: "M", power: 4, subtype: "X" } },

    // Arc Range Weapons (A)
    // Power 1
    { type: "weapon", weapon: { name: "ArcLaser", range: "A", type: "P", power: 1 } },
    { type: "weapon", weapon: { name: "ArcBlaster", range: "A", type: "B", power: 1 } },
    { type: "weapon", weapon: { name: "ArcSeeker", range: "A", type: "G", power: 1 } },
    { type: "weapon", weapon: { name: "ArcFlak", range: "A", type: "M", power: 1 } },
    // Power 1 with subtypes
    { type: "weapon", weapon: { name: "RadArc", range: "A", type: "P", power: 1, subtype: "R" } },
    { type: "weapon", weapon: { name: "HeatArc", range: "A", type: "B", power: 1, subtype: "T" } },
    { type: "weapon", weapon: { name: "JoltArc", range: "A", type: "G", power: 1, subtype: "J" } },
    { type: "weapon", weapon: { name: "ArcBomb", range: "A", type: "M", power: 1, subtype: "X" } },
    { type: "weapon", weapon: { name: "RadArcBomb", range: "A", type: "P", power: 1, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatArcBomb", range: "A", type: "B", power: 1, subtype: "TX" } },
    { type: "weapon", weapon: { name: "JoltArcBomb", range: "A", type: "G", power: 1, subtype: "JX" } },

    // Power 2
    { type: "weapon", weapon: { name: "Howitzer", range: "A", type: "P", power: 2 } },
    { type: "weapon", weapon: { name: "ArcCannon", range: "A", type: "B", power: 2 } },
    { type: "weapon", weapon: { name: "ArcMissile", range: "A", type: "G", power: 2 } },
    { type: "weapon", weapon: { name: "ArcArray", range: "A", type: "M", power: 2 } },
    // Power 2 with subtypes
    { type: "weapon", weapon: { name: "RadHowitzer", range: "A", type: "P", power: 2, subtype: "R" } },
    { type: "weapon", weapon: { name: "HeatHowitzer", range: "A", type: "B", power: 2, subtype: "T" } },
    { type: "weapon", weapon: { name: "JoltHowitzer", range: "A", type: "G", power: 2, subtype: "J" } },
    { type: "weapon", weapon: { name: "ArcPod", range: "A", type: "M", power: 2, subtype: "X" } },
    { type: "weapon", weapon: { name: "RadArcPod", range: "A", type: "P", power: 2, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatArcPod", range: "A", type: "B", power: 2, subtype: "TX" } },
    { type: "weapon", weapon: { name: "JoltArcPod", range: "A", type: "G", power: 2, subtype: "JX" } },

    // Power 3
    { type: "weapon", weapon: { name: "ThunderStrike", range: "A", type: "P", power: 3 } },
    { type: "weapon", weapon: { name: "VortexCannon", range: "A", type: "B", power: 3 } },
    { type: "weapon", weapon: { name: "ArcDrone", range: "A", type: "G", power: 3 } },
    { type: "weapon", weapon: { name: "ArcStorm", range: "A", type: "M", power: 3 } },
    // Power 3 with subtypes
    { type: "weapon", weapon: { name: "NovaBurst", range: "A", type: "P", power: 3, subtype: "R" } },
    { type: "weapon", weapon: { name: "MeteorStorm", range: "A", type: "B", power: 3, subtype: "T" } },
    { type: "weapon", weapon: { name: "VoidRift", range: "A", type: "G", power: 3, subtype: "J" } },
    { type: "weapon", weapon: { name: "TempestArray", range: "A", type: "M", power: 3, subtype: "X" } },
    { type: "weapon", weapon: { name: "SolarFlare", range: "A", type: "P", power: 3, subtype: "RX" } },
    { type: "weapon", weapon: { name: "TsunamiWave", range: "A", type: "B", power: 3, subtype: "TX" } },
    { type: "weapon", weapon: { name: "GravityWell", range: "A", type: "G", power: 3, subtype: "JX" } },

    // Power 4
    { type: "weapon", weapon: { name: "GodHammer", range: "A", type: "P", power: 4 } },
    { type: "weapon", weapon: { name: "DoomCannon", range: "A", type: "B", power: 4 } },
    { type: "weapon", weapon: { name: "DeathMissile", range: "A", type: "G", power: 4 } },
    { type: "weapon", weapon: { name: "Apocalypse", range: "A", type: "M", power: 4 } },
    // Power 4 with subtypes
    { type: "weapon", weapon: { name: "RadHammer", range: "A", type: "P", power: 4, subtype: "R" } },
    { type: "weapon", weapon: { name: "HeatHammer", range: "A", type: "B", power: 4, subtype: "T" } },
    { type: "weapon", weapon: { name: "JoltHammer", range: "A", type: "G", power: 4, subtype: "J" } },
    { type: "weapon", weapon: { name: "HammerBomb", range: "A", type: "M", power: 4, subtype: "X" } },
    { type: "weapon", weapon: { name: "RadHammerBomb", range: "A", type: "P", power: 4, subtype: "RX" } },
    { type: "weapon", weapon: { name: "HeatHammerBomb", range: "A", type: "B", power: 4, subtype: "TX" } },
    { type: "weapon", weapon: { name: "JoltHammerBomb", range: "A", type: "G", power: 4, subtype: "JX" } },

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