import express from "express"
import { gerarCodigoAtivacao } from "../controller/gerar-codigo-ativacao.controller.js"
const route = express.Router()

route.post("/", gerarCodigoAtivacao)
export default route