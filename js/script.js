document.addEventListener("DOMContentLoaded", () => {
    const comentarioForm = document.getElementById("comentario-form");
    const comentariosLista = document.getElementById("comentarios-lista");

    if (!comentarioForm || !comentariosLista) return; // Evita errores si los elementos no existen en la página

    comentarioForm.addEventListener("submit", (event) => {
        event.preventDefault();
        agregarComentario();
    });

    cargarComentarios();

    function agregarComentario() {
        const comentarioInput = document.getElementById("comentario");
        const comentarioTexto = comentarioInput.value.trim();

        if (!comentarioTexto) return;

        const comentarioElemento = crearComentarioElemento(comentarioTexto);
        comentariosLista.appendChild(comentarioElemento);

        guardarComentario(comentarioTexto);
        comentarioInput.value = "";
    }

    function crearComentarioElemento(texto) {
        const nuevoComentario = document.createElement("li");
        nuevoComentario.classList.add("list-group-item", "mt-2", "border", "rounded", "p-2");
        nuevoComentario.textContent = `Usuario: ${texto}`;
        return nuevoComentario;
    }

    function guardarComentario(comentario) {
        const comentarios = obtenerComentarios();
        comentarios.push(comentario);
        localStorage.setItem("comentarios", JSON.stringify(comentarios));
    }

    function cargarComentarios() {
        const comentarios = obtenerComentarios();
        comentarios.forEach(comentario => {
            const comentarioElemento = crearComentarioElemento(comentario);
            comentariosLista.appendChild(comentarioElemento);
        });
    }

    function obtenerComentarios() {
        return JSON.parse(localStorage.getItem("comentarios")) || [];
    }
});
