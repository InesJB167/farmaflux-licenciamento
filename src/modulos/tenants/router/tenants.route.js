import express from "express";
import { criarTenant } from "../controller/criar-tenant.controller.js";
import { registrarPagamento } from "../../pagammento_licenca/controller/registrar-pagamento.controller.js";
const route = express.Router()

route.post("/", criarTenant)
route.post("/:id/pagamento", registrarPagamento)

export default route