document.addEventListener("DOMContentLoaded", function () {
    const comentarioForm = document.getElementById("comentario-form");
    const comentariosLista = document.getElementById("comentarios-lista");

    // Verifica que el formulario existe en la página antes de agregar eventos
    if (comentarioForm && comentariosLista) {
        comentarioForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita que la página se recargue al enviar el formulario

            const comentarioInput = document.getElementById("comentario");
            const comentarioTexto = comentarioInput.value.trim(); // Obtiene el texto y elimina espacios innecesarios

            if (comentarioTexto !== "") {
                // Crear un nuevo elemento de lista para el comentario
                const nuevoComentario = document.createElement("li");
                nuevoComentario.classList.add("list-group-item", "mt-2", "border", "rounded", "p-2");
                nuevoComentario.innerHTML = `<strong>Usuario:</strong> ${comentarioTexto}`;

                // Agregar el comentario a la lista
                comentariosLista.appendChild(nuevoComentario);

                // Guardar en el almacenamiento local para que persista en la recarga
                guardarComentario(comentarioTexto);

                // Limpiar el campo de texto
                comentarioInput.value = "";
            }
        });

        // Cargar comentarios almacenados al cargar la página
        cargarComentarios();
    }

    // Función para guardar comentarios en localStorage
    function guardarComentario(comentario) {
        let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.push(comentario);
        localStorage.setItem("comentarios", JSON.stringify(comentarios));
    }

    // Función para cargar comentarios almacenados
    function cargarComentarios() {
        let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.forEach(comentario => {
            const comentarioGuardado = document.createElement("li");
            comentarioGuardado.classList.add("list-group-item", "mt-2", "border", "rounded", "p-2");
            comentarioGuardado.innerHTML = `<strong>Usuario:</strong> ${comentario}`;
            comentariosLista.appendChild(comentarioGuardado);
        });
    }
});
