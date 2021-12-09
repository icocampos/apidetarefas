CREATE DATABASE tarefasapi;

CREATE TABLE tarefas(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(40),
    conteudo VARCHAR(255),
    dataCriacao DATE,
    autor VARCHAR(40)
);

INSERT INTO tarefas (nome, conteudo, dataCriacao, autor)
    VALUES ('Lavar Prato', 'Iniciando tarefas domesticas', '2020-01-01', 'Ícaro Campos'),
            ('Lavar Banheiro', 'Terminando tarefas domesticas', '2020-01-01', 'Iracema Andrade');
