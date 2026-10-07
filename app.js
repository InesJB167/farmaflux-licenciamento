import express from "express";
import cors from "cors"
import tenantRoutes from "./src/modulos/tenants/router/tenants.route.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/tenant" ,tenantRoutes)

export default app