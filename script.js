"use strict";


/* =========================================================
   CHAVES DO SISTEMA
========================================================= */

const CHAVE_CADASTRO = "granaFacilCadastro";
const CHAVE_GASTOS = "granaFacilGastos";
const CHAVE_DINHEIRO = "granaFacilDinheiro";


/* =========================================================
   CADASTRO
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
   GASTOS
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
   INÍCIO
========================================================= */

const saldoDestaque =
    document.getElementById("saldo-destaque");

const receitasDestaque =
    document.getElementById("receitas-destaque");

const despesasDestaque =
    document.getElementById("despesas-destaque");


/* =========================================================
   RESULTADO
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
    document.getElementById(
        "resultado-restante-card"
    );

const mensagemResultado =
    document.getElementById(
        "mensagem-resultado"
    );

const iconeResultado =
    document.getElementById(
        "icone-resultado"
    );

const tituloResultado =
    document.getElementById(
        "titulo-resultado"
    );

const textoResultado =
    document.getElementById(
        "texto-resultado"
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


    if (primeiroDigito === 10) {
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


    if (segundoDigito === 10) {
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


    if (numeros.length <= 10) {

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

        if (
            !confirm(
                "Deseja apagar o cadastro?"
            )
        ) {
            return;
        }


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
   CATEGORIA
========================================================= */

function iconeCategoria(
    categoria
) {

    const icones = {

        "Alimentação": "🍔",
        "Transporte": "🚌",
        "Casa": "🏠",
        "Saúde": "🩺",
        "Educação": "📚",
        "Lazer": "🎮",
        "Salário": "💼",
        "Outros": "📦"

    };


    return (
        icones[categoria] ||
        "📦"
    );
}


/* =========================================================
   ADICIONAR LANÇAMENTO
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


        if (!descricao) {

            descricaoInput.focus();

            return;
        }


        if (
            !Number.isFinite(valor) ||
            valor <= 0
        ) {

            alert(
                "Digite um valor maior que zero."
            );

            valorInput.focus();

            return;
        }


        const novoGasto = {

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
            novoGasto
        );


        salvarJSON(
            CHAVE_GASTOS,
            gastos
        );


        formGasto.reset();


        tipoInput.value =
            "despesa";


        atualizarTudo();

    }
);


/* =========================================================
   MOSTRAR TABELA
========================================================= */

function mostrarTabela() {

    tabelaGastos.innerHTML = "";


    if (gastos.length === 0) {

        tabelaVazia.style.display =
            "block";

        return;
    }


    tabelaVazia.style.display =
        "none";


    gastos.forEach(
        function (item) {

            const linha =
                document.createElement(
                    "tr"
                );


            /* DESCRIÇÃO */

            const tdDescricao =
                document.createElement(
                    "td"
                );


            const descricao =
                document.createElement(
                    "strong"
                );


            descricao.textContent =
                item.descricao;


            tdDescricao.appendChild(
                descricao
            );


            /* CATEGORIA */

            const tdCategoria =
                document.createElement(
                    "td"
                );


            tdCategoria.textContent =
                `${iconeCategoria(item.categoria)} ${item.categoria}`;


            /* DIA */

            const tdDia =
                document.createElement(
                    "td"
                );


            tdDia.textContent =
                item.dia;


            /* TIPO */

            const tdTipo =
                document.createElement(
                    "td"
                );


            const tipo =
                document.createElement(
                    "span"
                );


            tipo.className =
                `tipo ${item.tipo}`;


            tipo.textContent =
                item.tipo === "receita"
                    ? "Receita"
                    : "Despesa";


            tdTipo.appendChild(
                tipo
            );


            /* VALOR */

            const tdValor =
                document.createElement(
                    "td"
                );


            const valor =
                document.createElement(
                    "strong"
                );


            valor.className =
                item.tipo === "receita"
                    ? "valor-positivo"
                    : "valor-negativo";


            valor.textContent =
                `${item.tipo === "receita" ? "+" : "-"} ${moeda(item.valor)}`;


            tdValor.appendChild(
                valor
            );


            /* AÇÃO */

            const tdAcao =
                document.createElement(
                    "td"
                );


            const botao =
                document.createElement(
                    "button"
                );


            botao.type =
                "button";


            botao.className =
                "botao-excluir";


            botao.textContent =
                "Excluir";


            botao.addEventListener(
                "click",
                function () {

                    excluirGasto(
                        item.id
                    );

                }
            );


            tdAcao.appendChild(
                botao
            );


            linha.append(
                tdDescricao,
                tdCategoria,
                tdDia,
                tdTipo,
                tdValor,
                tdAcao
            );


            tabelaGastos.appendChild(
                linha
            );

        }
    );
}


/* =========================================================
   EXCLUIR UM LANÇAMENTO
========================================================= */

function excluirGasto(id) {

    if (
        !confirm(
            "Deseja excluir este lançamento?"
        )
    ) {
        return;
    }


    gastos =
        gastos.filter(
            function (item) {

                return item.id !== id;

            }
        );


    salvarJSON(
        CHAVE_GASTOS,
        gastos
    );


    atualizarTudo();
}


/* =========================================================
   LIMPAR TODOS
========================================================= */

limparGastos.addEventListener(
    "click",
    function () {

        if (gastos.length === 0) {
            return;
        }


        if (
            !confirm(
                "Deseja apagar todos os lançamentos?"
            )
        ) {
            return;
        }


        gastos = [];


        salvarJSON(
            CHAVE_GASTOS,
            gastos
        );


        atualizarTudo();

    }
);


/* =========================================================
   CALCULAR TOTAIS
========================================================= */

function calcularTotais() {

    let receitas = 0;
    let despesas = 0;


    gastos.forEach(
        function (item) {

            if (
                item.tipo === "receita"
            ) {

                receitas +=
                    Number(item.valor);

            } else {

                despesas +=
                    Number(item.valor);

            }

        }
    );


    return {
        receitas,
        despesas,
        saldo:
            receitas - despesas
    };
}


/* =========================================================
   ATUALIZAR INÍCIO
========================================================= */

function atualizarInicio() {

    const totais =
        calcularTotais();


    receitasDestaque.textContent =
        moeda(
            totais.receitas
        );


    despesasDestaque.textContent =
        moeda(
            totais.despesas
        );


    saldoDestaque.textContent =
        moeda(
            totais.saldo
        );

}


/* =========================================================
   ATUALIZAR RESULTADO
========================================================= */

function atualizarResultado() {

    const totais =
        calcularTotais();


    const totalGasto =
        totais.despesas;


    const restante =
        dinheiroDisponivel -
        totalGasto;


    /* VALORES */

    valorTenho.textContent =
        moeda(
            dinheiroDisponivel
        );


    valorGasto.textContent =
        moeda(
            totalGasto
        );


    valorRestante.textContent =
        moeda(
            restante
        );


    /* LIMPA CORES */

    valorRestante.classList.remove(
        "valor-positivo",
        "valor-negativo"
    );


    resultadoRestanteCard.classList.remove(
        "resultado-negativo"
    );


    /* RESULTADO POSITIVO */

    if (restante >= 0) {

        labelRestante.textContent =
            "💵 Vai sobrar";


        valorRestante.classList.add(
            "valor-positivo"
        );


        mensagemResultado.className =
            "mensagem-resultado positivo";


        iconeResultado.textContent =
            "✅";


        tituloResultado.textContent =
            "Dinheiro suficiente";


        textoResultado.textContent =
            `Depois dos gastos, você terá ${moeda(restante)} disponíveis.`;

    }


    /* RESULTADO NEGATIVO */

    else {

        labelRestante.textContent =
            "⚠️ Falta após os gastos";


        valorRestante.classList.add(
            "valor-negativo"
        );


        resultadoRestanteCard.classList.add(
            "resultado-negativo"
        );


        mensagemResultado.className =
            "mensagem-resultado negativo";


        iconeResultado.textContent =
            "⚠️";


        tituloResultado.textContent =
            "Atenção aos gastos";


        textoResultado.textContent =
            `Seus gastos ultrapassam o dinheiro disponível em ${moeda(Math.abs(restante))}.`;

    }


    /* SEM GASTOS */

    if (
        gastos.length === 0
    ) {

        mensagemResultado.className =
            "mensagem-resultado neutro";


        iconeResultado.textContent =
            "📊";


        tituloResultado.textContent =
            "Comece a registrar seus gastos";


        textoResultado.textContent =
            "Adicione suas movimentações para acompanhar seu resultado.";

    }

}


/* =========================================================
   SALVAR DINHEIRO DISPONÍVEL
========================================================= */

dinheiroInput.value =
    dinheiroDisponivel || "";


dinheiroInput.addEventListener(
    "input",
    function () {

        const valor =
            Number(
                dinheiroInput.value
            );


        if (
            Number.isFinite(valor) &&
            valor >= 0
        ) {

            dinheiroDisponivel =
                valor;

        } else {

            dinheiroDisponivel =
                0;

        }


        localStorage.setItem(
            CHAVE_DINHEIRO,
            String(
                dinheiroDisponivel
            )
        );


        atualizarResultado();

    }
);


/* =========================================================
   ATUALIZAR TUDO
========================================================= */

function atualizarTudo() {

    mostrarTabela();

    atualizarInicio();

    atualizarResultado();

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

preencherCadastro();

mostrarCadastro();

atualizarTudo();