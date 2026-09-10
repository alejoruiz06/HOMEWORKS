export class NodoMedico {
  medico: string
  siguiente: NodoMedico | null

  constructor(medico: string) {
    this.medico = medico
    this.siguiente = null
  }
}

export class ListaCircular {
  cabeza: NodoMedico | null
  actual: NodoMedico | null

  constructor() {
    this.cabeza = null
    this.actual = null
  }

  agregar(medico: string) {
    const nuevo = new NodoMedico(medico)

    if (this.cabeza === null) {
      this.cabeza = nuevo
      nuevo.siguiente = nuevo
      this.actual = nuevo
      return
    }

    let ultimo = this.cabeza

    while (ultimo.siguiente !== this.cabeza) {
      ultimo = ultimo.siguiente!
    }

    ultimo.siguiente = nuevo
    nuevo.siguiente = this.cabeza
  }

  siguienteMedico(): string | null {
    if (this.actual === null || this.actual.siguiente === null) {
      return null
    }

    this.actual = this.actual.siguiente
    return this.actual.medico
  }

  medicoActual(): string | null {
    if (this.actual === null) {
      return null
    }

    return this.actual.medico
  }

  mostrar(): string[] {
    const medicos: string[] = []

    if (this.cabeza === null) {
      return medicos
    }

    let actual = this.cabeza

    do {
      medicos.push(actual.medico)
      actual = actual.siguiente!
    } while (actual !== this.cabeza)

    return medicos
  }
}