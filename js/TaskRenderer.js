export default class TaskRenderer {

    /**
    * Genera el HTML de una Card de tarea (Task).
    * Al ser un método estático, se puede invocar directamente desde la clase sin instanciarla.
    **@param {Object} task - Objeto con la información de la tarea (id, title, desc).
    * @param {boolean} [isMini=false] - Define si la tarjeta se renderiza en formato compacto.
    * @returns {string} String con la estructura HTML de la tarjeta (Template Literal).
    */
    static createCard(task, isMini = false) {
        
        const fontSizeClass = isMini ? 'small' : 'fs-6';
        const miniClass = isMini ? 'p-2 small-card' : 'p-3';
        const showDesc = isMini ? 'd-none' : 'd-block';

        return /*template*/`
        <div class="card shadow-sm mb-2 ${miniClass} task-card data-id="${task.id}">
            <div class="card-body p-0 d-flex align-items-center justify-content-between">
                <div class="flex-grow-1">
                    <h5 class="card-title ${fontSizeClass} fw-bold mb-0 text-truncate">${task.title}</h5>
                    <p class="card-text text-muted mb-0 ${showDesc} task-description">
                        ${task.description || 'Sin descripción'}
                    </p>
                </div>
                <button class="btn btn-outline-danger btn-lg border-0 btn-delete ms-2">
                    &times;
                </button>
            </div>
        </div>
    `;
    }

    /**
    * Renderiza contenido HTML dentro de un contenedor específico del DOM.
    * Utiliza 'insertAdjacentHTML' para preservar los elementos y eventos existentes.
    **@param {string} containerId - El ID del elemento HTML donde se insertará el contenido.
    * @param {string} html - La cadena de texto HTML que se desea renderizar.
    * @throws {TypeError} Si el contenedor no existe en el documento.
    */
    static renderTo(containerId, html) {
        const container = document.getElementById(containerId);
        container ? container.insertAdjacentHTML('beforeend', html) : console.error(`Error: No se encontró el contenedor con ID "${containerId}"`);
    }
}