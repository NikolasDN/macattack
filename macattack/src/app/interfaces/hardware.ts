interface Hardware {
    name: string;
    applicableTo: "M" | "I" | "V" | "A"; // MAC, Infantry, Vehicle, All
    effect: string;
  }