import { useEffect, useState } from "react"
import { ListaSimple } from "./estructuras/ListaSimple"
import { ListaDoble } from "./estructuras/ListaDoble"
import { ListaCircular } from "./estructuras/ListaCircular"
import { ListaCircularDoble } from "./estructuras/ListaCircularDoble"
import "./App.css"

const listaPacientes = new ListaSimple()
const historial = new ListaDoble()
const medicos = new ListaCircular()
const comite = new ListaCircularDoble()

comite.agregar("Administrador 1")
comite.agregar("Administrador 2")
comite.agregar("Administrador 3")

medicos.agregar("Dr. Carlos")
medicos.agregar("Dra. Ana")
medicos.agregar("Dr. Juan")

function App() {
  const [nombre, setNombre] = useState("")
  const [administradores, setAdministradores] = useState<string[]>(
    comite.mostrar()
  )
  const [nuevoAdministrador, setNuevoAdministrador] = useState("")
  const [pacientes, setPacientes] = useState<string[]>([])
  const [historialPacientes, setHistorialPacientes] = useState<string[]>([])
  const [medicoActual, setMedicoActual] = useState(
    medicos.medicoActual()
  )

  const agregarPaciente = () => {
    if (nombre.trim() === "") {
      return
    }

    listaPacientes.agregar(nombre)
    setPacientes(listaPacientes.mostrar())
    setNombre("")
  }

  const atenderPaciente = () => {
    const paciente = listaPacientes.atender()

    if (paciente === null) {
      return
    }

    historial.agregar(paciente)

    setPacientes(listaPacientes.mostrar())
    setHistorialPacientes(historial.mostrar())
  }

  const agregarAdministrador = () => {
    if (nuevoAdministrador.trim() === "") {
      return
    }

    comite.agregar(nuevoAdministrador)
    setAdministradores(comite.mostrar())
    setNuevoAdministrador("")
  }

  const eliminarAdministrador = (nombre: string) => {
    comite.eliminar(nombre)
    setAdministradores(comite.mostrar())
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      const siguiente = medicos.siguienteMedico()
      setMedicoActual(siguiente)
    }, 10000)

    return () => {
      clearInterval(intervalo)
    }
  }, [])

  return (
    <div>
      <h1>Sistema de Clínica</h1>

      <h2>Pacientes en espera</h2>

      <input
        type="text"
        placeholder="Nombre del paciente"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button onClick={agregarPaciente}>
        Agregar paciente
      </button>

      <button onClick={atenderPaciente}>
        Atender paciente
      </button>

      <h3>Pacientes</h3>

      <ul>
        {pacientes.map((paciente, index) => (
          <li key={index}>{paciente}</li>
        ))}
      </ul>

      <h2>Historial de atención</h2>

      <ul>
        {historialPacientes.map((paciente, index) => (
          <li key={index}>{paciente}</li>
        ))}
      </ul>

      <h2>Médico de guardia</h2>

      <p>{medicoActual}</p>
      <p>Cambia cada 10 segundos</p>

      <h2>Comité administrativo</h2>

      <input
        type="text"
        placeholder="Nuevo administrador"
        value={nuevoAdministrador}
        onChange={(e) => setNuevoAdministrador(e.target.value)}
      />

      <button onClick={agregarAdministrador}>
        Agregar administrador
      </button>

      <ul>
        {administradores.map((administrador, index) => (
          <li key={index}>
            {administrador}
            <button onClick={() => eliminarAdministrador(administrador)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App