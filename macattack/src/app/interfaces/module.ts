interface Module {
    slot: number;
    type: "weapon" | "hardware";
    weapon?: Weapon;
    hardware?: Hardware;
    status?: "intact" | "damaged" | "destroyed";
  }