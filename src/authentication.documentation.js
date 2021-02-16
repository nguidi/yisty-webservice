module.exports = {
    description: 'Gestiona la autentificacion frente al Webservice',
    definitions: {
        authentication: {
            type: "object",
            required: [ "email", "password", "strategy" ],
            properties: {
                email: {
                    type: "string",
                    description: "El email del usuario a logear"
                },
                password:  {
                    type: "string",
                    description: "La contraseña del usuario a logear"
                },
                strategy:  {
                    type: "string",
                    description: "El tipo de autentificacion debe ser 'local'"
                }
            },
            example: {
                email: "alguien@servicio.com",
                password: "algosecreto",
                strategy: "local"
            }
        }
    },
    operations: {
        create: {
            description: "Autentifica el usuario y devuelve el token de seguridad",
            responses: {
                '200': {
                    description: 'Usuario atutentificado correctamente',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                type: "object",
                                properties: {
                                    accessToken: {
                                        type: "string",
                                        description: "El token JWT de acceso"
                                    },
                                    authentication:  {
                                        type: "object",
                                        description: "El tipo de autentificación y su descripción",
                                        schema: {
                                            type: "object",
                                            properties: {
                                                strategy: {
                                                    type: "string",
                                                    description: "El tipo de autentificacion debe ser 'local'"
                                                },
                                                accessToken: {
                                                    type: "string",
                                                    description: "El token JWT de acceso"
                                                },
                                                payload: {
                                                    type: "object",
                                                    description: "El Payload de la autentificacion",
                                                    schema: {
                                                        type: "object",
                                                        properties: {
                                                            iat: {
                                                                type: "number",
                                                                description: "Fecha de creacion del token"
                                                            },
                                                            exp: {
                                                                type: "number",
                                                                description: "Fecha de expiracion del token"
                                                            },
                                                            aud: {
                                                                type: "string",
                                                                description: "Auditor del token"
                                                            },
                                                            iss: {
                                                                type: "string",
                                                                description: "Tipo de servicio"
                                                            },
                                                            sub: {
                                                                type: "string",
                                                                description: "Motivo de creacion del JWT"
                                                            },
                                                            jti: {
                                                                type: "string",
                                                                description: "Clave publica del token"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    user:  {
                                        type: "object",
                                        description: "El usuario autentificado",
                                        schema: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "number",
                                                    description: "ID del usuario en la DB"
                                                },
                                                email: {
                                                    type: "string",
                                                    description: "Email del usuario autentificado"
                                                },
                                                full_name: {
                                                    type: "string",
                                                    description: "Nombre completo del usuario"
                                                },
                                                active: {
                                                    type: "boolean",
                                                    description: "Estado del usuario"
                                                },
                                                created_at: {
                                                    type: "string",
                                                    description: "Fecha de creacion del usuario"
                                                },
                                                updated_at: {
                                                    type: "string",
                                                    description: "Fecha en la que se modifico el usuario por ultima vez"
                                                },
                                                profileId: {
                                                    type: "string",
                                                    description: "Id del usuario"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            example: {
                                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MTE1Mjg3NzQsImV4cCI6MTYxMTYxNTE3NCwiYXVkIjoiaHR0cHM6Ly95aXN0eS5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6IjEiLCJqdGkiOiI4MWRlMDM5OC1iMTExLTQyYjEtYWU5Ny1hNjc1YWZkMmJkZWIifQ.f2XPVbKABXFuNjlB4IYH91GsLpbggN1z8Xg-dhDzAr8",
                                "authentication": {
                                    "strategy": "local",
                                    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MTE1Mjg3NzQsImV4cCI6MTYxMTYxNTE3NCwiYXVkIjoiaHR0cHM6Ly95aXN0eS5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6IjEiLCJqdGkiOiI4MWRlMDM5OC1iMTExLTQyYjEtYWU5Ny1hNjc1YWZkMmJkZWIifQ.f2XPVbKABXFuNjlB4IYH91GsLpbggN1z8Xg-dhDzAr8",
                                    "payload": {
                                        "iat": 1611528774,
                                        "exp": 1611615174,
                                        "aud": "https://yisty.com",
                                        "iss": "feathers",
                                        "sub": "1",
                                        "jti": "81de0398-b111-42b1-ae97-a675afd2bdeb"
                                    }
                                },
                                "user": {
                                    "id": 1,
                                    "email": "test@test.com",
                                    "full_name": "Test user",
                                    "active": false,
                                    "createdAt": "2021-01-19T23:46:44.297Z",
                                    "updatedAt": "2021-01-19T23:46:44.297Z",
                                    "profileId": null
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Usuario no autentificado',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "Estado de la peticion"
                                    },
                                    message: {
                                        type: "string",
                                        description: "Mensaje de error"
                                    },
                                    code: {
                                        type: "number",
                                        description: "Codigo de error"
                                    },
                                    className: {
                                        type: "string",
                                        description: "Tipo de error"
                                    }
                                }
                            },
                            example: {
                                "name": "NotAuthenticated",
                                "message": "Invalid login",
                                "code": 401,
                                "className": "not-authenticated",
                                "errors": {}
                            }
                        }
                    }
                }
            }
        },
        remove: {
            description: "Elimina la autentificacion y el token asociado al usuario",
            parameters: [
                {
                    description: 'El JWT a dar de baja',
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MTE1Mjg3NzQsImV4cCI6MTYxMTYxNTE3NCwiYXVkIjoiaHR0cHM6Ly95aXN0eS5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6IjEiLCJqdGkiOiI4MWRlMDM5OC1iMTExLTQyYjEtYWU5Ny1hNjc1YWZkMmJkZWIifQ.f2XPVbKABXFuNjlB4IYH91GsLpbggN1z8Xg-dhDzAr8"
                }
            ],
            responses: {
                '200': {
                    description: 'Token eliminado correctamente',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                type: "object",
                                properties: {
                                    accessToken: {
                                        type: "string",
                                        description: "El token JWT de acceso"
                                    },
                                    authentication:  {
                                        type: "object",
                                        description: "El tipo de autentificación y su descripción",
                                        schema: {
                                            type: "object",
                                            properties: {
                                                strategy: {
                                                    type: "string",
                                                    description: "El tipo de autentificacion debe ser 'local'"
                                                },
                                                accessToken: {
                                                    type: "string",
                                                    description: "El token JWT de acceso"
                                                },
                                                payload: {
                                                    type: "object",
                                                    description: "El Payload de la autentificacion",
                                                    schema: {
                                                        type: "object",
                                                        properties: {
                                                            iat: {
                                                                type: "number",
                                                                description: "Fecha de creacion del token"
                                                            },
                                                            exp: {
                                                                type: "number",
                                                                description: "Fecha de expiracion del token"
                                                            },
                                                            aud: {
                                                                type: "string",
                                                                description: "Auditor del token"
                                                            },
                                                            iss: {
                                                                type: "string",
                                                                description: "Tipo de servicio"
                                                            },
                                                            sub: {
                                                                type: "string",
                                                                description: "Motivo de creacion del JWT"
                                                            },
                                                            jti: {
                                                                type: "string",
                                                                description: "Clave publica del token"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    user:  {
                                        type: "object",
                                        description: "El usuario autentificado",
                                        schema: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "number",
                                                    description: "ID del usuario en la DB"
                                                },
                                                email: {
                                                    type: "string",
                                                    description: "Email del usuario autentificado"
                                                },
                                                full_name: {
                                                    type: "string",
                                                    description: "Nombre completo del usuario"
                                                },
                                                active: {
                                                    type: "boolean",
                                                    description: "Estado del usuario"
                                                },
                                                created_at: {
                                                    type: "string",
                                                    description: "Fecha de creacion del usuario"
                                                },
                                                updated_at: {
                                                    type: "string",
                                                    description: "Fecha en la que se modifico el usuario por ultima vez"
                                                },
                                                profileId: {
                                                    type: "string",
                                                    description: "Id del usuario"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            example: {
                                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MTE1Mjg3NzQsImV4cCI6MTYxMTYxNTE3NCwiYXVkIjoiaHR0cHM6Ly95aXN0eS5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6IjEiLCJqdGkiOiI4MWRlMDM5OC1iMTExLTQyYjEtYWU5Ny1hNjc1YWZkMmJkZWIifQ.f2XPVbKABXFuNjlB4IYH91GsLpbggN1z8Xg-dhDzAr8",
                                "authentication": {
                                    "strategy": "local",
                                    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MTE1Mjg3NzQsImV4cCI6MTYxMTYxNTE3NCwiYXVkIjoiaHR0cHM6Ly95aXN0eS5jb20iLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6IjEiLCJqdGkiOiI4MWRlMDM5OC1iMTExLTQyYjEtYWU5Ny1hNjc1YWZkMmJkZWIifQ.f2XPVbKABXFuNjlB4IYH91GsLpbggN1z8Xg-dhDzAr8",
                                    "payload": {
                                        "iat": 1611528774,
                                        "exp": 1611615174,
                                        "aud": "https://yisty.com",
                                        "iss": "feathers",
                                        "sub": "1",
                                        "jti": "81de0398-b111-42b1-ae97-a675afd2bdeb"
                                    }
                                },
                                "user": {
                                    "id": 1,
                                    "email": "test@test.com",
                                    "full_name": "Test user",
                                    "active": false,
                                    "createdAt": "2021-01-19T23:46:44.297Z",
                                    "updatedAt": "2021-01-19T23:46:44.297Z",
                                    "profile": {
                                        "id": 2,
                                        "name": "Cliente",
                                        "createdAt": "2021-02-07T23:26:49.706Z",
                                        "updatedAt": "2021-02-07T23:26:49.706Z"
                                    },
                                    "food_preference": {
                                        "id": 3,
                                        "name": "Vegetariano",
                                        "description": "Alguien que no come carne",
                                        "createdAt": "2021-02-07T23:34:26.075Z",
                                        "updatedAt": "2021-02-07T23:34:26.075Z"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}