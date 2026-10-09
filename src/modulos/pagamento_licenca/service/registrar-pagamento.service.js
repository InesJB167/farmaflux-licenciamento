import prisma from "../../../../prisma/prisma.js"
import { buscarPlanoLicencaPorId } from "../../planos_licenca/repos/buscarPlanoPorId.js"
import { buscarTenantPorId } from "../../tenants/repository/buscarTenantPorId.js"

export const registrarPagamentoService = async (idTenant, dadosPagamento) =>
{
    const tenant = await buscarTenantPorId(idTenant)
    if (!tenant) return {
        success: false,
        status: 404,
        message: "Tenant não encontrado."
    }

    const planoLicenca = await buscarPlanoLicencaPorId(dadosPagamento.idPlano)
    if (!planoLicenca) return {
        success: false,
        status: 404,
        message: "Plano licença não encontrado."
    }

    const custoPlano = planoLicenca.custo
    if (dadosPagamento.valorPago < custoPlano) {
        return {
            success: false,
            status: 409,
            message: `Valor inferior ao custo deste plano. Valor exigido: ${custoPlano}.`
        }
    } else if (dadosPagamento.valorPago > custoPlano) return {
        success: false,
        status: 409,
        message: `Valor superior ao custo deste plano. Valor exigido: ${custoPlano}.`
    }

    const hoje = new Date()
    const dataAtual = new Date()
    const duracao = planoLicenca.duracao_dias
    const dataFim = new Date(dataAtual.setDate(dataAtual.getDate() + duracao))
    console.log(`Data atual ${dataAtual} depois de ${duracao} dias ${dataFim}`)

    const dadosParaRegistro = {
        valor_pago: dadosPagamento.valorPago,
        metodo: dadosPagamento.metodoUsado,
        data_inicio: hoje,
        data_fim: dataFim
    }

    const realizarPagamento = await prisma.$transaction( async (tx) =>
    {
        const registrarPagamento = await tx.pagamento_licenca.create({
            data: {
                tenant: {
                    connect: {
                        id: idTenant
                    }
                },
                plano: {
                    connect: {
                        id: planoLicenca.id
                    }
                },
                ...dadosParaRegistro
            },
            select:{
                id: true,
                data_pagamento: true,
                valor_pago: true,
                metodo: true
            }
        })

        const alterarStatusTenant = await tx.tenants.update({
            where: {
                id: idTenant
            },
            data: {
                estado: "ATIVO"
            },
            select: {
                tenant_id: true,
                estado: true
            }
        })
        return {
            resultado: {
                registrarPagamento,
                alterarStatusTenant
            }
        }
    })

    return {
        success: true,
        status: 201,
        message: "Pagamento registrado com sucesso.",
        data: realizarPagamento
    }

}