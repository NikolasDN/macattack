import { Module } from "./module";

export interface MAC {
    name: string;
    class: MACClass;
    modules: Module[];
    commander?: boolean;
  }

  // Enum for MAC class types
type MACClass = 1 | 2 | 3;