import express from "express";
import { criarTenant } from "../controller/criar-tenant.controller.js";
import { registrarPagamento } from "../../pagamento_licenca/controller/registrar-pagamento.controller.js";
import { gerarCodigoAtivacao } from "../../codigos_ativacao/controller/gerar-codigo-ativacao.controller.js";
const route = express.Router()

route.post("/", criarTenant)
route.post("/:id/codigo-ativacao/", gerarCodigoAtivacao)
route.post("/:id/pagamento", registrarPagamento)

export default route