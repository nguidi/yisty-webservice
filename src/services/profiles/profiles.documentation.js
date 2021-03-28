module.exports = {
  description: 'Gestiona los perfiles de usuarios del sistema',
  operations: {
    find: {
      description: 'Obtiene una lista paginada de perfiles',
      parameters: [
        {
          description: 'Numero de resultados a devolver',
          in: 'query',
          name: '$limit',
          type: 'integer',
          example: 'GET /profiles?$limit=10'
        },
        {
          description: 'Numero de recursos a omitir',
          in: 'query',
          name: '$skip',
          type: 'integer',
          example: 'GET /profiles?$skip=10'
        },
        {
          description: 'Orden en el que seran devueltos los recursos (1=Ascendente | -1=Descendente)',
          in: 'query',
          name: '$sort',
          type: 'object',
          example: 'GET /profiles?$sort[createdAt]=-1'
        },
        {
          description: 'Selecciona los recursos cuyo campo sean diferentes',
          in: 'query',
          name: '$ne',
          type: 'object',
          example: 'GET /profiles?name[$ne]=Administrador'
        },
        {
          description: 'Selecciona los campos a incluir en la respuestea',
          in: 'query',
          name: '$select',
          type: 'object',
          example: 'GET /profiles?$select[]=name'
        },
        {
          description: 'Selecciona los recursos cuyo valor se asemeje (Case Sensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$like',
          type: 'object',
          example: 'GET /profiles?name[$like]=Admin%'
        },
        {
          description: 'Selecciona los recursos cuyo valor no se asemeje (Case Sensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$notLike',
          type: 'object',
          example: 'GET /profiles?name[$notLike]=Admin%'
        },
        {
          description: 'Selecciona los recursos cuyo valor se asemeje (Case Insensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$iLike',
          type: 'object',
          example: 'GET /profiles?name[$iLike]=Admin%'
        },
        {
          description: 'Selecciona los recursos cuyo valor no se asemeje (Case Insensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$notILike',
          type: 'object',
          example: 'GET /profiles?name[$notILike]=Admin%'
        },
        {
          description: 'Selecciona los recursos que cumplan con alguno de los criterios',
          in: 'query',
          name: '$or',
          type: 'object',
          example: 'GET /profiles?$or[0][name][$like]=Admin%&$or[1][name][$like]=%Admin'
        }
      ],
      responses: {
        '200': {
          description: 'success',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                type: 'object',
                properties: {
                  total: {
                    type: 'integer',
                    description: 'Cantidad de recursos'
                  },
                  limit: {
                    type: 'integer',
                    description: 'Limite de recursos'
                  },
                  skip: {
                    type: 'integer',
                    description: 'Cantidad de recursos omitidos'
                  },
                  data: {
                    type: 'array',
                    description: 'Recursos obtenidos',
                    items: {
                      '$ref': '#/components/schemas/profiles'
                    }
                  }
                },
                example: {
                  'total': 3,
                  'limit': 10,
                  'skip': 0,
                  'data': [
                    {
                      'id': 1,
                      'name': 'Administrador',
                      'createdAt': '2021-02-01T14:17:29.655Z',
                      'updatedAt': '2021-02-01T14:17:29.655Z'
                    },
                    {
                      'id': 2,
                      'name': 'Cliente',
                      'createdAt': '2021-02-01T14:17:29.655Z',
                      'updatedAt': '2021-02-01T14:17:29.655Z'
                    },
                    {
                      'id': 3,
                      'name': 'Afiliado',
                      'createdAt': '2021-02-01T14:17:29.655Z',
                      'updatedAt': '2021-02-01T14:17:29.655Z'
                    }
                  ]
                }
              }
            }
          }
        },
        '401': {
          description: 'perfil no autentificado',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Estado de la peticion'
                  },
                  message: {
                    type: 'string',
                    description: 'Mensaje de error'
                  },
                  code: {
                    type: 'number',
                    description: 'Codigo de error'
                  },
                  className: {
                    type: 'string',
                    description: 'Tipo de error'
                  }
                }
              },
              example: {
                'name': 'NotAuthenticated',
                'message': 'Invalid login',
                'code': 401,
                'className': 'not-authenticated',
                'errors': {}
              }
            }
          }
        }
      }
    },
    get: {
      description: 'Obtiene un perfil en funcion de su id',
      parameters: [
        {
          description: 'El ID del perfil',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'GET profiles/1'
        }
      ],
      responses: {
        '200': {
          description: 'success',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                '$ref': '#/components/schemas/profiles'
              },
              example: {
                'id': 1,
                'name': 'Administrador',
                'createdAt': '2021-02-01T14:17:29.655Z',
                'updatedAt': '2021-02-01T14:17:29.655Z'
              }
            }
          }
        },
        '401': {
          description: 'perfil no autentificado',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Estado de la peticion'
                  },
                  message: {
                    type: 'string',
                    description: 'Mensaje de error'
                  },
                  code: {
                    type: 'number',
                    description: 'Codigo de error'
                  },
                  className: {
                    type: 'string',
                    description: 'Tipo de error'
                  }
                }
              },
              example: {
                'name': 'NotAuthenticated',
                'message': 'Invalid login',
                'code': 401,
                'className': 'not-authenticated',
                'errors': {}
              }
            }
          }
        }
      }
    },
    create: {
      description: 'Crea un nuevo perfil',
      requestBody: {
        required: true,
        content: {
          'aplication/json': {
            type: 'object',
            schema: {
              '$ref': '#/components/schemas/profiles'
            },
            example: {
              'name': 'Administrador',
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'success',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                '$ref': '#/components/schemas/profiles'
              },
              example: {
                'id': 1,
                'name': 'Administrador',
                'createdAt': '2021-02-01T14:17:29.655Z',
                'updatedAt': '2021-02-01T14:17:29.655Z'
              }
            }
          }
        },
        '401': {
          description: 'perfil no autentificado',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Estado de la peticion'
                  },
                  message: {
                    type: 'string',
                    description: 'Mensaje de error'
                  },
                  code: {
                    type: 'number',
                    description: 'Codigo de error'
                  },
                  className: {
                    type: 'string',
                    description: 'Tipo de error'
                  }
                }
              },
              example: {
                'name': 'NotAuthenticated',
                'message': 'Invalid login',
                'code': 401,
                'className': 'not-authenticated',
                'errors': {}
              }
            }
          }
        }
      }
    },
    update: {
      description: 'Actualiza un perfil existente',
      parameters: [
        {
          description: 'El ID del perfil',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'PUT profiles/1'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'aplication/json': {
            type: 'object',
            schema: {
              '$ref': '#/components/schemas/profiles'
            },
            example: {
              'name': 'Administrador',
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'success',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                '$ref': '#/components/schemas/profiles'
              },
              example: {
                'id': 1,
                'name': 'Administrador',
                'createdAt': '2021-02-01T14:17:29.655Z',
                'updatedAt': '2021-02-01T14:17:29.655Z'
              }
            }
          }
        },
        '401': {
          description: 'perfil no autentificado',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Estado de la peticion'
                  },
                  message: {
                    type: 'string',
                    description: 'Mensaje de error'
                  },
                  code: {
                    type: 'number',
                    description: 'Codigo de error'
                  },
                  className: {
                    type: 'string',
                    description: 'Tipo de error'
                  }
                }
              },
              example: {
                'name': 'NotAuthenticated',
                'message': 'Invalid login',
                'code': 401,
                'className': 'not-authenticated',
                'errors': {}
              }
            }
          }
        }
      }
    },
    patch: {
      description: 'Actualiza parcialmente un perfil existente',
      parameters: [
        {
          description: 'El ID del perfil',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'PATCH profiles/1'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'aplication/json': {
            type: 'object',
            schema: {
              '$ref': '#/components/schemas/profiles'
            },
            example: {
              'name': 'Administrador'
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'success',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                '$ref': '#/components/schemas/profiles'
              },
              example: {
                'id': 1,
                'name': 'Administrador',
                'createdAt': '2021-02-01T14:17:29.655Z',
                'updatedAt': '2021-02-01T14:17:29.655Z'
              }
            }
          }
        },
        '401': {
          description: 'perfil no autentificado',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Estado de la peticion'
                  },
                  message: {
                    type: 'string',
                    description: 'Mensaje de error'
                  },
                  code: {
                    type: 'number',
                    description: 'Codigo de error'
                  },
                  className: {
                    type: 'string',
                    description: 'Tipo de error'
                  }
                }
              },
              example: {
                'name': 'NotAuthenticated',
                'message': 'Invalid login',
                'code': 401,
                'className': 'not-authenticated',
                'errors': {}
              }
            }
          }
        }
      }
    },
    remove: {
      description: 'Elimina un perfil existente',
      parameters: [
        {
          description: 'El ID del perfil',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'DELETE profiles/1'
        }
      ],
      responses: {
        '201': {
          description: 'success',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                '$ref': '#/components/schemas/profiles'
              },
              example: {
                'id': 1,
                'name': 'Administrador',
                'createdAt': '2021-02-01T14:17:29.655Z',
                'updatedAt': '2021-02-01T14:17:29.655Z'
              }
            }
          }
        },
        '401': {
          description: 'perfil no autentificado',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Estado de la peticion'
                  },
                  message: {
                    type: 'string',
                    description: 'Mensaje de error'
                  },
                  code: {
                    type: 'number',
                    description: 'Codigo de error'
                  },
                  className: {
                    type: 'string',
                    description: 'Tipo de error'
                  }
                }
              },
              example: {
                'name': 'NotAuthenticated',
                'message': 'Invalid login',
                'code': 401,
                'className': 'not-authenticated',
                'errors': {}
              }
            }
          }
        }
      }
    }
  }
};