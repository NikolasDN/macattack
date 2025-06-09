interface AuxiliaryUnit {
    name: string;
    type: "infantry" | "vehicle";
    formationSize: number;
    weapons: Weapon[];
    hardware: Hardware[];
    initiativeCard: string;
  }