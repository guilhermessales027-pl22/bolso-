"use strict";


/* =========================================================
   CHAVES DO SISTEMA
========================================================= */

const CHAVE_CADASTRO =
    "granaFacilCadastro";

const CHAVE_GASTOS =
    "granaFacilGastos";

const CHAVE_DINHEIRO =
    "granaFacilDinheiro";


/* =========================================================
   ELEMENTOS - CADASTRO
========================================================= */

const formCadastro =
    document.getElementById("form-cadastro");

const nomeInput =
    document.getElementById("nome");

const sobrenomeInput =
    document.getElementById("sobrenome");

const cpfInput =
    document.getElementById("cpf");

const nascimentoInput =
    document.getElementById("data-nascimento");

const emailInput =
    document.getElementById("email");

const telefoneInput =
    document.getElementById("telefone");

const mensagemCadastro =
    document.getElementById("mensagem-cadastro");

const cadastroSalvo =
    document.getElementById("cadastro-salvo");

const nomeCadastrado =
    document.getElementById("nome-cadastrado");

const emailCadastrado =
    document.getElementById("email-cadastrado");

const limparCadastro =
    document.getElementById("limpar-cadastro");


/* =========================================================
   ELEMENTOS - GASTOS
========================================================= */

const formGasto =
    document.getElementById("form-gasto");

const descricaoInput =
    document.getElementById("descricao");

const categoriaInput =
    document.getElementById("categoria");

const diaInput =
    document.getElementById("dia");

const tipoInput =
    document.getElementById("tipo");

const valorInput =
    document.getElementById("valor");

const tabelaGastos =
    document.getElementById("tabela-gastos");

const tabelaVazia =
    document.getElementById("tabela-vazia");

const limparGastos =
    document.getElementById("limpar-gastos");


/* =========================================================
   ELEMENTOS - INÍCIO
========================================================= */

const saldoDestaque =
    document.getElementById("saldo-destaque");

const receitasDestaque =
    document.getElementById("receitas-destaque");

const despesasDestaque =
    document.getElementById("despesas-destaque");


/* =========================================================
   ELEMENTOS - RESULTADO
========================================================= */

const dinheiroInput =
    document.getElementById("dinheiro-disponivel");

const valorTenho =
    document.getElementById("valor-tenho");

const valorGasto =
    document.getElementById("valor-gasto");

const valorRestante =
    document.getElementById("valor-restante");

const labelRestante =
    document.getElementById("label-restante");

const resultadoRestanteCard =
    document.getElementById("resultado-restante-card");

const mensagemResultado =
    document.getElementById("mensagem-resultado");

const iconeResultado =
    document.getElementById("icone-resultado");

const tituloResultado =
    document.getElementById("titulo-resultado");

const textoResultado =
    document.getElementById("texto-resultado");


/* =========================================================
   ELEMENTO - INVESTIMENTOS
========================================================= */

const botaoInvestimentos =
    document.getElementById(
        "botao-investimentos"
    );


/* =========================================================
   DADOS
========================================================= */

let cadastro =
    carregarJSON(
        CHAVE_CADASTRO,
        null
    );


let gastos =
    carregarJSON(
        CHAVE_GASTOS,
        []
    );


let dinheiroDisponivel =
    Number(
        localStorage.getItem(
            CHAVE_DINHEIRO
        )
    ) || 0;


/* =========================================================
   LOCAL STORAGE
========================================================= */

function carregarJSON(
    chave,
    valorPadrao
) {

    try {

        const valor =
            localStorage.getItem(chave);


        if (!valor) {

            return valorPadrao;
        }


        return JSON.parse(valor);

    } catch (erro) {

        console.error(
            "Erro ao carregar dados:",
            erro
        );

        return valorPadrao;
    }
}


function salvarJSON(
    chave,
    valor
) {

    localStorage.setItem(
        chave,
        JSON.stringify(valor)
    );
}


/* =========================================================
   MOEDA
========================================================= */

function moeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


/* =========================================================
   CPF
========================================================= */

function formatarCPF(valor) {

    return valor
        .replace(/\D/g, "")
        .slice(0, 11)
        .replace(
            /(\d{3})(\d)/,
            "$1.$2"
        )
        .replace(
            /(\d{3})(\d)/,
            "$1.$2"
        )
        .replace(
            /(\d{3})(\d{1,2})$/,
            "$1-$2"
        );
}


function validarCPF(cpf) {

    const numeros =
        cpf.replace(/\D/g, "");


    if (
        numeros.length !== 11 ||
        /^(\d)\1+$/.test(numeros)
    ) {

        return false;
    }


    let soma = 0;


    for (
        let i = 0;
        i < 9;
        i++
    ) {

        soma +=
            Number(numeros[i]) *
            (10 - i);
    }


    let primeiroDigito =
        (soma * 10) % 11;


    if (
        primeiroDigito === 10
    ) {

        primeiroDigito = 0;
    }


    if (
        primeiroDigito !==
        Number(numeros[9])
    ) {

        return false;
    }


    soma = 0;


    for (
        let i = 0;
        i < 10;
        i++
    ) {

        soma +=
            Number(numeros[i]) *
            (11 - i);
    }


    let segundoDigito =
        (soma * 10) % 11;


    if (
        segundoDigito === 10
    ) {

        segundoDigito = 0;
    }


    return (
        segundoDigito ===
        Number(numeros[10])
    );
}


/* =========================================================
   TELEFONE
========================================================= */

function formatarTelefone(valor) {

    const numeros =
        valor
            .replace(/\D/g, "")
            .slice(0, 11);


    if (
        numeros.length <= 10
    ) {

        return numeros
            .replace(
                /(\d{2})(\d)/,
                "($1) $2"
            )
            .replace(
                /(\d{4})(\d)/,
                "$1-$2"
            );
    }


    return numeros
        .replace(
            /(\d{2})(\d)/,
            "($1) $2"
        )
        .replace(
            /(\d{5})(\d)/,
            "$1-$2"
        );
}


/* =========================================================
   MENSAGEM DO CADASTRO
========================================================= */

function mensagemCadastroTexto(
    texto,
    tipo
) {

    mensagemCadastro.textContent =
        texto;

    mensagemCadastro.className =
        `mensagem ${tipo}`;
}


/* =========================================================
   MÁSCARAS
========================================================= */

cpfInput.addEventListener(
    "input",
    function () {

        this.value =
            formatarCPF(
                this.value
            );
    }
);


telefoneInput.addEventListener(
    "input",
    function () {

        this.value =
            formatarTelefone(
                this.value
            );
    }
);


/* =========================================================
   SALVAR CADASTRO
========================================================= */

formCadastro.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        if (
            !validarCPF(
                cpfInput.value
            )
        ) {

            mensagemCadastroTexto(
                "CPF inválido. Verifique os números.",
                "erro"
            );

            cpfInput.focus();

            return;
        }


        cadastro = {

            nome:
                nomeInput.value.trim(),

            sobrenome:
                sobrenomeInput.value.trim(),

            cpf:
                cpfInput.value,

            dataNascimento:
                nascimentoInput.value,

            email:
                emailInput.value.trim(),

            telefone:
                telefoneInput.value

        };


        salvarJSON(
            CHAVE_CADASTRO,
            cadastro
        );


        mostrarCadastro();


        mensagemCadastroTexto(
            "Cadastro salvo com sucesso!",
            "sucesso"
        );

    }
);


/* =========================================================
   MOSTRAR CADASTRO
========================================================= */

function mostrarCadastro() {

    if (!cadastro) {

        cadastroSalvo.classList.add(
            "oculto"
        );

        return;
    }


    nomeCadastrado.textContent =
        `${cadastro.nome} ${cadastro.sobrenome}`;


    emailCadastrado.textContent =
        `${cadastro.email} • ${cadastro.telefone}`;


    cadastroSalvo.classList.remove(
        "oculto"
    );
}


/* =========================================================
   PREENCHER CADASTRO
========================================================= */

function preencherCadastro() {

    if (!cadastro) {

        return;
    }


    nomeInput.value =
        cadastro.nome || "";


    sobrenomeInput.value =
        cadastro.sobrenome || "";


    cpfInput.value =
        cadastro.cpf || "";


    nascimentoInput.value =
        cadastro.dataNascimento || "";


    emailInput.value =
        cadastro.email || "";


    telefoneInput.value =
        cadastro.telefone || "";
}


/* =========================================================
   LIMPAR CADASTRO
========================================================= */

limparCadastro.addEventListener(
    "click",
    function () {

        cadastro = null;

        localStorage.removeItem(
            CHAVE_CADASTRO
        );

        formCadastro.reset();

        cadastroSalvo.classList.add(
            "oculto"
        );

        mensagemCadastroTexto(
            "Cadastro removido.",
            "sucesso"
        );

    }
);


/* =========================================================
   ADICIONAR GASTO / RECEITA
========================================================= */

formGasto.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const descricao =
            descricaoInput.value.trim();


        const valor =
            Number(
                valorInput.value
            );


        if (
            !descricao ||
            !valor ||
            valor <= 0
        ) {

            return;
        }


        const movimentacao = {

            id:
                Date.now(),

            descricao:
                descricao,

            categoria:
                categoriaInput.value,

            dia:
                diaInput.value,

            tipo:
                tipoInput.value,

            valor:
                valor

        };


        gastos.push(
            movimentacao
        );


        salvarJSON(
            CHAVE_GASTOS,
            gastos
        );


        formGasto.reset();


        renderizarGastos();

        atualizarResumo();

    }
);


/* =========================================================
   RENDERIZAR GASTOS
========================================================= */

function renderizarGastos() {

    tabelaGastos.innerHTML = "";


    if (
        gastos.length === 0
    ) {

        tabelaVazia.style.display =
            "block";

        return;
    }


    tabelaVazia.style.display =
        "none";


    gastos.forEach(
        function (gasto) {

            const tr =
                document.createElement(
                    "tr"
                );


            const tdDescricao =
                document.createElement(
                    "td"
                );

            tdDescricao.textContent =
                gasto.descricao;


            const tdCategoria =
                document.createElement(
                    "td"
                );

            tdCategoria.textContent =
                gasto.categoria;


            const tdDia =
                document.createElement(
                    "td"
                );

            tdDia.textContent =
                gasto.dia;


            const tdTipo =
                document.createElement(
                    "td"
                );


            const tipoSpan =
                document.createElement(
                    "span"
                );

            tipoSpan.className =
                `tipo ${gasto.tipo}`;

            tipoSpan.textContent =
                gasto.tipo === "receita"
                    ? "Receita"
                    : "Despesa";


            tdTipo.appendChild(
                tipoSpan
            );


            const tdValor =
                document.createElement(
                    "td"
                );

            tdValor.textContent =
                moeda(gasto.valor);

            tdValor.className =
                gasto.tipo === "receita"
                    ? "valor-positivo"
                    : "valor-negativo";


            const tdAcao =
                document.createElement(
                    "td"
                );


            const botaoExcluir =
                document.createElement(
                    "button"
                );

            botaoExcluir.type =
                "button";

            botaoExcluir.className =
                "botao-excluir";

            botaoExcluir.textContent =
                "Excluir";


            botaoExcluir.addEventListener(
                "click",
                function () {

                    excluirGasto(
                        gasto.id
                    );

                }
            );


            tdAcao.appendChild(
                botaoExcluir
            );


            tr.appendChild(
                tdDescricao
            );

            tr.appendChild(
                tdCategoria
            );

            tr.appendChild(
                tdDia
            );

            tr.appendChild(
                tdTipo
            );

            tr.appendChild(
                tdValor
            );

            tr.appendChild(
                tdAcao
            );


            tabelaGastos.appendChild(
                tr
            );

        }
    );
}


/* =========================================================
   EXCLUIR GASTO
========================================================= */

function excluirGasto(id) {

    gastos =
        gastos.filter(
            function (gasto) {

                return gasto.id !== id;

            }
        );


    salvarJSON(
        CHAVE_GASTOS,
        gastos
    );


    renderizarGastos();

    atualizarResumo();

}


/* =========================================================
   LIMPAR TODOS OS GASTOS
========================================================= */

limparGastos.addEventListener(
    "click",
    function () {

        if (
            gastos.length === 0
        ) {

            return;
        }


        const confirmar =
            confirm(
                "Tem certeza que deseja apagar todos os lançamentos?"
            );


        if (!confirmar) {

            return;
        }


        gastos = [];


        salvarJSON(
            CHAVE_GASTOS,
            gastos
        );


        renderizarGastos();

        atualizarResumo();

    }
);


/* =========================================================
   CALCULAR RESUMO
========================================================= */

function calcularResumo() {

    let receitas = 0;

    let despesas = 0;


    gastos.forEach(
        function (gasto) {

            if (
                gasto.tipo === "receita"
            ) {

                receitas +=
                    Number(gasto.valor);

            } else {

                despesas +=
                    Number(gasto.valor);

            }

        }
    );


    const saldo =
        receitas - despesas;


    return {
        receitas,
        despesas,
        saldo
    };
}


/* =========================================================
   ATUALIZAR RESUMO DO TOPO
========================================================= */

function atualizarResumo() {

    const resumo =
        calcularResumo();


    receitasDestaque.textContent =
        moeda(resumo.receitas);


    despesasDestaque.textContent =
        moeda(resumo.despesas);


    saldoDestaque.textContent =
        moeda(resumo.saldo);


    atualizarResultado();

}


/* =========================================================
   DINHEIRO DISPONÍVEL
========================================================= */

dinheiroInput.value =
    dinheiroDisponivel || "";


dinheiroInput.addEventListener(
    "input",
    function () {

        dinheiroDisponivel =
            Number(
                this.value
            ) || 0;


        localStorage.setItem(
            CHAVE_DINHEIRO,
            dinheiroDisponivel
        );


        atualizarResultado();

    }
);


/* =========================================================
   ATUALIZAR RESULTADO
========================================================= */

function atualizarResultado() {

    const resumo =
        calcularResumo();


    const totalDespesas =
        resumo.despesas;


    const restante =
        dinheiroDisponivel -
        totalDespesas;


    valorTenho.textContent =
        moeda(dinheiroDisponivel);


    valorGasto.textContent =
        moeda(totalDespesas);


    valorRestante.textContent =
        moeda(
            Math.abs(restante)
        );


    if (
        restante >= 0
    ) {

        labelRestante.textContent =
            "💵 Vai sobrar";


        valorRestante.className =
            "valor-positivo";


        resultadoRestanteCard.style.borderColor =
            "#173f67";


        mensagemResultado.className =
            "mensagem-resultado positivo";


        iconeResultado.textContent =
            "💰";


        tituloResultado.textContent =
            "Seu dinheiro é suficiente";


        textoResultado.textContent =
            `Depois das despesas registradas, você terá ${moeda(restante)} disponíveis.`;

    } else {

        labelRestante.textContent =
            "⚠️ Vai faltar";


        valorRestante.className =
            "valor-negativo";


        resultadoRestanteCard.style.borderColor =
            "#ff4545";


        mensagemResultado.className =
            "mensagem-resultado negativo";


        iconeResultado.textContent =
            "⚠️";


        tituloResultado.textContent =
            "Atenção aos gastos";


        textoResultado.textContent =
            `As despesas ultrapassam o valor informado em ${moeda(Math.abs(restante))}.`;

    }

}


/* =========================================================
   ABRIR PÁGINA DE INVESTIMENTOS
========================================================= */

botaoInvestimentos.addEventListener(
    "click",
    function () {

        abrirPaginaInvestimentos();

    }
);


/* =========================================================
   PÁGINA DE INVESTIMENTOS
========================================================= */

function abrirPaginaInvestimentos() {

    /*
       Abre uma nova aba sem precisar criar
       investimentos.html.
    */

    const novaAba =
        window.open(
            "",
            "_blank"
        );


    if (!novaAba) {

        alert(
            "O navegador bloqueou a nova aba. Permita pop-ups para este site e tente novamente."
        );

        return;
    }


    novaAba.document.open();


    novaAba.document.write(`

<!DOCTYPE html>

<html lang="pt-BR">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Bolso+ | Onde investir
    </title>


    <style>

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }


        body {

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            color: #1f2937;

            background: #f4f6f8;

            line-height: 1.6;
        }


        .topo {

            padding: 70px 20px;

            text-align: center;

            color: white;

            background:
                linear-gradient(
                    135deg,
                    #102a43,
                    #173f67
                );
        }


        .topo h1 {

            margin-bottom: 12px;

            font-size:
                clamp(32px, 5vw, 52px);
        }


        .topo p {

            max-width: 750px;

            margin: auto;

            color: #dbeafe;

            font-size: 18px;
        }


        .container {

            width: min(
                1100px,
                92%
            );

            margin: 45px auto;
        }


        .aviso {

            margin-bottom: 30px;

            padding: 20px;

            color: #334155;

            background: #ffffff;

            border: 1px solid #dfe5e9;

            border-radius: 15px;

            box-shadow:
                0 10px 30px
                rgba(
                    15,
                    23,
                    42,
                    0.07
                );
        }


        .aviso strong {

            color: #102a43;
        }


        .grid {

            display: grid;

            grid-template-columns:
                repeat(
                    3,
                    minmax(
                        0,
                        1fr
                    )
                );

            gap: 22px;
        }


        .card {

            padding: 28px;

            background: white;

            border: 1px solid #dfe5e9;

            border-radius: 18px;

            box-shadow:
                0 10px 30px
                rgba(
                    15,
                    23,
                    42,
                    0.07
                );

            transition:
                transform 0.2s,
                box-shadow 0.2s;
        }


        .card:hover {

            transform:
                translateY(-5px);

            box-shadow:
                0 18px 35px
                rgba(
                    15,
                    23,
                    42,
                    0.12
                );
        }


        .icone {

            display: flex;

            align-items: center;

            justify-content: center;

            width: 65px;

            height: 65px;

            margin-bottom: 18px;

            color: white;

            background: #173f67;

            border-radius: 16px;

            font-size: 30px;
        }


        .card h2 {

            margin-bottom: 8px;

            color: #102a43;

            font-size: 23px;
        }


        .card p {

            min-height: 75px;

            margin-bottom: 20px;

            color: #64748b;
        }


        .botao {

            display: inline-flex;

            align-items: center;

            justify-content: center;

            width: 100%;

            min-height: 46px;

            padding: 10px 18px;

            color: white;

            background: #173f67;

            border-radius: 9px;

            font-weight: 800;

            text-decoration: none;

            transition: 0.2s;
        }


        .botao:hover {

            background: #0f3152;
        }


        .voltar {

            display: block;

            width: fit-content;

            margin: 45px auto 0;

            padding: 13px 25px;

            color: #173f67;

            background: #e7eef6;

            border-radius: 10px;

            font-weight: 800;

            text-decoration: none;
        }


        .rodape {

            margin-top: 60px;

            padding: 35px 20px;

            text-align: center;

            color: #dbeafe;

            background: #102a43;
        }


        .rodape p {

            margin-bottom: 5px;
        }


        @media (max-width: 850px) {

            .grid {

                grid-template-columns:
                    repeat(
                        2,
                        minmax(
                            0,
                            1fr
                        )
                    );
            }

        }


        @media (max-width: 600px) {

            .grid {

                grid-template-columns:
                    1fr;
            }


            .topo {

                padding:
                    50px 20px;
            }


            .container {

                width: 94%;
            }

        }

    </style>

</head>


<body>


    <header class="topo">

        <h1>
            💰 Onde posso investir?
        </h1>

        <p>
            Algumas instituições financeiras possuem
            opções de investimentos. Pesquise as condições,
            taxas, riscos e produtos disponíveis antes de investir.
        </p>

    </header>


    <main class="container">


        <div class="aviso">

            <strong>
                📌 Importante:
            </strong>

            Esta página apresenta instituições onde você
            pode pesquisar investimentos. Ela não representa
            recomendação de investimento. As opções, taxas,
            rentabilidades e condições podem mudar.
            Verifique sempre as informações diretamente
            com a instituição financeira.


        </div>


        <div class="grid">


            <!-- BANCO DO BRASIL -->

            <article class="card">

                <div class="icone">
                    🏦
                </div>

                <h2>
                    Banco do Brasil
                </h2>

                <p>
                    Instituição bancária que oferece diferentes
                    produtos financeiros e opções de investimento
                    para seus clientes.
                </p>

                <a
                    class="botao"
                    href="https://www.bb.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visitar Banco do Brasil
                </a>

            </article>


            <!-- CAIXA -->

            <article class="card">

                <div class="icone">
                    🏛️
                </div>

                <h2>
                    Caixa Econômica Federal
                </h2>

                <p>
                    Banco que disponibiliza produtos financeiros
                    e diferentes alternativas de investimento
                    para seus clientes.
                </p>

                <a
                    class="botao"
                    href="https://www.caixa.gov.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visitar Caixa
                </a>

            </article>


            <!-- ITAÚ -->

            <article class="card">

                <div class="icone">
                    💳
                </div>

                <h2>
                    Itaú
                </h2>

                <p>
                    Banco que disponibiliza produtos de
                    investimento e serviços financeiros
                    para seus clientes.
                </p>

                <a
                    class="botao"
                    href="https://www.itau.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visitar Itaú
                </a>

            </article>


            <!-- BRADESCO -->

            <article class="card">

                <div class="icone">
                    💼
                </div>

                <h2>
                    Bradesco
                </h2>

                <p>
                    Instituição financeira que oferece serviços
                    bancários e diferentes produtos financeiros,
                    incluindo investimentos.
                </p>

                <a
                    class="botao"
                    href="https://banco.bradesco/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visitar Bradesco
                </a>

            </article>


            <!-- SANTANDER -->

            <article class="card">

                <div class="icone">
                    💰
                </div>

                <h2>
                    Santander
                </h2>

                <p>
                    Banco que oferece produtos financeiros e
                    alternativas de investimento para seus
                    clientes.
                </p>

                <a
                    class="botao"
                    href="https://www.santander.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visitar Santander
                </a>

            </article>


            <!-- NUBANK -->

            <article class="card">

                <div class="icone">
                    🟣
                </div>

                <h2>
                    Nubank
                </h2>

                <p>
                    Instituição financeira digital que oferece
                    produtos financeiros e opções relacionadas
                    a investimentos.
                </p>

                <a
                    class="botao"
                    href="https://nubank.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visitar Nubank
                </a>

            </article>


        </div>


        <a
            href="#"
            class="voltar"
            onclick="window.close(); return false;"
        >
            ← Voltar para o Bolso+
        </a>


    </main>


    <footer class="rodape">

        <p>
            💰 Bolso+ - Controle Financeiro
        </p>

        <p>
            Pesquise e compare as opções antes de investir.
        </p>

    </footer>


</body>

</html>

    `);


    novaAba.document.close();

}
    

/* =========================================================
   INICIALIZAÇÃO
========================================================= */

preencherCadastro();

mostrarCadastro();

renderizarGastos();

atualizarResumo();


limparCadastro.addEventListener(
    "click",
