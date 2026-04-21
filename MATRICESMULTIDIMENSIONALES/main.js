const readline = require('readline');

let alumnos = [
	['Juan', [['Matematicas', 8], ['Lengua', 9], ['Sociales', 7], ['Naturales', 7]]],
	['Ana', [['Lengua', 9], ['Matematicas', 10], ['Sociales', 8], ['Naturales', 6]]],
	['Luis', [['Lengua', 6], ['Sociales', 8], ['Matematicas', 7], ['Naturales', 6]]],
	['María', [['Lengua', 9], ['Sociales', 10], ['Naturales', 10], ['Matematicas', 9]]]
];

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function preguntar(texto) {
	return new Promise((resolve) => {
		rl.question(texto, (respuesta) => resolve(respuesta));
	});
}

function normalizarTexto(texto) {
	return texto.trim().toLowerCase();
}

function buscarIndiceAlumno(nombre) {
	const nombreNormalizado = normalizarTexto(nombre);
	for (let i = 0; i < alumnos.length; i += 1) {
		if (normalizarTexto(alumnos[i][0]) === nombreNormalizado) {
			return i;
		}
	}
	return -1;
}

function buscarIndiceMateria(materias, nombreMateria) {
	const materiaNormalizada = normalizarTexto(nombreMateria);
	for (let i = 0; i < materias.length; i += 1) {
		if (normalizarTexto(materias[i][0]) === materiaNormalizada) {
			return i;
		}
	}
	return -1;
}

async function pedirNota(mensaje = 'Ingrese la nota (0-10): ') {
	while (true) {
		const entrada = (await preguntar(mensaje)).trim();
		const nota = Number(entrada);
		if (!Number.isNaN(nota) && nota >= 0 && nota <= 10) {
			return nota;
		}
		console.log('Debe ingresar un número entre 0 y 10');
	}
}

async function agregarOModificarMateria(alumno) {
	const nombreMateria = (await preguntar('Ingrese el nombre de la materia: ')).trim();
	if (!nombreMateria) {
		console.log('El nombre de la materia no puede estar vacío');
		return;
	}

	const materias = alumno[1];
	const indiceMateria = buscarIndiceMateria(materias, nombreMateria);
	const nota = await pedirNota();

	if (indiceMateria >= 0) {
		materias[indiceMateria][1] = nota;
		console.log('Nota actualizada correctamente');
	} else {
		materias.push([nombreMateria, nota]);
		console.log('Materia agregada correctamente');
	}
}

async function agregarAlumno() {
	const nombre = (await preguntar('Ingrese el nombre del alumno: ')).trim();
	if (!nombre) {
		console.log('El nombre no puede estar vacío');
		return;
	}

	const indiceAlumno = buscarIndiceAlumno(nombre);
	if (indiceAlumno >= 0) {
		console.log('El alumno ya está registrado');
		console.log('Puede agregar o modificar una materia para este alumno');
		await agregarOModificarMateria(alumnos[indiceAlumno]);
		return;
	}

	const materias = [];
	while (true) {
		const nombreMateria = (await preguntar('Ingrese una materia: ')).trim();
		if (!nombreMateria) {
			break;
		}
		if (buscarIndiceMateria(materias, nombreMateria) >= 0) {
			console.log('Esa materia ya fue cargada para este alumno');
			continue;
		}
		const nota = await pedirNota();
		materias.push([nombreMateria, nota]);
	}

	alumnos.push([nombre, materias]);
	console.log('Alumno agregado correctamente');
}

async function agregarOModificarNotas() {
	const nombre = (await preguntar('Ingrese el nombre del alumno: ')).trim();
	if (!nombre) {
		console.log('El nombre no puede estar vacío');
		return;
	}

	const indiceAlumno = buscarIndiceAlumno(nombre);
	if (indiceAlumno === -1) {
		console.log('El alumno no existe');
		return;
	}

	await agregarOModificarMateria(alumnos[indiceAlumno]);
}

function verAlumnos() {
	if (alumnos.length === 0) {
		console.log('No hay alumnos cargados');
		return;
	}

	const alumnosOrdenados = [...alumnos].sort((a, b) => normalizarTexto(a[0]).localeCompare(normalizarTexto(b[0])));

	console.log('\nListado de alumnos:');
	for (let i = 0; i < alumnosOrdenados.length; i += 1) {
		const alumno = alumnosOrdenados[i];
		console.log(`- ${alumno[0]}`);

		const materias = alumno[1];
		if (materias.length === 0) {
			console.log('  (Sin materias cargadas)');
		} else {
			const materiasOrdenadas = [...materias].sort((a, b) => normalizarTexto(a[0]).localeCompare(normalizarTexto(b[0])));
			for (let j = 0; j < materiasOrdenadas.length; j += 1) {
				console.log(`  ${materiasOrdenadas[j][0]}: ${materiasOrdenadas[j][1]}`);
			}
		}
	}
}

async function main() {
	while (true) {
		console.log('1. Ver alumnos');
		console.log('2. Agregar alumno');
		console.log('3. Agregar o modificar notas');
		console.log('4. Salir');

		const opcion = (await preguntar('Ingrese una opción: ')).trim();

		if (opcion === '1') {
			verAlumnos();
		} else if (opcion === '2') {
			await agregarAlumno();
		} else if (opcion === '3') {
			await agregarOModificarNotas();
		} else if (opcion === '4') {
			console.log('Saliendo del sistema...');
			rl.close();
			break;
		} else {
			console.log('Opción no válida, intentá de nuevo');
		}
	}
}

main();


