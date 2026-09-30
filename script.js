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
   CADASTRO
========================================================= */

const formCadastro =
    document.getElementById(
        "form-cadastro"
    );

const nomeInput =
    document.getElementById(
        "nome"
    );

const sobrenomeInput =
    document.getElementById(
        "sobrenome"
    );

const cpfInput =
    document.getElementById(
        "cpf"
    );

const nascimentoInput =
    document.getElementById(
        "data-nascimento"
    );

const emailInput =
    document.getElementById(
        "email"
    );

const telefoneInput =
    document.getElementById(
        "telefone"
    );

const mensagemCadastro =
    document.getElementById(
        "mensagem-cadastro"
    );

const cadastroSalvo =
    document.getElementById(
        "cadastro-salvo"
    );

const nomeCadastrado =
    document.getElementById(
        "nome-cadastrado"
    );

const emailCadastrado =
    document.getElementById(
        "email-cadastrado"
    );

const limparCadastro =
    document.getElementById(
        "limpar-cadastro"
    );


/* =========================================================
   GASTOS
========================================================= */

const formGasto =
    document.getElementById(
        "form-gasto"
    );

const descricaoInput =
    document.getElementById(
        "descricao"
    );

const categoriaInput =
    document.getElementById(
        "categoria"
    );

const diaInput =
    document.getElementById(
        "dia"
    );

const tipoInput =
    document.getElementById(
        "tipo"
    );

const valorInput =
    document.getElementById(
        "valor"
    );

const tabelaGastos =
    document.getElementById(
        "tabela-gastos"
    );

const tabelaVazia =
    document.getElementById(
        "tabela-vazia"
    );

const limparGastos =
    document.getElementById(
        "limpar-gastos"
    );


/* =========================================================
   INÍCIO
========================================================= */

const saldoDestaque =
    document.getElementById(
        "saldo-destaque"
    );

const receitasDestaque =
    document.getElementById(
        "receitas-destaque"
    );

const despesasDestaque =
    document.getElementById(
        "despesas-destaque"
    );


/* =========================================================
   RESULTADO
========================================================= */

const dinheiroInput =
    document.getElementById(
        "dinheiro-disponivel"
    );

const valorTenho =
    document.getElementById(
        "valor-tenho"
    );

const valorGasto =
    document.getElementById(
        "valor-gasto"
    );

const valorRestante =
    document.getElementById(
        "valor-restante"
    );

const labelRestante =
    document.getElementById(
        "label-restante"
    );

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
            localStorage.getItem(
                chave
            );


        if (!valor) {

            return valorPadrao;
        }


        return JSON.parse(
            valor
        );

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

    return Number(
        valor
    ).toLocaleString(
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
        cpf.replace(
            /\D/g,
            ""
        );


    if (
        numeros.length !== 11 ||
        /^(\d)\1+$/.test(
            numeros
        )
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
            Number(
                numeros[i]
            ) *
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
        Number(
            numeros[9]
        )
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
            Number(
                numeros[i]
            ) *
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
        Number(
            numeros[10]
        )
    );
}


/* =========================================================
   TELEFONE
========================================================= */

function formatarTelefone(
    valor
) {

    const numeros =
        valor
            .replace(
                /\D/g,
                ""
            )
            .slice(
                0,
                11
            );


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
