import { Weapon } from "./weapon";
import { Hardware } from "./hardware";

export interface AuxiliaryUnit {
    name: string;
    type: "infantry" | "vehicle";
    formationSize: number;
    weapons: Weapon[];
    hardware: Hardware[];
  }