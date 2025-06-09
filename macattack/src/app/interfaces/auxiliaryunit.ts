import { Module } from "./module";
export interface AuxiliaryUnit {
    name: string;
    type: "infantry" | "vehicle";
    formationSize: number;
    modules: Module[];
  }