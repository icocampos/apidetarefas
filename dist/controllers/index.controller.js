"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTarefa = exports.getTarefaById = exports.getTarefas = void 0;
const database_1 = require("../database");
const getTarefas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM tarefas');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
});
exports.getTarefas = getTarefas;
const getTarefaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    return res.json(response.rows);
});
exports.getTarefaById = getTarefaById;
const createTarefa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descricao, conteudo, datacriacao, autor } = req.body;
    const response = yield database_1.pool.query('INSERT INTO tarefas (titulo, descricao, conteudo, datacriacao, autor) VALUES ($2, $3, $4, $5, $6)', [titulo, descricao, conteudo, datacriacao, autor]);
    return res.json({
        message: 'Tarefa criada com sucesso',
        body: {
            tarefas: {
                titulo,
                descricao,
                conteudo,
                datacriacao,
                autor
            }
        }
    });
});
exports.createTarefa = createTarefa;
/*  export const updateTarefa = async (req: Request, res: Response): Promise<Response> => {
    
}
export const deleteTarefa = async (req: Request, res: Response): Promise<Response> => {
    
} */
