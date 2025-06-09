import { Module } from "./module";

export interface MAC {
    name: string;
    class: MACClass;
    modules: Module[];
  }

  // Enum for MAC class types
type MACClass = 1 | 2 | 3;