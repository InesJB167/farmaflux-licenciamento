import prisma from "../../../../prisma/prisma.js"

export const criarTenantService = async (dadosFarmacia) =>
{
    /**
     * ?dadosFarmacia deve trazer pelo menos tenant_id (definido pelo dev durante a configuração do software, ex: "farma-luanda-sul") e nome_farmacia 
     */
    const tenantId = dadosFarmacia.tenantId
    const criarTenant = await prisma.tenants.upsert({
        where:{
            tenant_id: tenantId
        },
        update:{
            tenant_id: tenantId,
            nome_farmacia:  dadosFarmacia.nomeFarmacia,
            limite_dispositivos: dadosFarmacia.limiteDispositivos
        },
        create:{
            tenant_id: tenantId,
            nome_farmacia:  dadosFarmacia.nomeFarmacia,
            limite_dispositivos: dadosFarmacia.limiteDispositivos
        }

    })

    return {
        success: true,
        status: 201,
        message: "Tenant criado com sucesso.",
        data: criarTenant
    }
}