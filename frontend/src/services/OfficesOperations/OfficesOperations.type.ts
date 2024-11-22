export interface OfficesEmployeeInventory {
  id: string;
  name: string;
}

export interface OfficesEmployee {
  id: string;
  fio: string;
  position: string;
  place: string;
  email: string;
  // то, что на столе
  inventory: OfficesEmployeeInventory[];
}
