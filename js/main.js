import { TaskManager } from './TaskManager.js'
import { TaskStatus } from './Task.js'
import TaskModal from './TaskModal.js'
import TaskRenderer from './TaskRenderer.js'



const taskMan = new TaskManager()
const btnAddTask = document.getElementById("btnAddTask")


const onSave = (formData) => {
    const newTask = taskMan.addTask(formData.taskTitle, formData.taskDesc);
    // 2. Renderiza una Card de tarea en el contenedor de tareas creadas. Invoca el método estático 'createCard' 
    // para generar el HTML y lo inserta en el DOM mediante 'renderTo' usando el ID del contenedor
    TaskRenderer.renderTo("createdPool", TaskRenderer.createCard(newTask, false));
}

const taskModal = new TaskModal(onSave)

btnAddTask.addEventListener("click", () => {
    // Instanciamos el modal pasandole la lógica de guardado
    taskModal.show()

})


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

