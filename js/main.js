import { TaskManager } from './TaskManager.js'
import { TaskStatus } from './Task.js'

const taskMan = new TaskManager()

const btnAddTask = document.getElementById("btnAddTask")
const createdPool = document.getElementById("createdPool")

btnAddTask.addEventListener("click", () => {
    const tarea = taskMan.addTask("Hacer cama", "Hacer la cama una vez tome desayuno y me bañe")

    createdPool.insertAdjacentHTML('beforeend',createCard(tarea, false))
})


const createCard = (task, isMini = false) => {
    const paddingClass = isMini ? 'p-2' : 'p-3';
    const fontSizeClass = isMini ? 'small' : 'fs-6';

    return `
    <div class="card shadow-sm w-100 mb-3 ${paddingClass}" data-id="${task.id}">
        <div class="card-body p-0 d-flex align-items-center justify-content-between">
            
            <div class="flex-grow-1">
                <h5 class="card-title ${fontSizeClass} fw-bold m-0 text-truncate">
                    ${task.title}
                </h5>
                ${!isMini ? `<p class="card-text small text-muted m-0">${task.description}</p>` : ""}
            </div>

            <button class="btn btn-outline-danger btn-lg border-0 btn-delete ms-2">
                &times;
            </button>
        </div>
    </div>
    `;
}


// Función para mover o eliminar tareas
const handleTaskClick = (e) => {
    const card = e.target.closest('.card');
    if (!card) return;

    const taskId = card.getAttribute('data-id');

    // Lógica para eliminar una tarea
    if (e.target.classList.contains('btn-delete')) {
        taskMan.deleteTask(taskId);
        card.remove();
        return;
    }

    // Lógica para mover las tareas de creada a enproceso, y de enproceso a finalizada
    const currentPoolId = card.parentElement.id;
    let nextPool;

    if (currentPoolId === "createdPool") {
        nextPool = document.getElementById("inProcesPool");
        taskMan.updateTaskStatus(taskId, TaskStatus.PENDING);
    } else if (currentPoolId === "inProcesPool") {
        nextPool = document.getElementById("finishedPool");
        taskMan.updateTaskStatus(taskId, TaskStatus.COMPLETED);
    }

    // Si hay una siguiente columna, usamos appendChild (porque la card YA es un objeto)
    if (nextPool) {
        nextPool.appendChild(card);
    }
};

// Asignamos el mismo escuchador a todos los pools
[createdPool, inProcesPool, finishedPool].forEach(pool => {
    pool.addEventListener("click", handleTaskClick);
});

