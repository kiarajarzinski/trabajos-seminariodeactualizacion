function generarMatrices() {
    const filas = parseInt(document.getElementById('filas').value);
    const columnas = parseInt(document.getElementById('columnas').value);
    const contenedorMatrices = document.getElementById('contenedor-matrices');

    contenedorMatrices.innerHTML = '';
    if (!filas || !columnas) return alert("Ingresa filas y columnas válidas");
}