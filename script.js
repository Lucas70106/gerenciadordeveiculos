// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const email =
                document.getElementById("email").value;

            const senha =
                document.getElementById("senha").value;


            // Dados para teste

            const emailCorreto =
                "admin@autofix.com";

            const senhaCorreta =
                "123456";


            const mensagem =
                document.getElementById("mensagem");


            if (
                email === emailCorreto &&
                senha === senhaCorreta
            ) {

                mensagem.textContent =
                    "Login realizado com sucesso!";

                mensagem.style.color =
                    "green";


                setTimeout(function() {

                    window.location.href =
                        "sistema.html";

                }, 800);


            } else {

                mensagem.textContent =
                    "E-mail ou senha incorretos.";

                mensagem.style.color =
                    "red";
            }

        }
    );

}


// ==========================================
// SAIR
// ==========================================

function sair() {

    window.location.href =
        "index.html";

}


// ==========================================
// CADASTRO DE CLIENTES
// ==========================================

const clienteForm =
    document.getElementById("clienteForm");


if (clienteForm) {

    clienteForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nome =
                document.getElementById(
                    "nomeCliente"
                ).value;

            const cpf =
                document.getElementById(
                    "cpfCliente"
                ).value;

            const telefone =
                document.getElementById(
                    "telefoneCliente"
                ).value;

            const email =
                document.getElementById(
                    "emailCliente"
                ).value;


            const tabela =
                document.getElementById(
                    "listaClientes"
                );


            const linha =
                tabela.insertRow();


            linha.innerHTML = `

                <td>${nome}</td>

                <td>${cpf}</td>

                <td>${telefone}</td>

                <td>${email}</td>

            `;


            alert(
                "Cliente cadastrado com sucesso!"
            );


            clienteForm.reset();

        }
    );

}


// ==========================================
// CADASTRO DE VEÍCULOS
// ==========================================

const veiculoForm =
    document.getElementById("veiculoForm");


if (veiculoForm) {

    veiculoForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const cliente =
                document.getElementById(
                    "clienteVeiculo"
                ).value;

            const placa =
                document.getElementById(
                    "placa"
                ).value;

            const marca =
                document.getElementById(
                    "marca"
                ).value;

            const modelo =
                document.getElementById(
                    "modelo"
                ).value;

            const ano =
                document.getElementById(
                    "ano"
                ).value;

            const cor =
                document.getElementById(
                    "cor"
                ).value;


            const tabela =
                document.getElementById(
                    "listaVeiculos"
                );


            const linha =
                tabela.insertRow();


            linha.innerHTML = `

                <td>${cliente}</td>

                <td>${placa}</td>

                <td>${marca}</td>

                <td>${modelo}</td>

                <td>${ano}</td>

                <td>${cor}</td>

            `;


            alert(
                "Veículo cadastrado com sucesso!"
            );


            veiculoForm.reset();

        }
    );

}


// ==========================================
// SERVIÇOS
// ==========================================

const servicoForm =
    document.getElementById("servicoForm");


if (servicoForm) {

    servicoForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const cliente =
                document.getElementById(
                    "clienteServico"
                ).value;

            const veiculo =
                document.getElementById(
                    "veiculoServico"
                ).value;

            const problema =
                document.getElementById(
                    "problema"
                ).value;

            const solucao =
                document.getElementById(
                    "solucao"
                ).value;

            const valor =
                document.getElementById(
                    "valorServico"
                ).value;

            const status =
                document.getElementById(
                    "statusServico"
                ).value;


            const tabela =
                document.getElementById(
                    "listaServicos"
                );


            const linha =
                tabela.insertRow();


            linha.innerHTML = `

                <td>${cliente}</td>

                <td>${veiculo}</td>

                <td>${problema}</td>

                <td>${solucao}</td>

                <td>R$ ${valor}</td>

                <td>${status}</td>

            `;


            alert(
                "Serviço registrado com sucesso!"
            );


            servicoForm.reset();

        }
    );

}


// ==========================================
// PAGAMENTO
// ==========================================

const pagamentoForm =
    document.getElementById(
        "pagamentoForm"
    );


if (pagamentoForm) {

    pagamentoForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const cliente =
                document.getElementById(
                    "clientePagamento"
                ).value;

            const servico =
                document.getElementById(
                    "servicoPagamento"
                ).value;

            const valor =
                document.getElementById(
                    "valorPagamento"
                ).value;

            const forma =
                document.getElementById(
                    "formaPagamento"
                ).value;

            const data =
                document.getElementById(
                    "dataPagamento"
                ).value;


            const mensagem =
                document.getElementById(
                    "mensagemPagamento"
                );


            mensagem.innerHTML = `

                Pagamento registrado com sucesso!<br><br>

                <strong>Cliente:</strong>
                ${cliente}<br>

                <strong>Serviço:</strong>
                ${servico}<br>

                <strong>Valor:</strong>
                R$ ${valor}<br>

                <strong>Forma:</strong>
                ${forma}<br>

                <strong>Data:</strong>
                ${data}

            `;


            mensagem.style.background =
                "#d1e7dd";

            mensagem.style.color =
                "#0f5132";


            pagamentoForm.reset();

        }
    );

}