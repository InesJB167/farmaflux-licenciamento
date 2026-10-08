import express from "express";
import cors from "cors"
import tenantRoutes from "./src/modulos/tenants/router/tenants.route.js"
import codigoAtivacaoRoutes from "./src/modulos/codigos_ativacao/router/codigo-ativacao.route.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/tenant" ,tenantRoutes)
app.use("/codigo-ativacao", codigoAtivacaoRoutes)

export default app