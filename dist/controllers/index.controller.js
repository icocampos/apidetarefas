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
exports.deleteTarefa = exports.updateTarefa = exports.createTarefa = exports.getTarefaById = exports.getTarefas = void 0;
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
    const { nome, conteudo, datacriacao, autor } = req.body;
    const response = yield database_1.pool.query('INSERT INTO tarefas (nome, conteudo, datacriacao, autor) VALUES ($1, $2, $3, $4)', [nome, conteudo, datacriacao, autor]);
    return res.json({
        message: 'Tarefa criada com sucesso',
        body: {
            tarefas: {
                nome,
                conteudo,
                datacriacao,
                autor
            }
        }
    });
});
exports.createTarefa = createTarefa;
const updateTarefa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nome, conteudo, datacriacao, autor } = req.body;
    yield database_1.pool.query('UPDATE tarefas SET nome = $1, conteudo = $2, datacriacao = $3, autor = $4 WHERE id = $5', [nome, conteudo, datacriacao, autor, id]);
    return res.json({
        message: 'Tarefa atualizada com sucesso',
        body: {
            tarefas: {
                id,
                nome,
                conteudo,
                datacriacao,
                autor
            }
        }
    });
});
exports.updateTarefa = updateTarefa;
const deleteTarefa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield database_1.pool.query('DELETE FROM tarefas WHERE id = $1', [id]);
    return res.json(`Tarefa ${id} deletada com sucesso`);
});
exports.deleteTarefa = deleteTarefa;
