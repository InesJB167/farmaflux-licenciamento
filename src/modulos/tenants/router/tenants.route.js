import express from "express";
import { criarTenant } from "../controller/criar-tenant.controller.js";
const route = express.Router()

route.post("/", criarTenant)
export default route