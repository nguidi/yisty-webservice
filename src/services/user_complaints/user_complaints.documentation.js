module.exports = {
    description: 'Gestiona los reclamos del usuario',
    operations: {
        find: {
            description: 'Obtiene una lista paginada de reclamos del usuario',
            parameters: [
                {
                    description: 'Numero de resultados a devolver',
                    in: 'query',
                    name: '$limit',
                    type: 'integer',
                    example: 'GET /user-complaints?$limit=10'
                },
                {
                    description: 'Numero de recursos a omitir',
                    in: 'query',
                    name: '$skip',
                    type: 'integer',
                    example: 'GET /user-complaints?$skip=10'
                },
                {
                    description: 'Orden en el que seran devueltos los recursos (1=Ascendente | -1=Descendente)',
                    in: 'query',
                    name: '$sort',
                    type: 'object',
                    example: 'GET /user-complaints?$sort[createdAt]=-1'
                },
                {
                    description: 'Selecciona los recursos cuyo campo sean diferentes',
                    in: 'query',
                    name: '$ne',
                    type: 'object',
                    example: 'GET /user-complaints?active[$ne]=true'
                },
                {
                    description: 'Selecciona los campos a incluir en la respuestea',
                    in: 'query',
                    name: '$select',
                    type: 'object',
                    example: 'GET /user-complaints?$select[]=email&$select[]=full_name'
                },
                {
                    description: 'Selecciona los recursos cuyo valor se asemeje (Case Sensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
                    in: 'query',
                    name: '$like',
                    type: 'object',
                    example: 'GET /user-complaints?full_name[$like]=Marcos%'
                },
                {
                    description: 'Selecciona los recursos cuyo valor no se asemeje (Case Sensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
                    in: 'query',
                    name: '$notLike',
                    type: 'object',
                    example: 'GET /user-complaints?full_name[$notLike]=Marcos%'
                },
                {
                    description: 'Selecciona los recursos cuyo valor se asemeje (Case Insensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
                    in: 'query',
                    name: '$iLike',
                    type: 'object',
                    example: 'GET /user-complaints?full_name[$iLike]=Marcos%'
                },
                {
                    description: 'Selecciona los recursos cuyo valor no se asemeje (Case Insensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
                    in: 'query',
                    name: '$notILike',
                    type: 'object',
                    example: 'GET /user-complaints?full_name[$notILike]=Marcos%'
                },
                {
                    description: 'Selecciona los recursos que cumplan con alguno de los criterios',
                    in: 'query',
                    name: '$or',
                    type: 'object',
                    example: 'GET /user-complaints?$or[0][full_name][$like]=Marcos%&$or[1][full_name][$like]=%Marcos'
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
                                            "$ref": "#/components/schemas/user-complaints"
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
                                            "date": "2021-02-01T14:49:50.888Z",
                                            "description": "El producto no es VEGANO",
                                            "active": true,
                                            "userId": 1,
                                            "productId": 1,
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
            description: 'Obtiene un reclamo en funcion de su ID',
            parameters: [
                {
                    description: 'El ID del reclamo',
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    example: 'GET /user-complaints/1'
                }
            ],
            responses: {
                '200': {
                    description: 'success',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                "$ref": "#/components/schemas/user-complaints"
                            },
                            example: {
                                "id": 1,
                                "date": "2021-02-01T14:49:50.888Z",
                                "description": "El producto no es VEGANO",
                                "active": true,
                                "userId": 1,
                                "productId": 1,
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
            description: "Crea un nuevo reclamo",
            requestBody: {
                required: true,
                content: {
                    'aplication/json': {
                        type: "object",
                        schema: {
                            "$ref": "#/components/schemas/user-complaints"
                        },
                        example: {
                            "date": "2021-02-01T14:49:50.888Z",
                            "description": "El producto no es VEGANO",
                            "active": true,
                            "userId": 1,
                            "productId": 1,
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
                                "$ref": "#/components/schemas/user-complaints"
                            },
                            example: {
                                "id": 1,
                                "date": "2021-02-01T14:49:50.888Z",
                                "description": "El producto no es VEGANO",
                                "active": true,
                                "userId": 1,
                                "productId": 1,
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
            description: "Actualiza un reclamo existente",
            parameters: [
                {
                    description: 'El ID del reclamo',
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    example: 'PUT /user-complaints/1'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'aplication/json': {
                        type: "object",
                        schema: {
                            "$ref": "#/components/schemas/user-complaints"
                        },
                        example: {
                            "date": "2021-02-01T14:49:50.888Z",
                            "description": "El producto no es VEGANO",
                            "active": true,
                            "userId": 1,
                            "productId": 1,
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
                                "$ref": "#/components/schemas/user-complaints"
                            },
                            example: {
                                "id": 1,
                                "date": "2021-02-01T14:49:50.888Z",
                                "description": "El producto no es VEGANO",
                                "active": true,
                                "userId": 1,
                                "productId": 1,
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
            description: "Actualiza parcialmente un reclamo existente",
            parameters: [
                {
                    description: 'El ID del reclamo',
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    example: 'PATCH /user-complaints/1'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'aplication/json': {
                        type: "object",
                        schema: {
                            "$ref": "#/components/schemas/user-complaints"
                        },
                        example: {
                            "date": "2021-02-01T14:49:50.888Z",
                            "description": "El producto no es VEGANO",
                            "active": true,
                            "userId": 1,
                            "productId": 1,
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
                                "$ref": "#/components/schemas/user-complaints"
                            },
                            example: {
                                "id": 1,
                                "date": "2021-02-01T14:49:50.888Z",
                                "description": "El producto no es VEGANO",
                                "active": true,
                                "userId": 1,
                                "productId": 1,
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
            description: "Elimina un reclamo existente",
            parameters: [
                {
                    description: 'El ID del reclamo',
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    example: 'DELETE /user-complaints/1'
                }
            ],
            responses: {
                '201': {
                    description: 'success',
                    content: {
                        'application/json': {
                            type: "object",
                            schema: {
                                "$ref": "#/components/schemas/user-complaints"
                            },
                            example: {
                                "id": 1,
                                "date": "2021-02-01T14:49:50.888Z",
                                "description": "El producto no es VEGANO",
                                "active": true,
                                "userId": 1,
                                "productId": 1,
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