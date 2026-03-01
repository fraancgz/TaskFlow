/**
 * Definición de estados de la tarea utilizando el patrón "Pseudo-Enum".
 * Freeze garntiza la inmutabilidad de las constntes y asegura que no se modifiquen por error 
 */
export const TaskStatus = Object.freeze({
    CREATED: 'created', // Estado inicial. En el pool de creadas
    PENDING: 'pending', // Estado intermedio. Tarea en curso en el pool de pendientes
    COMPLETED: 'completed' // Estado final: Tarea finalizada en el pool de finalizadas
});


export class Task {
    constructor(id, title, description, createdAt = new Date().toLocaleString()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = TaskStatus.CREATED; // Todas las tareas se crean en estado created
        this.createdAt = createdAt;
        this.completedAt = null
    }
}