document.addEventListener("DOMContentLoaded", () => {
    const comentarioForm = document.getElementById("comentario-form");
    const comentariosLista = document.getElementById("comentarios-lista");

    // Manejo de comentarios
    if (comentarioForm && comentariosLista) {
        comentarioForm.addEventListener("submit", (event) => {
            event.preventDefault();
            agregarComentario();
        });

        cargarComentarios();
    }

    // Lógica para el dropdown en "Inicio" y su enlace
    const inicioLink = document.getElementById("navbarDropdown");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (inicioLink) {
        inicioLink.setAttribute("href", "index.html"); // Asegurar que tenga el enlace

        // Detectar clic en "Inicio" para ir a index.html
        inicioLink.addEventListener("click", (event) => {
            if (!dropdownMenu.contains(event.target)) {
                window.location.href = "../index.html";
            }
        });

        // Agregar categorías al dropdown si no están
        if (dropdownMenu && dropdownMenu.children.length === 0) {
            const categorias = [
                { nombre: "Tecnología", enlace: "tecnologia.html" },
                { nombre: "Historia", enlace: "historia.html" },
                { nombre: "Personajes", enlace: "personajes.html" }
            ];

            categorias.forEach(categoria => {
                const dropdownItem = document.createElement("li");
                dropdownItem.innerHTML = `<a class="dropdown-item" href="${categoria.enlace}">${categoria.nombre}</a>`;
                dropdownMenu.appendChild(dropdownItem);
            });
        }
    }

    // Funciones de comentarios
    function agregarComentario() {
        const correoInput = document.getElementById("correo");
        const comentarioInput = document.getElementById("comentario");

        const correoTexto = correoInput.value.trim();
        const comentarioTexto = comentarioInput.value.trim();

        if (!correoTexto || !comentarioTexto) return;

        const comentarioElemento = crearComentarioElemento(correoTexto, comentarioTexto);
        comentariosLista.appendChild(comentarioElemento);

        guardarComentario(correoTexto, comentarioTexto);

        // Limpiar formulario
        comentarioForm.reset();
    }

    function crearComentarioElemento(correo, texto) {
        const nuevoComentario = document.createElement("li");
        nuevoComentario.classList.add("list-group-item", "mt-2", "border", "rounded", "p-2");

        nuevoComentario.innerHTML = `<strong>${correo}:</strong><br>${texto}`;
        return nuevoComentario;
    }

    function guardarComentario(correo, comentario) {
        const comentarios = obtenerComentarios();
        comentarios.push({ correo, comentario });
        localStorage.setItem("comentarios", JSON.stringify(comentarios));
    }

    function cargarComentarios() {
        const comentarios = obtenerComentarios();
        comentarios.forEach(({ correo, comentario }) => {
            const comentarioElemento = crearComentarioElemento(correo, comentario);
            comentariosLista.appendChild(comentarioElemento);
        });
    }

    function obtenerComentarios() {
        return JSON.parse(localStorage.getItem("comentarios")) || [];
    }
});
