import express from "express";
import cors from "cors"
import tenantRoutes from "./src/modulos/tenants/router/tenants.route.js"
import planoLicencaRoutes from "./src/modulos/planos_licenca/router/plano-licenca.route.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/tenant" ,tenantRoutes)
app.use("/plano-licenca", planoLicencaRoutes)

export default app