

export const validarLogin = async (req, res) => {
    try {
        const data = req.body;

        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // que sea misma hora que el token // alcula los milisegundos correspondientes a 7 días. 7 días = 7 días × 24 horas × 60 minutos × 60 segundos × 1000 milisegundos = 604800000 milisegundos.
            httpOnly: true, //HttpOnly es hacer más difícil que un atacante robar las cookies de autenticación a través de vulnerabilidades XSS
            sameSite: 'none',
            secure: true,
            damin: 'localhost'
        });
    
        res.json({
            status: 'success',
            message: 'Existe el usuario',
            userData: {
    
            },
            accessToken: token
        });

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }

    


}

export default{
    validarLogin
}