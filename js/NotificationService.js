export const showNotification = (mensaje, tipo = 'success') => {
    const container = document.getElementById('toastContainer');
    const id = `toast-${Date.now()}`; // ID único

    const html = /*template*/`
        <div id="${id}" class="toast align-items-center text-white bg-${tipo} border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-check-circle-fill me-2"></i> ${mensaje}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', html);
    const toastElement = document.getElementById(id);

    // Inicializar y mostrar con Bootstrap
    const toast = new bootstrap.Toast(toastElement, {
        delay: 3000, // Se desvanece solo en 3 segundos
        autohide: true
    });

    toast.show();

    // Limpiar el DOM después de que se oculte para no saturar de HTML vacío
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
};