module.exports = {
  description: 'Gestiona los usuarios del sistema',
  operations: {
    find: {
      description: 'Obtiene una lista paginada de usuarios',
      parameters: [
        {
          description: 'Numero de resultados a devolver',
          in: 'query',
          name: '$limit',
          type: 'integer',
          example: 'GET /users?$limit=10'
        },
        {
          description: 'Numero de recursos a omitir',
          in: 'query',
          name: '$skip',
          type: 'integer',
          example: 'GET /users?$skip=10'
        },
        {
          description: 'Orden en el que seran devueltos los recursos (1=Ascendente | -1=Descendente)',
          in: 'query',
          name: '$sort',
          type: 'object',
          example: 'GET /users?$sort[createdAt]=-1'
        },
        {
          description: 'Selecciona los recursos cuyo campo sean diferentes',
          in: 'query',
          name: '$ne',
          type: 'object',
          example: 'GET /users?active[$ne]=true'
        },
        {
          description: 'Selecciona los campos a incluir en la respuestea',
          in: 'query',
          name: '$select',
          type: 'object',
          example: 'GET /users?$select[]=email&$select[]=full_name'
        },
        {
          description: 'Selecciona los recursos cuyo valor se asemeje (Case Sensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$like',
          type: 'object',
          example: 'GET /users?full_name[$like]=Marcos%'
        },
        {
          description: 'Selecciona los recursos cuyo valor no se asemeje (Case Sensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$notLike',
          type: 'object',
          example: 'GET /users?full_name[$notLike]=Marcos%'
        },
        {
          description: 'Selecciona los recursos cuyo valor se asemeje (Case Insensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$iLike',
          type: 'object',
          example: 'GET /users?full_name[$iLike]=Marcos%'
        },
        {
          description: 'Selecciona los recursos cuyo valor no se asemeje (Case Insensitive) [%valor -> Termina con | valor% -> Empieza con | %valor% -> Contiene]',
          in: 'query',
          name: '$notILike',
          type: 'object',
          example: 'GET /users?full_name[$notILike]=Marcos%'
        },
        {
          description: 'Selecciona los recursos que cumplan con alguno de los criterios',
          in: 'query',
          name: '$or',
          type: 'object',
          example: 'GET /users?$or[0][full_name][$like]=Marcos%&$or[1][full_name][$like]=%Marcos'
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
                      '$ref': '#/components/schemas/users'
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
                      'email': 'someone@someone.net',
                      'full_name': 'Some One',
                      'active': false,
                      'createdAt': '2021-02-01T14:49:50.888Z',
                      'updatedAt': '2021-02-01T14:49:50.888Z',
                      'profile': {
                        'id': 1,
                        'name': 'Administrador',
                        'createdAt': '2021-02-01T14:17:29.655Z',
                        'updatedAt': '2021-02-01T14:17:29.655Z'
                      }
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
      description: 'Obtiene un usuario en funcion de su id',
      parameters: [
        {
          description: 'El ID del usuario',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'GET users/1'
        }
      ],
      responses: {
        '200': {
          description: 'success',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                '$ref': '#/components/schemas/users'
              },
              example: {
                'id': 1,
                'email': 'someone@someone.net',
                'full_name': 'Some One',
                'active': false,
                'createdAt': '2021-02-01T14:49:50.888Z',
                'updatedAt': '2021-02-01T14:49:50.888Z',
                'profile': {
                  'id': 1,
                  'name': 'Administrador',
                  'createdAt': '2021-02-01T14:17:29.655Z',
                  'updatedAt': '2021-02-01T14:17:29.655Z'
                },
                'food_preference': {
                  'id': 3,
                  'name': 'Vegetariano',
                  'description': 'Alguien que no come carne',
                  'createdAt': '2021-02-07T23:34:26.075Z',
                  'updatedAt': '2021-02-07T23:34:26.075Z'
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
    create: {
      description: 'Crea un nuevo usuario',
      requestBody: {
        required: true,
        content: {
          'aplication/json': {
            type: 'object',
            schema: {
              '$ref': '#/components/schemas/users'
            },
            example: {
              'email': 'someone@someone.net',
              'full_name': 'Some One',
              'password': 'someone',
              'profileId': 1,
              'foodPreferenceId': 3
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
                '$ref': '#/components/schemas/users'
              },
              example: {
                'id': 1,
                'email': 'someone@someone.net',
                'full_name': 'Some One',
                'active': false,
                'createdAt': '2021-02-01T14:49:50.888Z',
                'updatedAt': '2021-02-01T14:49:50.888Z',
                'profile': {
                  'id': 1,
                  'name': 'Administrador',
                  'createdAt': '2021-02-01T14:17:29.655Z',
                  'updatedAt': '2021-02-01T14:17:29.655Z'
                },
                'food_preference': {
                  'id': 3,
                  'name': 'Vegetariano',
                  'description': 'Alguien que no come carne',
                  'createdAt': '2021-02-07T23:34:26.075Z',
                  'updatedAt': '2021-02-07T23:34:26.075Z'
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
    update: {
      description: 'Actualiza un usuario existente',
      parameters: [
        {
          description: 'El ID del usuario',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'PUT users/1'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'aplication/json': {
            type: 'object',
            schema: {
              '$ref': '#/components/schemas/users'
            },
            example: {
              'email': 'someone@someone.net',
              'full_name': 'Some One',
              'password': 'someone',
              'profileId': 1
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
                '$ref': '#/components/schemas/users'
              },
              example: {
                'id': 1,
                'email': 'someone@someone.net',
                'full_name': 'Some One',
                'active': false,
                'createdAt': '2021-02-01T14:49:50.888Z',
                'updatedAt': '2021-02-01T14:49:50.888Z',
                'profile': {
                  'id': 1,
                  'name': 'Administrador',
                  'createdAt': '2021-02-01T14:17:29.655Z',
                  'updatedAt': '2021-02-01T14:17:29.655Z'
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
    patch: {
      description: 'Actualiza parcialmente un usuario existente',
      parameters: [
        {
          description: 'El ID del usuario',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'PATCH users/1'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'aplication/json': {
            type: 'object',
            schema: {
              '$ref': '#/components/schemas/users'
            },
            example: {
              'email': 'someone@someone.net',
              'full_name': 'Some One',
              'password': 'someone',
              'profileId': 1
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
                '$ref': '#/components/schemas/users'
              },
              example: {
                'id': 1,
                'email': 'someone@someone.net',
                'full_name': 'Some One',
                'active': false,
                'createdAt': '2021-02-01T14:49:50.888Z',
                'updatedAt': '2021-02-01T14:49:50.888Z',
                'profile': {
                  'id': 1,
                  'name': 'Administrador',
                  'createdAt': '2021-02-01T14:17:29.655Z',
                  'updatedAt': '2021-02-01T14:17:29.655Z'
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
    remove: {
      description: 'Elimina un usuario existente',
      parameters: [
        {
          description: 'El ID del usuario',
          in: 'path',
          name: 'id',
          type: 'string',
          required: true,
          example: 'DELETE users/1'
        }
      ],
      responses: {
        '201': {
          description: 'success',
          content: {
            'application/json': {
              type: 'object',
              schema: {
                '$ref': '#/components/schemas/users'
              },
              example: {
                'id': 1,
                'email': 'someone@someone.net',
                'full_name': 'Some One',
                'active': false,
                'createdAt': '2021-02-01T14:49:50.888Z',
                'updatedAt': '2021-02-01T14:49:50.888Z',
                'profileId': 1
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