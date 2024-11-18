## Hito 3 - Desafio Final
======================

## Descripción

En este hito se ha creado el backend de la aplicación.

## Requisitos

* Se debe usar el framework [Express](http://expressjs.com/es/) y [PostgreSQL](https://www.postgresql.org/).
* Se debe usar el lenguaje de programación [JavaScript](https://es.wikipedia.org/wiki/JavaScript).
* Se debe usar [Node.js](https://nodejs.org/es/).
* Se debe usar [NPM](https://www.npmjs.com/) para manejar las dependencias.
* Se debe usar [Git](https://git-scm.com/) como sistema de control de versiones.


## Instalación

1.  Instalar [Node.js](https://nodejs.org/es/download/) (20.1.0 o superior).
2.  Clonar el repositorio.
3.  Entrar al directorio del proyecto.
4.  Instalar las dependencias con `npm install`.
5.  Iniciar el servidor con `npm start`.
6.  Acceder a la aplicación en `http://localhost:3000`.

## Desarrollo

### Comandos

| Comando | Descripción |
| --- | --- |
| `nodejs index.js` | Iniciar el servidor.
| `npm run test` | Ejecutar los test. |


### Estructura del proyecto

```
├── index.js
├── package.json
├── README.md
├── Middlewares
│   ├── authMiddleware.js
│   ├── checkCredenciales.js      
│   
├── Models
│   ├── consultas.js
│   
├── Test
│   ├── server.spec.js
│   
├── node_modules
├── .gitignore
├── package-lock.json


