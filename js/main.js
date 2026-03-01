import { TaskManager } from './TaskManager.js'
import { TaskStatus } from './Task.js'

const taskMan = new TaskManager()

const tarea = taskMan.addTask("Hacer cama", "Hacer la cama una vez tome desayuno y me bañe")
if (tarea.title !== undefined){
    console.log(taskMan.updateTaskDescription(tarea.id, "nueva descripcion"))
    console.log(taskMan.updateTaskStatus(tarea.id, TaskStatus.COMPLETED))
} else {
    console.log("El titulo o la descripción no están definidos")
}