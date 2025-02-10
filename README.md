# Laboratorio 2 Practica Supervisada

## Ejecutar el Proyecto
Pasos para ejecutar el proyecto:
1. Clona el repositorio.
2. Instala las dependencias usando `npm install`.
3. Inicia el servidor usando `npm start run dev`.
   
![df855eb919118e9c11be697778fddaf3](https://github.com/user-attachments/assets/099f43bf-488a-4737-b82d-d07382a5417c)



## Coleccion de EndPoints

## Endpoints de Registro y Login

- **Registrarse como estudiante**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/auth/registerStudent`
  - **Método:** `POST`
  - 
    ```json
    {
      "name": "Diego Fernando",
      "surname": "Garcia Galvez",
      "email": "dgarcia@gmail.com",
      "password": "12345678",
      "profilePicture": "ruta de la foto de perfil",
      "role": "STUDENT_ROLE"
    }
    ```

- **Registrar Maestro**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/auth/registerTeacher`
  - **Método:** `POST`
  - 
    ```json
    {
      "name": "Braulio",
      "surname": "Echeverria",
      "email": "braulSTARS@gmail.com",
      "password": "12345678",
      "profilePicture": "Ruta de la foto de perfil",
      "role": "TEACHER_ROLE"
    }
    ```

- **Iniciar Sesión Estudiante**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/auth/loginStudent`
  - **Método:** `POST`
  - 
    ```json
    {
      "email": "dgarcia@gmail.com",
      "password": "12345678"
    }
    ```

- **Iniciar Sesión Maestro**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/auth/loginTeacher`
  - **Método:** `POST`
  - 
    ```json
    {
      "email": "braulSTARS@gmail.com",
      "password": "12345678"
    }
    ```

## Endpoints como maestro


- **Crear curso**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/teacher/crearCurso`
  - **Método:** `POST`
  -
    ```json
    {
    "name": "Lenguaje",
    "teacherId": "<id del maestro>"
    }
    ```

- **Editar curso**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/teacher/editarCurso/:idCurso`
  - **Método:** `PATCH`
  -
    ```json
    {
    "name": "Biologia"
    }
    ```

- **Eliminar curso**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/teacher/eliminarCurso/:idCurso`
  - **Método:** `DELETE`


- **Listar Cursos Por Maestro**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/teacher/listarCursosPorMaestro/:idTeacher`
  - **Método:** `GET`


## Endpoints como estudiante

    
## En este caso usuario (user) es igual a estudiante

- **Asignar curso al estudiante**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/student/asignarseCurso/:idEstudiante`
  - **Método:** `PATCH`
  - **Cuerpo:** 
    ```json
    {
    "courseId": "<idCurso>"
    }
    ```

- **Listar todos los cursos**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/student/listarCursosDisponibles`
  - **Método:** `GET`
    
 
- **Listar cursos de estudiante**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/student/verCursosEstudiante/:idEstudiante`
  - **Método:** `GET`



- **Eliminar perfil de estudiante**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/student/eliminarPerfil/:idEstudiante`
  - **Método:** `DELETE`


- **Actualizar perfil de estudiante**
  - **URL:** `http://127.0.0.1:3001/sistemaEducativo/v1/student/actualizarPerfil/:idEstudiante`
  - **Método:** `PUT`

    ```json
    {
    "name": "Pablooo",
    "surname": "Villela",
    "email": "uihfeushe@gmail.com",
    }
    ```
