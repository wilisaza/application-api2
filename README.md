# Servicio de aplicaciones Synchrox

Servicio para administrar aplicaciones en la plataforma Synchrox

## Preparación inicial

- Url de acceso al servicio
- Url de base de datos Postgres (Variable de entorno DATABASE_URL)
- Puerto de conexión (Variable de entorno PORT)

## Métodos

### Sección Aplicaciones

**GET**

Mediante GET se realizan las siguientes acciones:

- Consultar aplicaciones por proveedor:
  - Endpoint: [miurl:miPuerto/application/provider/:idCompanyProveedor]()
  - Retorno: array de objetos de aplicación

```json
{
  "success": true,
  "data": [
    {
      "id": "0a92294c-22b8-4c80-9d56-eeacb85ad***",
      "shortName": "CPARTNER",
      "fullName": "Consola del Partner",
      "urlLogo": null,
      "urlMain": null,
      "idCompany": "0c0dfa54-4b5e-4ae2-9215-22efca50c***"
    },
    {
      "id": "75e73b17-8048-4f30-ba27-7154312b4***",
      "shortName": "APPCON",
      "fullName": "Constructor de aplicaciones",
      "urlLogo": null,
      "urlMain": null,
      "idCompany": "0c0dfa54-4b5e-4ae2-9215-22efca50***"
    },
    {
      "id": "e328edf2-13ba-4fd7-93e5-8927b5263***",
      "shortName": "ADMPLATFORM",
      "fullName": "Administrador de Plataforma SYNCHROX",
      "urlLogo": null,
      "urlMain": null,
      "idCompany": "0c0dfa54-4b5e-4ae2-9215-22efca50c***"
    }
  ]
}
```

- Consultar aplicaciones por cliente:
  - Endpoint: [miurl:miPuerto/application/client/:idCompanyClient]()
  - Retorno: array de objetos de aplicación

```json
{
  "success": true,
  "data": [
    {
      "id": "97447779-4e1c-45a1-ad0b-f0925a72e***",
      "shortName": "SIIFWEB",
      "fullName": "Sistema Integrado de Información Financiera",
      "urlLogo": null,
      "urlMain": null,
      "idCompany": "83a6b75a-a911-4c69-960d-240975fda***"
    },
    {
      "id": "657ee03a-8eed-4c26-9086-114657212***",
      "shortName": "SUCITA",
      "fullName": "Sistema Unico de Citas y Turnos de Atención",
      "urlLogo": null,
      "urlMain": null,
      "idCompany": "f24effa4-c252-4c23-af42-1736c634c***"
    }
  ]
}
```

- Consultar aplicaciones por usuario:
  - Endpoint: [miurl:miPuerto/application/user/:idUser]()
  - Retorno: array de objetos de aplicación

```json
{
  "success": true,
  "data": [
    {
      "idCompany": "22568d2a-d63b-4b8e-9691-7c35fbb38***",
      "idApplication": "657ee03a-8eed-4c26-9086-114657212***",
      "description": "Aeromate - Sucita",
      "PlatApplication": {
        "shortName": "SUCITA",
        "fullName": "Sistema Unico de Citas y Turnos de Atención",
        "urlLogo": null,
        "urlMain": null,
        "idCompany": "f24effa4-c252-4c23-af42-1736c634c***"
      },
      "companyName": "Aeropuerto Internacional Matecaña"
    },
    {
      "idCompany": "2c5f8161-602f-472b-ab4f-b6e0854ff***",
      "idApplication": "657ee03a-8eed-4c26-9086-114657212***",
      "description": "Pereira - Sucita",
      "PlatApplication": {
        "shortName": "SUCITA",
        "fullName": "Sistema Unico de Citas y Turnos de Atención",
        "urlLogo": null,
        "urlMain": null,
        "idCompany": "f24effa4-c252-4c23-af42-1736c634c***"
      },
      "companyName": "Municipio de Pereira"
    },
    {
      "idCompany": "2c5f8161-602f-472b-ab4f-b6e0854ff***",
      "idApplication": "97447779-4e1c-45a1-ad0b-f0925a72e***",
      "description": "Pereira - Siifweb",
      "PlatApplication": {
        "shortName": "SIIFWEB",
        "fullName": "Sistema Integrado de Información Financiera",
        "urlLogo": null,
        "urlMain": null,
        "idCompany": "83a6b75a-a911-4c69-960d-240975fda***"
      },
      "companyName": "Municipio de Pereira"
    }
  ]
}
```

- Consultar aplicaciones por usuario y cliente:
  - Endpoint: [miurl:miPuerto/application/userclient/:idUser/:idCompanyClient]()
  - Retorno: array de objetos de aplicación

```json
{
  "success": true,
  "data": [
    {
      "id": "97447779-4e1c-45a1-ad0b-f0925a72e**",
      "shortName": "SIIFWEB",
      "fullName": "Sistema Integrado de Información Financiera",
      "urlLogo": null,
      "urlMain": null,
      "idCompanyProvider": "83a6b75a-a911-4c69-960d-240975fda***"
    },
    {
      "id": "657ee03a-8eed-4c26-9086-114657212***",
      "shortName": "SUCITA",
      "fullName": "Sistema Unico de Citas y Turnos de Atención",
      "urlLogo": null,
      "urlMain": null,
      "idCompanyProvider": "f24effa4-c252-4c23-af42-1736c634c***"
    }
  ]
}
```

- Consultar la estructura de una aplicación:
  - Endpoint: [miurl:miPuerto/application/estruct/:idUser/:idCompanyClient]()
  - Retorno: Objeto de estructura de la aplicación

```json
{
  "success": true,
  "data": {
    "components": [
      {
        "id": "7880b15a-9c75-4466-96a4-5f038d317***",
        "description": "Interfaz Bancos",
        "idComponent": "a4f26284-8914-11ec-a8a3-0242ac120***",
        "componentType": "FORM",
        "version": 4,
        "specification": {
          "name": "BANCO",
          "data_block": [
            {
              "item": [
                {
                  "name": "idBanco",
                  "prompt": "Consecutivo Banco",
                  "data_type": "NUMBER",
                  "item_type": "TEXTFIELD",
                  "incremental": true,
                  "primary_key": true
                },
                {
                  "name": "nombre",
                  "length": 50,
                  "prompt": "Nombre Banco",
                  "data_type": "TEXT",
                  "item_type": "TEXTFIELD",
                  "primary_key": false
                }
              ],
              "name": "BANCO"
            }
          ],
          "data_origin": "http://docker.siifweb.com:5020/",
          "type_origin": "API_REST",
          "data_provider": "SYNCHROX"
        }
      },
      {
        "id": "bd3c77df-0fad-44ab-905d-d7576e430***",
        "description": "Interfaz Tercero",
        "idComponent": "c464730d-75b3-44fc-a237-41c9c3565***",
        "componentType": "FORM",
        "version": 1,
        "specification": {
          "name": "TERCERO",
          "data_block": [
            {
              "item": [
                {
                  "name": "idTercero",
                  "prompt": "Identificación",
                  "data_type": "NUMBER",
                  "item_type": "TEXTFIELD",
                  "incremental": true,
                  "primary_key": true
                },
                {
                  "name": "nombre",
                  "length": 50,
                  "prompt": "Nombre",
                  "data_type": "TEXT",
                  "item_type": "TEXTFIELD",
                  "primary_key": false
                },
                {
                  "name": "apellido1",
                  "length": 50,
                  "prompt": "Primer Apellido",
                  "data_type": "TEXT",
                  "item_type": "TEXTFIELD",
                  "primary_key": false
                },
                {
                  "name": "apellido2",
                  "length": 50,
                  "prompt": "Segundo Apellido",
                  "data_type": "TEXT",
                  "item_type": "TEXTFIELD",
                  "primary_key": false
                }
              ],
              "name": "TERCERO"
            }
          ],
          "data_origin": "http://docker.siifweb.com:5020/",
          "type_origin": "API_REST",
          "data_provider": "SYNCHROX"
        }
      }
    ],
    "menu": [
      {
        "id": "82bed01e-cf4e-41ea-9896-fa7de818a***",
        "menuGroup": "UP",
        "idParent": null,
        "optionName": "Inicial",
        "description": "Opción Inicial",
        "execType": "NONE",
        "execCall": null,
        "execParams": "",
        "subMenu": [
          {
            "id": "97b74f79-bde9-48fb-9686-f0e287c99***",
            "menuGroup": "UP",
            "idParent": "82bed01e-cf4e-41ea-9896-fa7de818a***",
            "optionName": "Bancos",
            "description": "Interfaz de Bancos",
            "execType": "FORM",
            "execCall": "a4f26284-8914-11ec-a8a3-0242ac120***",
            "execParams": null,
            "subMenu": []
          },
          {
            "id": "6aac3d62-535c-4097-9465-90d578c6d687",
            "menuGroup": "UP",
            "idParent": "82bed01e-cf4e-41ea-9896-fa7de818a***",
            "optionName": "Terceros",
            "description": "Interfaz de Terceros",
            "execType": "FORM",
            "execCall": "752d84f2-9008-11ec-b909-0242ac120***",
            "execParams": null,
            "subMenu": []
          },
          {
            "id": "007cf4ce-065d-4b73-9007-63f14076096b",
            "menuGroup": "UP",
            "idParent": "82bed01e-cf4e-41ea-9896-fa7de818a***",
            "optionName": "Ajustes",
            "description": null,
            "execType": "NONE",
            "execCall": null,
            "execParams": null,
            "subMenu": [
              {
                "id": "ac9120ad-4484-4799-b922-f3e6497b5***",
                "menuGroup": "UP",
                "idParent": "007cf4ce-065d-4b73-9007-63f140760***",
                "optionName": "Parámetros generales",
                "description": "Parametros globales de la aplicación",
                "execType": "FORM",
                "execCall": "4cc4a452-900b-11ec-b909-0242ac120***",
                "execParams": null,
                "subMenu": []
              },
              {
                "id": "ed0461ea-49a1-4554-a345-7b541bdad***",
                "menuGroup": "UP",
                "idParent": "007cf4ce-065d-4b73-9007-63f140760***",
                "optionName": "Parámetros individuales",
                "description": "Parametros individuales por cliente",
                "execType": "FORM",
                "execCall": "26d06a76-902c-11ec-b909-0242ac120***",
                "execParams": null,
                "subMenu": []
              },
              {
                "id": "0d0a03c0-34fe-43c6-b22b-c90dcbeca***",
                "menuGroup": "UP",
                "idParent": "007cf4ce-065d-4b73-9007-63f140760***",
                "optionName": "Conexiones",
                "description": "Tipos de conexión",
                "execType": "NONE",
                "execCall": null,
                "execParams": null,
                "subMenu": [
                  {
                    "id": "6f29a522-cb7b-4454-84d7-ad8675f14***",
                    "menuGroup": "UP",
                    "idParent": "0d0a03c0-34fe-43c6-b22b-c90dcbeca***",
                    "optionName": "Locales",
                    "description": "Conexión local",
                    "execType": "FORM",
                    "execCall": "abd7f446-902c-11ec-b909-0242ac120***",
                    "execParams": null,
                    "subMenu": []
                  },
                  {
                    "id": "cef12cdb-6b89-4d19-9259-0f39e0aad***",
                    "menuGroup": "UP",
                    "idParent": "0d0a03c0-34fe-43c6-b22b-c90dcbeca***",
                    "optionName": "Remotas",
                    "description": "Conexión remota",
                    "execType": "FORM",
                    "execCall": "c99de7e2-902c-11ec-b909-0242ac120***",
                    "execParams": null,
                    "subMenu": []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

**POST**

Mediante POST se realizan las siguientes acciones:

- Insertar un nuevo registro de aplicación:
  - Endpoint: [miurl:miPuerto/application/]()
  - Retorno: array de objeto de aplicación creado
  - Body:

```json
{
  "shortName": "SUCITA",
  "fullName": "Sistema Unico de Citas y Turnos de Atención",
  "idCompany": "b0169bc4-8835-11ec-a8a3-0242ac120***"
}
```
