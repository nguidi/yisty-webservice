# yisty-webservice

> Yisty webservice

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/yisty-webservice
    npm install
    ```
3. Setup app

    ```
    npm run setup
    ```
4. Test the app

    ```
    npm run test
    ```
5. Start your app

    ```
    npm start
    ```


## Docker setup

You can also run the application and the database within docker containers using
Docker Compose.
To do that you need to first build the application image:

```bash
docker build . -t yisty_webservice:latest
```

After that we can start the whole system:

```bash
docker-compose up
```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## TODO: Documentar bien estos metodos. 

Crear los metodos restantes.

```
Login 	 -> POST 	/authentication
Logout 	 -> DELETE	/authentication/id
Register -> POST	/users
Editar Perfil -> PUT	/users/id

Preferencias Alimenticias -> GET /food_preferences

Busqueda Alimentos -> GET /products?food_preference=1
Escaneo
	BARCODE  -> GET /products?barcode=123456789
	IMG_INGREDIENTES -> POST /scan
	NUEVO_PRODUCTO	POST /pending_products
Publicidad Producto -> GET /affiliate_shops?products=1
	
Historial Producto -> GET /user_scans?user_id=1
```
