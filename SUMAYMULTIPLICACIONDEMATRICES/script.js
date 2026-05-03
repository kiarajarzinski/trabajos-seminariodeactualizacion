function generarMatrices() {
    const filas = parseInt(document.getElementById('filas').value);
    const columnas = parseInt(document.getElementById('columnas').value);
    const contenedorMatrices = document.getElementById('contenedor-matrices');

    contenedorMatrices.innerHTML = '';
    if (!filas || !columnas) return alert("Ingresa filas y columnas válidas");

// Generamos matrices
    for (let m = 1; m <= 2; m++) {
        const div = document.createElement('div');
        div.innerHTML = `<h3>Matriz ${m === 1 ? 'A' : 'B'}</h3>`;
        const tabla = document.createElement('table');
        tabla.id = `matriz${m}`;

        for (let i = 0; i < filas; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < columnas; j++) {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.className = `m${m}-input`; 
                td.appendChild(input);
                tr.appendChild(td);
            }
            tabla.appendChild(tr);
        }
        div.appendChild(tabla);
        contenedorMatrices.appendChild(div);
    }

    // mostramos controles de operacion
    document.getElementById('controles').style.display = 'block';
}

function obtenerMatriz(id) {
    const tabla = document.getElementById(id);
    const filas = tabla.rows.length;
    const columnas = tabla.rows[0].cells.length;
    let matriz = [];

    for (let i = 0; i < filas; i++) {
        let fila = [];
        for (let j = 0; j < columnas; j++) {
            const valor = tabla.rows[i].cells[j].querySelector('input').value;
            // Validar que el valor sea numerico y no este vacio
            if (valor === "" || isNaN(valor)) {
                return null; 
            }
            fila.push(parseFloat(valor));
        }
        matriz.push(fila);
    }
    return matriz;
}

function operar(tipo) {
    const matrizA = obtenerMatriz('matriz1');
    const matrizB = obtenerMatriz('matriz2');

    if (!matrizA || !matrizB) {
        return alert("Completa todos los campos con valores numéricos.");
    }

    const filas = matrizA.length;
    const columnas = matrizA[0].length;
    let resultado = [];

    if (tipo === 'sumar') {
        for (let i = 0; i < filas; i++) {
            resultado[i] = [];
            for (let j = 0; j < columnas; j++) {
                resultado[i][j] = matrizA[i][j] + matrizB[i][j];
            }
        }
    } else if (tipo === 'multiplicar') {
        // Multiplicación elemento a elemento según el contexto de la suma
        for (let i = 0; i < filas; i++) {
            resultado[i] = [];
            for (let j = 0; j < columnas; j++) {
                resultado[i][j] = matrizA[i][j] * matrizB[i][j];
            }
        }
    }

    mostrarResultado(resultado);
}

function mostrarResultado(matriz) {
    const contenedor = document.getElementById('resultado');
    contenedor.innerHTML = '<h3>Resultado:</h3>';
    const tabla = document.createElement('table');
    tabla.border = "1";

    matriz.forEach(fila => {
        const tr = document.createElement('tr');
        fila.forEach(valor => {
            const td = document.createElement('td');
            td.textContent = valor;
            td.style.padding = "5px";
            tr.appendChild(td);
        });
        tabla.appendChild(tr);
    });
    contenedor.appendChild(tabla);
}