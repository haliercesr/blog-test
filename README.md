# Blog App

Un blog moderno construido con React, TypeScript y styled-components.

## Características

- ✅ Ver posts con imagen principal, tags y usuario
- ✅ Modal de comentarios al hacer click en un post
- ✅ Filtrado de posts por tags
- ✅ Autenticación con Google Sign-In
- ✅ Vista protegida de usuarios (requiere login)
- ✅ Cache simple de imágenes para carga más rápida
- ✅ Instancia única de Axios con interceptores

## Estructura del Proyecto

```
src/
├── api/                 # Conexiones API y axios instance
├── components/          # Componentes reutilizables
│   ├── Comments/
│   ├── Header/
│   ├── Loader/
│   ├── Modal/
│   ├── Posts/
│   ├── Tags/
│   └── Users/
├── context/             # React Context providers
│   ├── auth/
│   ├── posts/
│   └── ui/
├── hooks/               # Custom hooks
├── interfaces/          # TypeScript interfaces
├── pages/               # Páginas de la app
│   ├── Home/
│   ├── Users/
│   └── NotFound/
├── router/              # Configuración de rutas
├── theme/               # Tema y estilos globales
└── utils/               # Utilidades y helpers
```

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Copia `example.env` a `.env` y configura las variables:
   ```bash
   cp example.env .env
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Configuración

### DummyAPI
1. Ve a [DummyAPI](https://dummyapi.io/) y crea una cuenta
2. Obtén tu App ID
3. Agrégalo en `VITE_DUMMY_API_APP_ID`

### Google Sign-In
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto y configura OAuth 2.0
3. Obtén tu Client ID
4. Agrégalo en `VITE_GOOGLE_CLIENT_ID`

## Tecnologías

- React 18
- TypeScript
- Vite
- styled-components
- React Router DOM
- Axios
- @react-oauth/google
- date-fns

## API

La app consume la [DummyAPI](https://dummyapi.io/docs):

- `GET /post` - Lista de posts
- `GET /post/{id}/comment` - Comentarios de un post
- `GET /tag` - Lista de tags
- `GET /tag/{tag}/post` - Posts por tag
- `GET /user` - Lista de usuarios
