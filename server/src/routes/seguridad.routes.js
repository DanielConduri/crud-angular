import { Router } from 'express';
import controladorSeguridad from '../controllers/seguridad/seguridad.controllers.js'



const router = Router();
router.post('/', controladorSeguridad.validarLogin);

export default router;