import { MAC } from "./MAC";
import { AuxiliaryUnit } from "./auxiliaryunit";

export interface Force {
    name: string;
    pointsLimit: number;
    macs: MAC[];
    auxiliaries: AuxiliaryUnit[];
  }