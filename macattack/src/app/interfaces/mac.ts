import { Module, ModuleOrNull } from "./module";

export interface MAC {
    name: string;
    class: MACClass;
    modules: ModuleOrNull[];
    image: string;
    imageWidth?: number;
    imageHeight?: number;
  }

  // Enum for MAC class types
export type MACClass = 1 | 2 | 3;