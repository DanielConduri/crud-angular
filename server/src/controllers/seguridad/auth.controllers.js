import jwt from 'jsonwebtoken';
import { jwtVariables } from '../../config/variables.config';

function verificarToken(token) {
    return new Promise ((resolve, reject) => {
        try {
            jwt.verify(token, jwtVariables.jwtSecret, (error, decoded ) => {
                if(error) 
                    reject(error);
                else 
                    resolve(decoded)
            });
        } catch (error) {
            reject(error);
        }
    })
}