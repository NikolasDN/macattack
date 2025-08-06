import { Module, ModuleOrNull } from "./module";
export interface AuxiliaryUnit {
    name: string;
    type: "infantry" | "vehicle";
    formationSize: number;
    modules: ModuleOrNull[];
    image: string;
    imageWidth?: number;
    imageHeight?: number;
  }