// ==========================================
// AUTOFIX - SERVIDOR
// Node.js + Express + MySQL
// ==========================================

const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


// ==========================================
// CONFIGURAÇÕES
// ==========================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// ==========================================
// CONEXÃO COM O BANCO DE DADOS
// ==========================================

const banco = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});


// ==========================================
// TESTAR CONEXÃO COM MYSQL
// ==========================================

async function testarBanco() {

    try {

        const conexao = await banco.getConnection();

        console.log("=================================");
        console.log("MySQL conectado com sucesso!");
        console.log("Banco: " + process.env.DB_NAME);
        console.log("=================================");

        conexao.release();

    } catch (erro) {

        console.error(
            "Erro ao conectar com o MySQL:"
        );

        console.error(erro.message);

    }

}

testarBanco();


// ==========================================
// ARQUIVOS HTML, CSS E JS
// ==========================================

app.use(
    express.static(
        path.join(__dirname)
    )
);


// ==========================================
// ROTA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


// ==========================================
// LOGIN
// ==========================================

app.post("/api/login", async (req, res) => {

    try {

        const {
            email,
            senha
        } = req.body;


        if (!email || !senha) {

            return res.status(400).json({

                erro:
                    "Preencha o e-mail e a senha."

            });

        }


        const [usuarios] =
            await banco.execute(

                `SELECT *
                 FROM usuarios
                 WHERE email = ?`,

                [email]

            );


        if (usuarios.length === 0) {

            return res.status(401).json({

                erro:
                    "E-mail ou senha incorretos."

            });

        }


        const usuario =
            usuarios[0];


        // Para o projeto acadêmico,
        // estamos comparando a senha diretamente.
        // Em produção, deve ser usado bcrypt.

        if (usuario.senha !== senha) {

            return res.status(401).json({

                erro:
                    "E-mail ou senha incorretos."

            });

        }


        res.json({

            sucesso: true,

            mensagem:
                "Login realizado com sucesso!",

            usuario: {

                id: usuario.id,

                nome: usuario.nome,

                email: usuario.email

            }

        });


    } catch (erro) {

        console.error(erro);

        res.status(500).json({

            erro:
                "Erro ao realizar login."

        });

    }

});


// ==========================================
// CLIENTES
// ==========================================

// LISTAR CLIENTES

app.get(
    "/api/clientes",
    async (req, res) => {

        try {

            const [clientes] =
                await banco.execute(

                    `SELECT *
                     FROM clientes
                     ORDER BY id DESC`

                );


            res.json(clientes);


        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                erro:
                    "Erro ao buscar clientes."

            });

        }

    }
);


// CADASTRAR CLIENTE

app.post(
    "/api/clientes",
    async (req, res) => {

        try {

            const {
                nome,
                cpf,
                telefone,
                email,
                endereco
            } = req.body;


            if (!nome || !cpf) {

                return res.status(400).json({

                    erro:
                        "Nome e CPF são obrigatórios."

                });

            }


            const [resultado] =
                await banco.execute(

                    `INSERT INTO clientes
                    (
                        nome,
                        cpf,
                        telefone,
                        email,
                        endereco
                    )
                    VALUES (?, ?, ?, ?, ?)`,

                    [
                        nome,
                        cpf,
                        telefone,
                        email,
                        endereco
                    ]

                );


            res.json({

                sucesso: true,

                mensagem:
                    "Cliente cadastrado com sucesso!",

                id:
                    resultado.insertId

            });


        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                erro:
                    "Erro ao cadastrar cliente."

            });

        }

    }
);


// EXCLUIR CLIENTE

app.delete(
    "/api/clientes/:id",
    async (req, res) => {

        try {

            const id =
                req.params.id;


            await banco.execute(

                `DELETE FROM clientes
                 WHERE id = ?`,

                [id]

            );


            res.json({

                sucesso: true,

                mensagem:
                    "Cliente excluído."

            });


        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                erro:
                    "Erro ao excluir cliente."

            });

        }

    }
);


// ==========================================
// VEÍCULOS
// ==========================================

// LISTAR VEÍCULOS

app.get(
    "/api/veiculos",
    async (req, res) => {

        try {

            const [veiculos] =
                await banco.execute(

                    `SELECT
                        v.*,
                        c.nome AS cliente_nome

                     FROM veiculos v

                     INNER JOIN clientes c
                     ON c.id = v.cliente_id

                     ORDER BY v.id DESC`

                );


            res.json(veiculos);


        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                erro:
                    "Erro ao buscar veículos."

            });

        }

    }
);


// CADASTRAR VEÍCULO

app.post(
    "/api/veiculos",
    async (req, res) => {

        try {

            const {
                cliente_id,
                placa,
                marca,
                modelo,
                ano,
                cor
            } = req.body;


            if (
                !cliente_id ||
                !placa ||
                !marca ||
                !modelo
            ) {

                return res.status(400).json({

                    erro:
                        "Preencha os campos obrigatórios."

                });

            }


            const [resultado] =
                await banco.execute(

                    `INSERT INTO veiculos
                    (
                        cliente_id,
                        placa,
                        marca,
                        modelo,
                        ano,
                        cor
                    )
                    VALUES (?, ?, ?, ?, ?, ?)`,

                    [
                        cliente_id,
                        placa,
                        marca,
                        modelo,
                        ano || null,
                        cor
                    ]

                );


            res.json({

                sucesso: true,

                mensagem:
                    "Veículo cadastrado com sucesso!",

                id:
                    resultado.insertId

            });


        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                erro:
                    "Erro ao cadastrar veículo."

            });

        }

    }
);


// ==========================================
// SERVIÇOS / ORDENS
// ==========================================

// LISTAR SERVIÇOS

app.get(
    "/api/servicos",
    async (req, res) => {

        try {

            const [servicos] =
                await banco.execute(

                    `SELECT

                        o.*,

                        c.nome AS cliente_nome,

                        v.placa,

                        v.marca,

                        v.modelo

                     FROM ordens_servico o

                     INNER JOIN clientes c
                     ON c.id = o.cliente_id

                     INNER JOIN veiculos v
                     ON v.id = o.veiculo_id

                     ORDER BY o.id DESC`

                );


            res.json(servicos);


        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                erro:
                    "Erro ao buscar serviços."

            });

        }

    }
);


// CADASTRAR SERVIÇO

app.post(
    "/api/servicos",
    async (req, res) => {

        try {

            const {
                cliente_id,
                veiculo_id,
                problema,
                solucao,
                valor,
                status
            } = req.body;


            if (
                !cliente_id ||
                !veiculo_id ||
                !problema
            ) {

                return res.status(400).json({

                    erro:
                        "Cliente, veículo e problema são obrigatórios."

                });

            }


            const [resultado] =
                await banco.execute(

                    `INSERT INTO ordens_servico
                    (
                        cliente_id,
                        veiculo_id,
                        problema,
                        solucao,
                        valor,
                        status
                    )
                    VALUES (?, ?, ?, ?, ?, ?)`,

                    [
                        cliente_id,
                        veiculo_id,
                        problema,
                        solucao,
                        valor || 0,
                        status || "Aberto"
                    ]

                );


            res.json({

                sucesso: true,

                mensagem:
                    "Serviço cadastrado com sucesso!",

                id:
                    resultado.insertId

            });


        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                erro:
                    "Erro ao cadastrar serviço."

            });

        }

    }
);


// ==========================================
// PAGAMENTOS
// ==========================================

// LISTAR PAGAMENTOS

app.get(
    "/api/pagamentos",
    async (req, res) => {

        try {

            const [pagamentos] =
                await banco.execute(

                    `SELECT

                        p.*,

                        o.problema,

                        c.nome AS cliente_nome

                     FROM pagamentos p

                     INNER JOIN ordens_servico o
                     ON o.id = p.ordem_id

                     INNER JOIN clientes c
                     ON c.id = o.cliente_id

                     ORDER BY p.id DESC`

                );


            res.json(pagamentos);


        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                erro:
                    "Erro ao buscar pagamentos."

            });

        }

    }
);


// REGISTRAR PAGAMENTO

app.post(
    "/api/pagamentos",
    async (req, res) => {

        try {

            const {
                ordem_id,
                valor,
                forma
            } = req.body;


            if (
                !ordem_id ||
                !valor ||
                !forma
            ) {

                return res.status(400).json({

                    erro:
                        "Preencha todos os campos."

                });

            }


            const [resultado] =
                await banco.execute(

                    `INSERT INTO pagamentos
                    (
                        ordem_id,
                        valor,
                        forma,
                        status
                    )
                    VALUES (?, ?, ?, ?)`,

                    [
                        ordem_id,
                        valor,
                        forma,
                        "PAGO"
                    ]

                );


            // Atualiza o status
            // da ordem de serviço

            await banco.execute(

                `UPDATE ordens_servico

                 SET status = ?

                 WHERE id = ?`,

                [
                    "PAGO",
                    ordem_id
                ]

            );


            res.json({

                sucesso: true,

                mensagem:
                    "Pagamento registrado com sucesso!",

                id:
                    resultado.insertId

            });


        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                erro:
                    "Erro ao registrar pagamento."

            });

        }

    }
);


// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(
    PORT,
    () => {

        console.log("");
        console.log("=================================");
        console.log("       AUTOFIX - SERVIDOR");
        console.log("=================================");
        console.log(
            `Servidor: http://localhost:${PORT}`
        );
        console.log("=================================");
        console.log("");

    }
);