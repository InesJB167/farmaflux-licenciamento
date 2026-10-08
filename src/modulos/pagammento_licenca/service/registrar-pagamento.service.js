import {buscarTenantPorId} from "../../tenants/repository/buscarTenantPorId.js"

export const registrarPagamentoService = async(idTenant,dadosPagamento)=>{
    const tenant = await buscarTenantPorId(idTenant)
    if(!tenant) return{
        success: false,
        status: 404,
        message: "Tenant não encontrado."
    }

    
}