
export const verificarApiKey = async(req,res,next)=>{
    try {
        const chaveApiRecebida = req.headers["x-api-key"]//?here's the name of the prop that holds the api key
        const chaveApiGuardada = process.env.API_KEY_ESPERADA
        
        if(chaveApiRecebida !== chaveApiGuardada) return res.status(401).json({message: "Não possui autorização para se conectar com a Api de licenciamento."})

        next()
        
    } catch (error) {
        console.log(error)
        return res.json({error:error.message})
    }
}