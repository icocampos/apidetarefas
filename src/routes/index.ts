import { Router } from 'express'
const router = Router();

import { getTarefas, getTarefaById, createTarefa } from '../controllers/index.controller'

router.get('/tarefas', getTarefas);
router.get('/tarefas/:id', getTarefaById);
router.post('/tarefas', createTarefa);
// router.put('/tarefas/:id', getTarefas);
// router.delete('/tarefas/:id', getTarefas);

export default router;