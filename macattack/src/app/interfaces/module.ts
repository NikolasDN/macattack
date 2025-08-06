import { Weapon } from "./weapon";
import { Hardware } from "./hardware";

export interface Module {
    slot?: number;
    type: "weapon" | "hardware";
    weapon?: Weapon;
    hardware?: Hardware;
    status?: "intact" | "damaged" | "destroyed";
  }

export type ModuleOrNull = Module | null;