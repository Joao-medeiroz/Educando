const campoBusca = document.getElementById("campoBusca");
const filtroCategoria = document.getElementById("filtroCategoria");

const cards = document.querySelectorAll(".curso-card");

const contador = document.getElementById("contador");
const semResultado = document.getElementById("semResultado");


function filtrarCursos() {

    const texto =
        campoBusca.value
            .toLowerCase()
            .trim();

    const categoria =
        filtroCategoria.value;

    let encontrados = 0;


    cards.forEach(card => {

        const nome =
            card.dataset.nome
                .toLowerCase();

        const categoriaCard =
            card.dataset.categoria;


        const correspondeTexto =
            nome.includes(texto);

        const correspondeCategoria =
            categoria === "todos" ||
            categoriaCard === categoria;


        if (
            correspondeTexto &&
            correspondeCategoria
        ) {

            card.style.display = "block";

            encontrados++;

        } else {

            card.style.display = "none";

        }

    });


    contador.textContent =
        `${encontrados} oportunidade${encontrados !== 1 ? "s" : ""}`;


    semResultado.style.display =
        encontrados === 0
            ? "block"
            : "none";
}


campoBusca.addEventListener(
    "input",
    filtrarCursos
);

filtroCategoria.addEventListener(
    "change",
    filtrarCursos
);


/* Recebe pesquisa enviada pela Home */

const buscaAnterior =
    localStorage.getItem(
        "buscaOportunidade"
    );

if (buscaAnterior) {

    campoBusca.value = buscaAnterior;

    localStorage.removeItem(
        "buscaOportunidade"
    );

    filtrarCursos();
}
