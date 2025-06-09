interface Weapon {
    name: string;
    range: "S" | "L" | "A"; // Short, Long, Arc
    type: "B" | "P" | "G" | "M"; // Burst, Piercing, Guided, Multi
    power: 1 | 2 | 3 | 4;
    subtype?: "X" | "T" | "J" | "R"; // Expendable, Thermal, Jolt, Rad
    isBrawl?: boolean;
    brawlType?: "B" | "P" | "G" | "M";
    brawlSubtype?: "X" | "T" | "J" | "R";
  }