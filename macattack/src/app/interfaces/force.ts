import { MAC } from "./mac";
import { AuxiliaryUnit } from "./auxiliaryunit";

export interface Force {
    name: string;
    pointsLimit: number;
    macs: MAC[];
    auxiliaries: AuxiliaryUnit[];
  }