# Autenticación de Usuarios (Local y Google)

Este proyecto soporta autenticación de usuarios tanto local (usuario/contraseña) como mediante Google (OAuth).

## Endpoints

### 1. Login Local

- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "username": "usuario",
    "password": "contraseña"
  }
  ```
- **Respuesta exitosa:**
  ```json
  {
    "token": "<JWT>"
  }
  ```

### 2. Login con Google

- **POST** `/auth/google`
- **Body:**
  ```json
  {
    "token": "<Google ID Token>"
  }
  ```
- **Respuesta exitosa:**
  ```json
  {
    "token": "<JWT>"
  }
  ```

## Modelo PlatUser relevante

- `username`, `email`, `password`: para autenticación local.
- `authProvider`, `providerId`, `providerData`: para autenticación con Google.
- `lastLoginAt`: fecha/hora del último acceso.

## Flujo de autenticación

### Local

1. El usuario envía usuario y contraseña a `/auth/login`.
2. Se valida la contraseña (hash bcrypt).
3. Si es correcto, se responde con un JWT.

### Google

1. El frontend obtiene el ID Token de Google.
2. Envía el token a `/auth/google`.
3. Se valida el token con Google y se busca/crea el usuario.
4. Se responde con un JWT.

## Uso del JWT

- El JWT debe enviarse en el header `Authorization: Bearer <token>` para acceder a rutas protegidas.

## Notas

- El campo `authProvider` puede ser 'local' o 'google'.
- El campo `providerId` almacena el ID del usuario en Google.
- El campo `providerData` puede almacenar información adicional del perfil de Google.

---

¿Dudas o necesitas ejemplos de integración frontend?
