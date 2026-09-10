export class Nodo {
  paciente: string
  siguiente: Nodo | null

  constructor(paciente: string) {
    this.paciente = paciente
    this.siguiente = null
  }
}

export class ListaSimple {
  cabeza: Nodo | null

  constructor() {
    this.cabeza = null
  }

  agregar(paciente: string) {
    const nuevo = new Nodo(paciente)

    if (this.cabeza === null) {
      this.cabeza = nuevo
      return
    }

    let actual = this.cabeza

    while (actual.siguiente !== null) {
      actual = actual.siguiente
    }

    actual.siguiente = nuevo
  }

  atender(): string | null {
    if (this.cabeza === null) {
      return null
    }

    const paciente = this.cabeza.paciente
    this.cabeza = this.cabeza.siguiente

    return paciente
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