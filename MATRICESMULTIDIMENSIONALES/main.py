alumnos = [
    ['Juan', [['Matematicas', 8], ['Lengua', 9], ['Sociales', 7], ['Naturales', 7]]],
    ['Ana', [['Lengua', 9], ['Matematicas', 10], ['Sociales', 8], ['Naturales', 6]]],
    ['Luis', [['Lengua', 6], ['Sociales', 8], ['Matematicas', 7], ['Naturales', 6]]],
    ['María', [['Lengua', 9], ['Sociales', 10], ['Naturales', 10], ['Matematicas', 9]]]
]

def limpiar_texto(texto):
    return texto.strip().lower()

def buscar_indice_alumno(nombre):
    nombre_limpio = limpiar_texto(nombre)
    for i in range(len(alumnos)):
        if limpiar_texto(alumnos[i][0]) == nombre_limpio:
            return i
    return -1

def buscar_indice_materia(materias, nombre_materia):
    materia_limpia = limpiar_texto(nombre_materia)
    for i in range(len(materias)):
        if limpiar_texto(materias[i][0]) == materia_limpia:
            return i
    return -1

def pedir_nota(mensaje="Ingrese la nota (0-10): "):
    while True:
        entrada = input(mensaje).strip()
        try:
            nota = float(entrada)
            if 0 <= nota <= 10:
                return nota
            print("Debe ingresar un número entre 0 y 10")
        except ValueError:
            print("Debe ingresar un número válido")

def agregar_o_modificar_materia(alumno):
    nombre_materia = input("Ingrese el nombre de la materia: ").strip()
    if not nombre_materia:
        print("El nombre de la materia no puede estar vacío")
        return

    materias = alumno[1] 
    indice_materia = buscar_indice_materia(materias, nombre_materia)
    nota = pedir_nota()

    if indice_materia >= 0:
        materias[indice_materia][1] = nota
        print("Nota actualizada correctamente")
    else:
        materias.append([nombre_materia, nota])
        print("Materia agregada correctamente")

def agregar_alumno():
    nombre = input("Ingrese el nombre del alumno: ").strip()
    if not nombre:
        print("El nombre no puede estar vacío")
        return

    indice = buscar_indice_alumno(nombre)
    if indice >= 0:
        print("El alumno ya está registrado")
        print("Puede agregar o modificar una materia para este alumno")
        agregar_o_modificar_materia(alumnos[indice])
        return

    materias = []
    while True:
        nom_materia = input("Ingrese una materia (o presione Enter para finalizar): ").strip()
        if not nom_materia:
            break
        
        if buscar_indice_materia(materias, nom_materia) >= 0:
            print("Esa materia ya fue cargada para este alumno")
            continue
            
        nota = pedir_nota()
        materias.append([nom_materia, nota])

    alumnos.append([nombre, materias])
    print("Alumno agregado correctamente")

def ver_alumnos():
    if not alumnos:
        print("No hay alumnos cargados")
        return

    alumnos_ordenados = sorted(alumnos, key=lambda x: limpiar_texto(x[0]))

    print("Listado de alumnos:")
    for alum in alumnos_ordenados:
        print(f"- {alum[0]}")
        materias = alum[1]
        if not materias:
            print("  (Sin materias cargadas)")
        else:
            mats_ordenadas = sorted(materias, key=lambda x: limpiar_texto(x[0]))
            for m in mats_ordenadas:
                print(f"  {m[0]}: {m[1]}")

def main():
    while True:
        print("1. Ver alumnos")
        print("2. Agregar alumno")
        print("3. Agregar o modificar notas")
        print("4. Salir")

        opcion = input("Ingrese una opción: ").strip()

        if opcion == "1":
            ver_alumnos()
        elif opcion == "2":
            agregar_alumno()
        elif opcion == "3":
            nombre = input("Ingrese el nombre del alumno: ").strip()
            idx = buscar_indice_alumno(nombre)
            if idx == -1:
                print("El alumno no existe")
            else:
                agregar_o_modificar_materia(alumnos[idx])
        elif opcion == "4":
            print("Saliendo del sistema...")
            break
        else:
            print("Opción no válida, intentá de nuevo")

if __name__ == "__main__":
    main()