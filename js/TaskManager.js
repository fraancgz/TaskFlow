import { Task, TaskStatus } from "./Task.js";

export class TaskManager {
    constructor() {
        // Arreglo que almacenará cada una de las tareas
        this.tasks = []
    }

    /*
    ** Crea una instancia de Task y la guarda en el arreglo de Tasks
}   */
    addTask(title, description) {
        // Genera el id único con date.now
        const id = Date.now()

        // Crea un objeto de tarea y se le asignan los argumentos id, title y descrition 
        const newTask = new Task(id, title, description)

        // Inserto la tarea creada al arreglo de tareas
        this.tasks.push(newTask)

        return newTask
    }

    /*
    ** Accedo al arreglo de tareas y le asigno un nuevo arreglo con todas las tareas excepto la que coincida con el id
    */
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    /*
    ** Actualiza la descripción de una tarea por su ID.
    ** Aplica el principio de inmutabilidad: no muta el arreglo original, 
    ** sino que genera uno nuevo con la instancia de la tarea actualizada.
    */
    updateTaskDescription(id, newDescription) {
        // Mapeamos el arreglo para proyectar el cambio sin alterar el original
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                // Retorna una nueva instancia de la tarea con la descripción actualizada
                return { ...task, "description": newDescription }
            }
            return task
        })
    }

    /*
    ** Actualiza el estado de una tarea por ID.
    ** Si el estado es COMPLETED, registra la fecha de finalización.
    ** Se utiliza un retorno implícito (sin llaves) y un operador ternario 
    ** para mantener la lógica concisa y puramente inmutable.
    */
    updateTaskStatus(id, newStatus) {
        // Si el status no existe en mis reglas, me salgo y no hago nada
        if (!Object.values(TaskStatus).includes(newStatus)) return;

        this.tasks = this.tasks.map(task =>
            task.id === id ?
                {
                    ...task,
                    status: newStatus,
                    completedAt: (newStatus === TaskStatus.COMPLETED) ? new Date().toLocaleString() : null
                } : task
        );
    }

    /*
    ** Funcion que devuelve el arreglo de tareas filtrado por el status
    */
    getTaskByStatus(status) {
        return this.tasks.filter(task => task.status === status)
    }
}
