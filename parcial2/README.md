# Parcial 2 — Explorador de carpetas y archivos

Aplicación en React + TypeScript + Vite con un árbol n-ario implementado desde cero, autenticación y persistencia. La organización se basa en las clases de React, árboles, Firebase y SASS.

## Requisitos
- Node.js LTS instalado.
- npm.

## Ejecutar en modo de prueba (sin Firebase)
1. Copia `.env.example` a `.env`.
2. Deja `VITE_USE_MOCK=true`.
3. En la terminal, dentro de esta carpeta ejecuta:
   ```bash
   npm install
   npm run dev
   ```
4. Abre la dirección local que muestra Vite.
5. Registra un usuario con correo y contraseña de mínimo 6 caracteres. Los usuarios y archivos quedan guardados en el navegador mediante `localStorage` para simular la persistencia durante la demostración.

## Activar Firebase real
1. Crea un proyecto en Firebase Console.
2. En Authentication, activa el proveedor Email/Password.
3. En Firestore Database, crea la base de datos.
4. Copia `.env.example` a `.env`, cambia `VITE_USE_MOCK=false` y completa las variables `VITE_FIREBASE_*` con la configuración de la aplicación web Firebase.
5. Reinicia `npm run dev`.

Para una entrega real, configura reglas de Firestore que limiten lectura y escritura al usuario autenticado y a documentos cuyo `ownerId` sea su UID. No publiques claves privadas ni contraseñas en el repositorio.

## Estructura importante
- `src/structures/TreeNode.ts`: nodo con dato y lista de hijos.
- `src/structures/NaryTree.ts`: construcción del árbol, búsqueda y recorrido DFS.
- `src/context/AuthContext.tsx`: registro, inicio y cierre de sesión.
- `src/context/FileSystemContext.tsx`: creación y persistencia de carpetas/archivos.
- `src/components/`: formularios y presentación visual.
- `src/styles.scss`: estilos con variables y reglas anidadas.

## Reglas implementadas
- Se debe registrar o iniciar sesión antes de crear elementos.
- Cada elemento guarda el correo creador y el UID propietario.
- Un archivo no puede ser padre de otros elementos.
- Solo se puede crear dentro de la raíz o de una carpeta existente.
- No se permiten nombres vacíos ni repetidos en una misma carpeta.
- Se puede consultar el árbol y recorrerlo en profundidad (DFS).

## Nota sobre el modo mock
El modo mock permite probar la aplicación sin una cuenta Firebase. `localStorage` simula la base de datos, por lo que los datos quedan guardados en ese navegador y equipo; para almacenamiento en nube, usa Firebase real.

En Firebase Console, publica el contenido de `firestore.rules` en las reglas de Firestore antes de probar la persistencia en la nube.
