module.exports = {
  description: 'Gestiona las categorias',
  operations: {
    find: {
      description: 'Obtiene una lista paginada de categorias',
      parameters: [
        {
          description: 'Numero de resultados a devolver',
          in: 'query',
          name: '$limit',
          type: 'integer',
          example: 'GET /categories?$limit=10'
        },
        {
          description: 'Numero de recursos a omitir',
          in: 'query',
          name: '$skip',
          type: 'integer',
          example: 'GET /categories?$skip=10'
        },
        {
          description: 'Orden en el que seran devueltos los recursos (1=Ascendente | -1=Descendente)',
          in: 'query',
          name: '$sort',
          type: 'object',
          example: 'GET /categories?$sort[createdAt]=-1'
        },
        {
          description: 'Selecciona los recursos cuyo campo sean diferentes',
          in: 'query',
          name: '$ne',
          type: 'object',
          example: 'GET /categories?active[$ne]=true'
        },
        {
          description: 'Selecciona los campos a incluir en la respuestea',
          in: 'query',
          name: '$select',
          type: 'object',
          example: 'GET /categories?$select[]=email&$select[]=full_name'
        },
        {
          description: 'Selecciona los recursos cuyo valor se asemeje (Case Sensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$like',
          type: 'object',
          example: 'GET /categories?full_name[$like]=Marcos%'
        },
        {
          description: 'Selecciona los recursos cuyo valor no se asemeje (Case Sensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$notLike',
          type: 'object',
          example: 'GET /categories?full_name[$notLike]=Marcos%'
        },
        {
          description: 'Selecciona los recursos cuyo valor se asemeje (Case Insensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$iLike',
          type: 'object',
          example: 'GET /categories?full_name[$iLike]=Marcos%'
        },
        {
          description: 'Selecciona los recursos cuyo valor no se asemeje (Case Insensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$notILike',
          type: 'object',
          example: 'GET /categories?full_name[$notILike]=Marcos%'
        },
        {
          description: 'Selecciona los recursos que cumplan con alguno de los criterios',
          in: 'query',
          name: '$or',
          type: 'object',
          example: 'GET /categories?$or[0][full_name][$like]=Marcos%&$or[1][full_name][$like]=%Marcos'
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
                      '$ref': '#/components/schemas/categories'
                    }
                  }
                },
                example: {
                  'total': 1,
                  'limit': 10,
                  'skip': 0,
                  'data': [
                    {
                      'id': 1,
                      'name': 'Galletitas',
                      'createdAt': '2021-02-01T14:49:50.888Z',
                      'updatedAt': '2021-02-01T14:49:50.888Z'
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
      description: 'Obtiene una categoria en funcion de su ID',
      parameters: [
        {
          description: 'El ID de la categoria',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'GET /categories/1'
        }
      ],
      responses: {
        '200': {
          description: 'success',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                '$ref': '#/components/schemas/categories'
              },
              example: {
                'id': 1,
                'name': 'Galletitas',
                'createdAt': '2021-02-01T14:49:50.888Z',
                'updatedAt': '2021-02-01T14:49:50.888Z'
              }
            }
          }
        },
        '401': {
          description: 'Usuario no autentificado',
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
      description: 'Crea una nueva categoria',
      requestBody: {
        required: true,
        content: {
          'aplication/json': {
            type: 'object',
            schema: {
              '$ref': '#/components/schemas/categories'
            },
            example: {
              'name': 'Galletitas'
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
                '$ref': '#/components/schemas/categories'
              },
              example: {
                'id': 1,
                'name': 'Galletitas',
                'createdAt': '2021-02-01T14:49:50.888Z',
                'updatedAt': '2021-02-01T14:49:50.888Z'
              }
            }
          }
        },
        '401': {
          description: 'Usuario no autentificado',
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
      description: 'Actualiza una categoria existente',
      parameters: [
        {
          description: 'El ID de la categoria',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'PUT /categories/1'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'aplication/json': {
            type: 'object',
            schema: {
              '$ref': '#/components/schemas/categories'
            },
            example: {
              'name': 'Galletitas'
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
                '$ref': '#/components/schemas/categories'
              },
              example: {
                'id': 1,
                'name': 'Galletitas',
                'createdAt': '2021-02-01T14:49:50.888Z',
                'updatedAt': '2021-02-01T14:49:50.888Z'
              }
            }
          }
        },
        '401': {
          description: 'Usuario no autentificado',
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
      description: 'Actualiza parcialmente una categoria existente',
      parameters: [
        {
          description: 'El ID de la categoria',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'PATCH /categories/1'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'aplication/json': {
            type: 'object',
            schema: {
              '$ref': '#/components/schemas/categories'
            },
            example: {
              'name': 'Galletitas'
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
                '$ref': '#/components/schemas/categories'
              },
              example: {
                'id': 1,
                'name': 'Galletitas',
                'createdAt': '2021-02-01T14:49:50.888Z',
                'updatedAt': '2021-02-01T14:49:50.888Z'
              }
            }
          }
        },
        '401': {
          description: 'Usuario no autentificado',
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
      description: 'Elimina una categoria existente',
      parameters: [
        {
          description: 'El ID de la categoria',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'DELETE /categories/1'
        }
      ],
      responses: {
        '201': {
          description: 'success',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                '$ref': '#/components/schemas/categories'
              },
              example: {
                'id': 1,
                'name': 'Galletitas',
                'createdAt': '2021-02-01T14:49:50.888Z',
                'updatedAt': '2021-02-01T14:49:50.888Z'
              }
            }
          }
        },
        '401': {
          description: 'Usuario no autentificado',
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