# Meli

Este proyecto fue creado con [Nx](https://nx.dev).
🔎 **Nx es una herramienta que permite manejar monorepos con back-end y front-end**

## Instalación del proyecto

Antes de empezar es necesario instalar NPX y usar una version de Node >= 15. Una vez se cumplan éstos requerimientos se debe añadir la dependencia de NX para manejar el workspace. Ésta dependencia se instala com `npm install nx`

## API

Antes de iniciar el server de desarrollo es necesario iniciar el API con el comando `npx nx serve api`. Éste API quedará disponible para consulta en el http://localhost:3333/
## Development server

Una vez iniciado el API se debe iniciar el server de desarrollo con el comando `npx nx serve meli`. Con este comando la app quedará disponible para consulta en el http://localhost:4200/
## Unit tests

Este proyecto cuenta con la infraestructura para hacer unit tests con Jest. Los tests se pueden correr con `nx test meli`.

## Licencia
Samanta Martínez - 2021
