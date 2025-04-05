document.addEventListener("DOMContentLoaded", () => {
    const comentarioForm = document.getElementById("comentario-form");
    const comentariosLista = document.getElementById("comentarios-lista");
    const correoInput = document.getElementById("correo");
    const comentarioInput = document.getElementById("comentario");
    const inicioLink = document.getElementById("navbarDropdown");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    // ======= Manejo de comentarios =======
    if (comentarioForm && comentariosLista) {
        comentarioForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const correo = correoInput?.value.trim();
            const comentario = comentarioInput?.value.trim();

            if (!correo || !comentario) return;

            const li = document.createElement("li");
            li.className = "list-group-item mt-2 border rounded p-2";
            li.innerHTML = `<strong>${correo}:</strong><br>${comentario}`;
            comentariosLista.appendChild(li);

            const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
            comentarios.push({ correo, comentario });
            localStorage.setItem("comentarios", JSON.stringify(comentarios));

            comentarioForm.reset();
        });

        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.forEach(({ correo, comentario }) => {
            const li = document.createElement("li");
            li.className = "list-group-item mt-2 border rounded p-2";
            li.innerHTML = `<strong>${correo}:</strong><br>${comentario}`;
            comentariosLista.appendChild(li);
        });
    }

    // ======= Manejo del dropdown en "Inicio" =======
    if (inicioLink) {
        inicioLink.setAttribute("href", "index.html");

        inicioLink.addEventListener("click", (e) => {
            if (!dropdownMenu.contains(e.target)) {
                window.location.href = "./index.html";
            }
        });

        if (dropdownMenu && !dropdownMenu.children.length) {
            [
                { nombre: "Tecnología", enlace: "tecnologia.html" },
                { nombre: "Historia", enlace: "historia.html" },
                { nombre: "Personajes", enlace: "personajes.html" }
            ].forEach(({ nombre, enlace }) => {
                const li = document.createElement("li");
                li.innerHTML = `<a class="dropdown-item" href="${enlace}">${nombre}</a>`;
                dropdownMenu.appendChild(li);
            });
        }
    }
});
