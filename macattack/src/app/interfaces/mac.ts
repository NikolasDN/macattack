interface MAC {
    name: string;
    class: MACClass;
    modules: [Module, Module, Module, Module, Module, Module];
    initiativeCard: string;
    commander?: boolean;
  }

  // Enum for MAC class types
type MACClass = 1 | 2 | 3;