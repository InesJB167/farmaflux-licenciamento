import dotenv from "dotenv"
dotenv.config()

import prisma from "./prisma/prisma.js"
import app from "./app.js"

async function server() {
    const port = process.env.PORT
    try {
        
        await prisma.$connect()
        app.listen(port || 3000)
        console.log("Conexão estabelecida! Servidor rodando na porta:",port)
    } catch (error) {
        console.log("Não foi possivel rodar o servidor! Erro na conexão com o banco!",error)
    }
}

server()