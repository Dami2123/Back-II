export const auth=rol=>{
    return (req, res, next)=>{
        if(!req.user || !req.user?.rol){
            return res.status(403).json({error:`No hay rol definido`})
        }
        
        if(req.user.rol!==rol){
            return res.status(403).json({error:`No autorizado - contenido no disponible para su rol`})
        }

        next()
    }
}