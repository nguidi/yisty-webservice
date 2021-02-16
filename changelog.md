# Changelog

> Yisty webservice

## Commit 07c0457 (16-02-2021)

- Modelos
  - users_scans
    - Se agrego el populate con productos
    - Ahora la respuesta viene prefiltrada por el usuario logeado.
  - products
    - se agrego el populate de manufacturer
    - se agrego el populate de category
    - Se agrego un hook que trae el resultado de la preferencia alimenticia solo si el usuario es un cliente. Se toma la preferencia alimenticia del usuario que realiza la petición.
  - products_food_preference
    - Se agrego el modelo
    - Se crearon las relaciones belongsTo con product y food_preference
- Documentación
  - authentication: Se movio el archivo al root.
  - products_food_preference: Se agrego el archivo. Falta documentar.
  - user_scans: Se agrego el archivo. Se documento el metodo.
- Paquetes NPM
  - Agregado feathers-hooks-common como dependencia


