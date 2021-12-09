import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'

export const getTarefas = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM tarefas');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
}

export const getTarefaById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response: QueryResult = await pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    return res.json(response.rows);
}

export const createTarefa = async (req: Request, res: Response): Promise<Response> => {
    const { nome, conteudo, datacriacao, autor } = req.body;
    const response: QueryResult = await pool.query('INSERT INTO tarefas (nome, conteudo, datacriacao, autor) VALUES ($1, $2, $3, $4)', [nome, conteudo, datacriacao, autor]);
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
}

export const updateTarefa = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { nome, conteudo, datacriacao, autor } = req.body;
    await pool.query('UPDATE tarefas SET nome = $1, conteudo = $2, datacriacao = $3, autor = $4 WHERE id = $5', [nome, conteudo, datacriacao, autor, id]);
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
}

export const deleteTarefa = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM tarefas WHERE id = $1', [id]);
    return res.json(`Tarefa ${id} deletada com sucesso`);
} 
