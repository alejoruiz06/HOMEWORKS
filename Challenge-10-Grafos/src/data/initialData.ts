export interface Person {
  id: string;
  name: string;
  age: number;
  city: string;
}

export interface City {
  id: string;
  name: string;
}

export const cities: City[] = [
  { id: "city-cali", name: "Cali" },
  { id: "city-palmira", name: "Palmira" },
  { id: "city-bogota", name: "Bogotá" },
  { id: "city-medellin", name: "Medellín" },
];

export const people: Person[] = [
  { id: "person-1", name: "Juan Pérez", age: 22, city: "Cali" },
  { id: "person-2", name: "Laura Gómez", age: 20, city: "Palmira" },
  { id: "person-3", name: "Carlos Ruiz", age: 25, city: "Bogotá" },
  { id: "person-4", name: "María López", age: 21, city: "Cali" },
  { id: "person-5", name: "Andrés Díaz", age: 23, city: "Medellín" },
  { id: "person-6", name: "Sofía Torres", age: 19, city: "Palmira" },
];