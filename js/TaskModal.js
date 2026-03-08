import { showNotification } from './NotificationService.js'

const MODAL_TEMPLATE = /*template*/`
<div class="modal fade" id="modalAddTask" tabindex="-1" aria-labelledby="modalAddTaskLabel">
    <div class="modal-dialog modal-dialog-centered">
        <form id="formAddTask" class="modal-content shadow-lg border-0 needs-validation" novalidate>
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">Nueva Tarea</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
                <div class="mb-3">
                    <label class="form-label fw-bold" for="taskTitle">Título</label>
                    <input type="text" id="taskTitle" name="taskTitle" class="form-control" placeholder="¿Qué hay que hacer?" required minlength="5" pattern=".{5,}">
                    <div class="invalid-feedback">
                        El título es obligatorio.
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold" for="taskDesc">Descripción</label>
                    <textarea id="taskDesc" name="taskDesc" class="form-control no-resize" rows="3" placeholder="Detalles opcionales..."></textarea>
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" id="btnSaveTask" class="btn btn-primary px-4">Crear Tarea</button>
            </div>
        </form>
    </div>
</div>`;

export default class TaskModal {

    _form; // Declaración privada

    constructor(callback) {
        this.id = "modalAddTask";
        this.callback = callback;
        this._ensureModalExists();
        this.instance = bootstrap.Modal.getOrCreateInstance(document.getElementById(this.id));
        this._form = document.getElementById("formAddTask");
        this._bindEvents();
        this._setupDynamicValidation();

    }

    _bindEvents() {
        this._form.addEventListener("submit", (e) => {

            // Gestión de Eventos y UI
            e.preventDefault();
            e.stopPropagation();

            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }

            // Extracción y Limpieza Masiva
            const formData = new FormData(this._form);
            const cleanData = Object.fromEntries(
                [...formData.entries()].map(([key, value]) => [key, value.trim()])
            );

            // Desestructurar
            const { taskTitle, taskDesc } = cleanData;

            // Sincronizar datos limpios para la posterior validacion del formulario
            this._form.elements.taskTitle.value = taskTitle;
            this._form.elements.taskDesc.value = taskDesc;

            // Valida el input con los nuevos valores y agrega la clase al formulario.
            this._form.elements.taskTitle.checkValidity(); // Fuerza el motor de minlength/pattern

            // Esto ejecuta el código que tienes en _setupDynamicValidation
            this._form.elements.taskTitle.dispatchEvent(new Event('input'));

            this._form.classList.add('was-validated');

            if (!this._form.checkValidity()) {

                return; // Detiene la ejecución si el título limpio es inválido
            }

           // Simulación delay al crear tarea. Deshabilita el boton mientras termina el proceso
            const btnSave = this._form.querySelector('#btnSaveTask');
            btnSave.disabled = true;
            btnSave.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Creando...';

            setTimeout(() => {
                // Ejecuta el callback después del delay
                if (this.callback) {
                    this.callback(cleanData);
                }

                // muestra la notificación
                showNotification("¡Tarea creada con éxito!", "success");

                // Esconde el modal y limpia el reset con .reset()
                this.hide();

                // Reestable el botón para la próxima vez que se abra el modal
                setTimeout(() => {
                    btnSave.disabled = false;
                    btnSave.textContent = 'Crear Tarea';
                    this._form.reset();
                    this._form.classList.remove('was-validated');
                }, 300);

            }, 1500);
        });
    }

    _ensureModalExists() {
        // Si NO existe en el HTML, lo inyecta
        if (!document.getElementById(this.id)) {
            document.body.insertAdjacentHTML('beforeend', MODAL_TEMPLATE);
        }
    }

    /*
    * Configura la validación en tiempo real para el campo de título.
    * Escucha cada pulsación de tecla para actualizar los mensajes de error 
    * y el estado de validez del formulario antes de que el usuario haga submit.
    */
    _setupDynamicValidation() {
        const taskTitle = this._form.querySelector('#taskTitle');
        const feedback = taskTitle.nextElementSibling;

        taskTitle.addEventListener('input', () => {
            const valorLimpio = taskTitle.value.trim();
            const largoReal = valorLimpio.length;

            if (largoReal >= 5) {
                feedback.textContent = "";
                taskTitle.setCustomValidity(""); // ✅ Campo válido
            } else if (largoReal > 0) {
                feedback.textContent = `Mínimo 5 caracteres (llevas ${largoReal}).`;
                taskTitle.setCustomValidity("Demasiado corto"); // Invalida el form
            } else {
                feedback.textContent = "El título es obligatorio.";
                taskTitle.setCustomValidity("Obligatorio"); // Invalida el form
            }
        });
    }

    show() {
        this.instance.show();
    }

    hide() {
        this.instance.hide();
        this._form.classList.remove('was-validated'); // Limpia los bordes rojos al cerrar/esconder
    }


}