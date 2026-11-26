# Soundify - Parcial 3

Proyecto académico de una plataforma sencilla para explorar canciones. Está desarrollado con React, TypeScript y Sass.

## Requisitos

- Node.js instalado
- npm

## Ejecutar el proyecto

1. Abrir la carpeta en Visual Studio Code.
2. Abrir una terminal en esa carpeta.
3. Instalar dependencias:

   ```bash
   npm install
   ```

4. Iniciar el servidor:

   ```bash
   npm run dev
   ```

5. Abrir en el navegador la dirección local que muestra Vite.

Para revisar que TypeScript y Vite compilen:

```bash
npm run build
```

## Estructuras implementadas

### Trie

Archivo: `src/helpers/structures/Trie.ts`

- `insert(title, song)`: guarda el título carácter por carácter.
- `search(title)`: comprueba si el título completo existe.
- `searchPrefix(prefix)`: busca el nodo del prefijo y recoge las canciones que continúan desde allí.

### Max Heap

Archivo: `src/helpers/structures/MaxHeap.ts`

- `insert(song)`: agrega una canción y la sube mientras tenga más reproducciones que su padre.
- `extractMax()`: elimina y devuelve la canción con más reproducciones.
- `getTop(limit)`: obtiene las primeras canciones usando una copia del heap para no alterar el ranking original.

### Grafo no dirigido

Archivo: `src/helpers/structures/Graph.ts`

- `addVertex(song)`: agrega una canción al grafo.
- `addEdge(songA, songB)`: conecta dos canciones en ambos sentidos.
- `getRelatedSongs(song)`: devuelve las canciones relacionadas.

## Datos de prueba

Las canciones están en `src/data/songs.ts`. Son datos de ejemplo para probar el buscador, el ranking y las recomendaciones.

## Nota

El proyecto no se conecta a Spotify ni consulta reproducciones reales. El ranking usa los valores de ejemplo definidos en el catálogo.
