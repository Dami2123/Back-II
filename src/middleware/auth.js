export const auth = (role = "user") => {
    return async(req, res, next) => {
        
    if (req.user.role !== role) {

        return res.status(401).json({ error: `No posees credenciales para acceder a este contenido` })
    }

    if (req.params.cid) {
     
        if(req.user.cart!= req.params.cid){
        return res.status(401).json({ error: `No posees credenciales para acceder a este contenido` })}
    }
        next()
    }
}

