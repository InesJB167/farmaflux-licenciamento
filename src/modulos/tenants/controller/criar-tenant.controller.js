import { criarTenantService } from "../service/criar-tenant.service.js"

export const criarTenant = async (req, res) =>
{
    try {
        const tenantId = req.body.tenantId?.trim()
        const nomeFarmacia = req.body.nomeFarmacia?.trim()
        const dataProximoPagamento = new Date(req.body.dataProximoPagamento)
        const limiteDispositivos = parseInt(req.body.limiteDispositivos)

        if (!tenantId) return res.status(400).json({ message: "Tenant Id inválido." })

        if (!nomeFarmacia) return res.status(400).json({ message: "Nome da farmácia inválido." })

        if (isNaN(dataProximoPagamento)) return res.status(400).json({ message: "Data fornecida inválida." })

        if (isNaN(limiteDispositivos) || limiteDispositivos <= 0) return res.status(400).json({ message: "Limite de dispositivos fornecido inválido." })

        const dadosFarmacia = {
            tenantId,
            nomeFarmacia,
            dataProximoPagamento,
            limiteDispositivos
        }

        console.log("dados farmacia", dadosFarmacia)

        const novoTenant = await criarTenantService(dadosFarmacia)
        return res.status(novoTenant.status).json(novoTenant)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}