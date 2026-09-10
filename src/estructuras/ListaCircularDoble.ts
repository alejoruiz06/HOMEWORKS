export class NodoAdmin {
  nombre: string
  anterior: NodoAdmin | null
  siguiente: NodoAdmin | null

  constructor(nombre: string) {
    this.nombre = nombre
    this.anterior = null
    this.siguiente = null
  }
}

export class ListaCircularDoble {
  cabeza: NodoAdmin | null

  constructor() {
    this.cabeza = null
  }

  agregar(nombre: string) {
    const nuevo = new NodoAdmin(nombre)

    if (this.cabeza === null) {
      this.cabeza = nuevo
      nuevo.siguiente = nuevo
      nuevo.anterior = nuevo
      return
    }

    const ultimo = this.cabeza.anterior!

    nuevo.siguiente = this.cabeza
    nuevo.anterior = ultimo

    ultimo.siguiente = nuevo
    this.cabeza.anterior = nuevo
  }

  eliminar(nombre: string): boolean {
    if (this.cabeza === null) {
      return false
    }

    let actual = this.cabeza

    do {
      if (actual.nombre === nombre) {
        if (actual.siguiente === actual) {
          this.cabeza = null
          return true
        }

        actual.anterior!.siguiente = actual.siguiente
        actual.siguiente!.anterior = actual.anterior

        if (actual === this.cabeza) {
          this.cabeza = actual.siguiente
        }

        return true
      }

      actual = actual.siguiente!
    } while (actual !== this.cabeza)

    return false
  }

  mostrar(): string[] {
    const administradores: string[] = []

    if (this.cabeza === null) {
      return administradores
    }

    let actual = this.cabeza

    do {
      administradores.push(actual.nombre)
      actual = actual.siguiente!
    } while (actual !== this.cabeza)

    return administradores
  }
}