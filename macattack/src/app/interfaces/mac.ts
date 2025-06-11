import { Module } from "./module";

export interface MAC {
    name: string;
    class: MACClass;
    modules: Module[];
    image: string;
  }

  // Enum for MAC class types
export type MACClass = 1 | 2 | 3;