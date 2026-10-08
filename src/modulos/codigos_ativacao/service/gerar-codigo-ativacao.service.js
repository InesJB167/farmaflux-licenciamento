import prisma from "../../../../prisma/prisma.js"
import {buscarTenantId} from "../../tenants/repository/buscarTenantId.js"
import crypto, { randomInt } from "node:crypto"
import { buscarCodigoAtivacao } from "../repos/buscarCodigoAtivacao.js"

export const gerarCodigoAtivacaoService = async(tenantId)=>{
    /**
     * ? essa funçao vai gerar o codigo de ativaçao para o uso do sistema 
     */

    const tenant = await buscarTenantId(tenantId)
    if(!tenant) return{
        success: false,
        status: 404,
        message: "Tenant não encontrado."
    }

    const sequencia = randomInt(0,10000)
    const codigoAtivacao = `FJB-${sequencia}`
    const idTenant = tenant.id
    const data = new Date()
    const expirando = new Date(data.setMinutes((data.getMinutes()) + 30))
    console.log(`sequencia ${sequencia}, codigo ${codigoAtivacao}, expirando em ${expirando}`)

    const codigoExiste = await buscarCodigoAtivacao(codigoAtivacao)
    if(codigoExiste) return{
        success: false,
        status: 409,
        message:"Este codigo ja está sendo usado."
    }

    const registrarCodigo = await prisma.codigos_ativacao.create({
        data:{
            codigo: codigoAtivacao,
            tenant:{
                connect:{
                    id: idTenant
                }
            },
            expira_em: expirando
        }
    })

    return {
        succes: true,
        status: 201,
        message: "Codigo de ativação criado com sucesso.",
        data: registrarCodigo
    }
}