"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import authRoutes from "../src/auth/auth.routes.js"
import teacherRoutes from "../src/teacher/teacher.routes.js"
import studentRoutes from "../src/user/user.routes.js"



const middlewares = (app) => {
    //Leer formularios y JSON
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    //Seguridad y poteccion
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

/*
Rutas de mi API segun usuario
*/
const routes = (app) =>{
    app.use("/sistemaEducativo/v1/auth", authRoutes)
    app.use("/sistemaEducativo/v1/teacher", teacherRoutes)
    app.use("/sistemaEducativo/v1/student", studentRoutes)
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}