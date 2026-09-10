export class NodoDoble {
  paciente: string
  anterior: NodoDoble | null
  siguiente: NodoDoble | null

  constructor(paciente: string) {
    this.paciente = paciente
    this.anterior = null
    this.siguiente = null
  }
}

export class ListaDoble {
  cabeza: NodoDoble | null
  cola: NodoDoble | null

  constructor() {
    this.cabeza = null
    this.cola = null
  }

  agregar(paciente: string) {
    const nuevo = new NodoDoble(paciente)

    if (this.cabeza === null) {
      this.cabeza = nuevo
      this.cola = nuevo
      return
    }

    nuevo.anterior = this.cola

    if (this.cola !== null) {
      this.cola.siguiente = nuevo
    }

    this.cola = nuevo
  }

  mostrar(): string[] {
    const pacientes: string[] = []
    let actual = this.cabeza

    while (actual !== null) {
      pacientes.push(actual.paciente)
      actual = actual.siguiente
    }

    return pacientes
  }
}