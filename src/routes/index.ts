import { Router } from 'express'
const router = Router();

import { getTarefas, getTarefaById, createTarefa, deleteTarefa, updateTarefa } from '../controllers/index.controller'

router.get('/tarefas', getTarefas);
router.get('/tarefas/:id', getTarefaById);
router.post('/tarefas', createTarefa);
router.put('/tarefas/:id', updateTarefa);
router.delete('/tarefas/:id', deleteTarefa);

export default router;