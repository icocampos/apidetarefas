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
    const { titulo, descricao, conteudo, datacriacao, autor } = req.body;
    const response: QueryResult = await pool.query('INSERT INTO tarefas (titulo, descricao, conteudo, datacriacao, autor) VALUES ($2, $3, $4, $5, $6)', [titulo, descricao, conteudo, datacriacao, autor]);
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
}

/*  export const updateTarefa = async (req: Request, res: Response): Promise<Response> => {
    
}
export const deleteTarefa = async (req: Request, res: Response): Promise<Response> => {
    
} */
