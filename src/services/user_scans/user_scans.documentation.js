module.exports = {
    description: 'Gestiona las scans del usuario',
    operations: {
        find: {
            description: 'Obtiene una lista paginada de scans del usuario',
            parameters: [
                {
                    description: 'Numero de resultados a devolver',
                    in: 'query',
                    name: '$limit',
                    type: 'integer',
                    example: 'GET /user-scans?$limit=10'
                },
                {
                    description: 'Numero de recursos a omitir',
                    in: 'query',
                    name: '$skip',
                    type: 'integer',
                    example: 'GET /user-scans?$skip=10'
                },
                {
                    description: 'Orden en el que seran devueltos los recursos (1=Ascendente | -1=Descendente)',
                    in: 'query',
                    name: '$sort',
                    type: 'object',
                    example: 'GET /user-scans?$sort[createdAt]=-1'
                },
                {
                    description: 'Selecciona los recursos cuyo campo sean diferentes',
                    in: 'query',
                    name: '$ne',
                    type: 'object',
                    example: 'GET /user-scans?active[$ne]=true'
                },
                {
                    description: 'Selecciona los campos a incluir en la respuestea',
                    in: 'query',
                    name: '$select',
                    type: 'object',
                    example: 'GET /user-scans?$select[]=email&$select[]=full_name'
                },
                {
                    description: 'Selecciona los recursos cuyo valor se asemeje (Case Sensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
                    in: 'query',
                    name: '$like',
                    type: 'object',
                    example: 'GET /user-scans?full_name[$like]=Marcos%'
                },
                {
                    description: 'Selecciona los recursos cuyo valor no se asemeje (Case Sensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
                    in: 'query',
                    name: '$notLike',
                    type: 'object',
                    example: 'GET /user-scans?full_name[$notLike]=Marcos%'
                },
                {
                    description: 'Selecciona los recursos cuyo valor se asemeje (Case Insensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
                    in: 'query',
                    name: '$iLike',
                    type: 'object',
                    example: 'GET /user-scans?full_name[$iLike]=Marcos%'
                },
                {
                    description: 'Selecciona los recursos cuyo valor no se asemeje (Case Insensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
                    in: 'query',
                    name: '$notILike',
                    type: 'object',
                    example: 'GET /user-scans?full_name[$notILike]=Marcos%'
                },
                {
                    description: 'Selecciona los recursos que cumplan con alguno de los criterios',
                    in: 'query',
                    name: '$or',
                    type: 'object',
                    example: 'GET /user-scans?$or[0][full_name][$like]=Marcos%&$or[1][full_name][$like]=%Marcos'
                }
            ],
            responses: {
                '200': {
                    description: 'success',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                type: "object",
                                properties: {
                                    total: {
                                        type: "integer",
                                        description: "Cantidad de recursos"
                                    },
                                    limit: {
                                        type: "integer",
                                        description: "Limite de recursos"
                                    },
                                    skip: {
                                        type: "integer",
                                        description: "Cantidad de recursos omitidos"
                                    },
                                    data: {
                                        type: "array",
                                        description: "Recursos obtenidos",
                                        items: {
                                            "$ref": "#/components/schemas/user-scans"
                                        }
                                    }
                                },
                                example: {
                                    "total": 1,
                                    "limit": 10,
                                    "skip": 0,
                                    "data": [
                                        {
                                            "id": 1,
                                            "product": {
                                                "id": 1,
                                                "name": "Maná Vainilla",
                                                "image": "images/galletita_mana_vainilla.png",
                                                "barcode": "72527273070",
                                                "category": {
                                                    "id": 1,
                                                    "name": "Galletita",
                                                    "createdAt": "2021-02-01T14:49:50.888Z",
                                                    "updatedAt": "2021-02-01T14:49:50.888Z"
                                                },
                                                "manufacturer": {
                                                    "id": 1,
                                                    "name": "Arcor",
                                                    "createdAt": "2021-02-01T14:49:50.888Z",
                                                    "updatedAt": "2021-02-01T14:49:50.888Z"
                                                },
                                                "createdAt": "2021-02-01T14:49:50.888Z",
                                                "updatedAt": "2021-02-01T14:49:50.888Z"
                                            },
                                            "date": "2021-02-01T14:49:50.888Z",
                                            "result": true,
                                            "createdAt": "2021-02-01T14:49:50.888Z",
                                            "updatedAt": "2021-02-01T14:49:50.888Z"
                                        }
                                    ]
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
        get: {
            description: 'Obtiene un scan del usuario en funcion de su ID',
            parameters: [
                {
                    description: 'El ID del scan del usuario',
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    example: 'GET /user-scans/1'
                }
            ],
            responses: {
                '200': {
                    description: 'success',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                "$ref": "#/components/schemas/user-scans"
                            },
                            example: {
                                "id": 1,
                                "product": {
                                    "id": 1,
                                    "name": "Maná Vainilla",
                                    "image": "images/galletita_mana_vainilla.png",
                                    "barcode": "72527273070",
                                    "category": {
                                        "id": 1,
                                        "name": "Galletita",
                                        "createdAt": "2021-02-01T14:49:50.888Z",
                                        "updatedAt": "2021-02-01T14:49:50.888Z"
                                    },
                                    "manufacturer": {
                                        "id": 1,
                                        "name": "Arcor",
                                        "createdAt": "2021-02-01T14:49:50.888Z",
                                        "updatedAt": "2021-02-01T14:49:50.888Z"
                                    },
                                    "createdAt": "2021-02-01T14:49:50.888Z",
                                    "updatedAt": "2021-02-01T14:49:50.888Z"
                                },
                                "date": "2021-02-01T14:49:50.888Z",
                                "result": true,
                                "createdAt": "2021-02-01T14:49:50.888Z",
                                "updatedAt": "2021-02-01T14:49:50.888Z"
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
        create: {
            description: "Crea un nuevo scan del usuario",
            requestBody: {
                required: true,
                content: {
                    'aplication/json': {
                        type: "object",
                        schema: {
                            "$ref": "#/components/schemas/user-scans"
                        },
                        example: {
                            "product": 1,
                            "date": "2021-02-01T14:49:50.888Z",
                            "result": true
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'success',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                "$ref": "#/components/schemas/user-scans"
                            },
                            example: {
                                "id": 1,
                                "product": {
                                    "id": 1,
                                    "name": "Maná Vainilla",
                                    "image": "images/galletita_mana_vainilla.png",
                                    "barcode": "72527273070",
                                    "category": {
                                        "id": 1,
                                        "name": "Galletita",
                                        "createdAt": "2021-02-01T14:49:50.888Z",
                                        "updatedAt": "2021-02-01T14:49:50.888Z"
                                    },
                                    "manufacturer": {
                                        "id": 1,
                                        "name": "Arcor",
                                        "createdAt": "2021-02-01T14:49:50.888Z",
                                        "updatedAt": "2021-02-01T14:49:50.888Z"
                                    },
                                    "createdAt": "2021-02-01T14:49:50.888Z",
                                    "updatedAt": "2021-02-01T14:49:50.888Z"
                                },
                                "date": "2021-02-01T14:49:50.888Z",
                                "result": true,
                                "createdAt": "2021-02-01T14:49:50.888Z",
                                "updatedAt": "2021-02-01T14:49:50.888Z"
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
        update: {
            description: "Actualiza un scan del usuario existente",
            parameters: [
                {
                    description: 'El ID del scan del usuario',
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    example: 'PUT /user-scans/1'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'aplication/json': {
                        type: "object",
                        schema: {
                            "$ref": "#/components/schemas/user-scans"
                        },
                        example: {
                            "product": 1,
                            "date": "2021-02-01T14:49:50.888Z",
                            "result": true
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'success',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                "$ref": "#/components/schemas/user-scans"
                            },
                            example: {
                                "id": 1,
                                "product": {
                                    "id": 1,
                                    "name": "Maná Vainilla",
                                    "image": "images/galletita_mana_vainilla.png",
                                    "barcode": "72527273070",
                                    "category": {
                                        "id": 1,
                                        "name": "Galletita",
                                        "createdAt": "2021-02-01T14:49:50.888Z",
                                        "updatedAt": "2021-02-01T14:49:50.888Z"
                                    },
                                    "manufacturer": {
                                        "id": 1,
                                        "name": "Arcor",
                                        "createdAt": "2021-02-01T14:49:50.888Z",
                                        "updatedAt": "2021-02-01T14:49:50.888Z"
                                    },
                                    "createdAt": "2021-02-01T14:49:50.888Z",
                                    "updatedAt": "2021-02-01T14:49:50.888Z"
                                },
                                "date": "2021-02-01T14:49:50.888Z",
                                "result": true,
                                "createdAt": "2021-02-01T14:49:50.888Z",
                                "updatedAt": "2021-02-01T14:49:50.888Z"
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
        patch: {
            description: "Actualiza parcialmente un scan del usuario existente",
            parameters: [
                {
                    description: 'El ID del scan del usuario',
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    example: 'PATCH /user-scans/1'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'aplication/json': {
                        type: "object",
                        schema: {
                            "$ref": "#/components/schemas/user-scans"
                        },
                        example: {
                            "product": 1,
                            "date": "2021-02-01T14:49:50.888Z",
                            "result": true
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'success',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                "$ref": "#/components/schemas/user-scans"
                            },
                            example: {
                                "id": 1,
                                "product": {
                                    "id": 1,
                                    "name": "Maná Vainilla",
                                    "image": "images/galletita_mana_vainilla.png",
                                    "barcode": "72527273070",
                                    "category": {
                                        "id": 1,
                                        "name": "Galletita",
                                        "createdAt": "2021-02-01T14:49:50.888Z",
                                        "updatedAt": "2021-02-01T14:49:50.888Z"
                                    },
                                    "manufacturer": {
                                        "id": 1,
                                        "name": "Arcor",
                                        "createdAt": "2021-02-01T14:49:50.888Z",
                                        "updatedAt": "2021-02-01T14:49:50.888Z"
                                    },
                                    "createdAt": "2021-02-01T14:49:50.888Z",
                                    "updatedAt": "2021-02-01T14:49:50.888Z"
                                },
                                "date": "2021-02-01T14:49:50.888Z",
                                "result": true,
                                "createdAt": "2021-02-01T14:49:50.888Z",
                                "updatedAt": "2021-02-01T14:49:50.888Z"
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
            description: "Elimina un scan del usuario existente",
            parameters: [
                {
                    description: 'El ID del scan del usuario',
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    example: 'DELETE /user-scans/1'
                }
            ],
            responses: {
                '201': {
                    description: 'success',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                "$ref": "#/components/schemas/user-scans"
                            },
                            example: {
                                "id": 1,
                                "product": {
                                    "id": 1,
                                    "name": "Maná Vainilla",
                                    "image": "images/galletita_mana_vainilla.png",
                                    "barcode": "72527273070",
                                    "category": {
                                        "id": 1,
                                        "name": "Galletita",
                                        "createdAt": "2021-02-01T14:49:50.888Z",
                                        "updatedAt": "2021-02-01T14:49:50.888Z"
                                    },
                                    "manufacturer": {
                                        "id": 1,
                                        "name": "Arcor",
                                        "createdAt": "2021-02-01T14:49:50.888Z",
                                        "updatedAt": "2021-02-01T14:49:50.888Z"
                                    },
                                    "createdAt": "2021-02-01T14:49:50.888Z",
                                    "updatedAt": "2021-02-01T14:49:50.888Z"
                                },
                                "date": "2021-02-01T14:49:50.888Z",
                                "result": true,
                                "createdAt": "2021-02-01T14:49:50.888Z",
                                "updatedAt": "2021-02-01T14:49:50.888Z"
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
        }
    }
}