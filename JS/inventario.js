const productos = [
    {
        instrumento: "Guitarra",
        marca: "ESP/LTD",
        materia: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        marca: "ESP/LTD",
        materia: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        marca: "ESP/LTD",
        materia: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        marca: "ESP/LTD",
        materia: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        marca: "ESP/LTD",
        materia: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        marca: "ESP/LTD",
        materia: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        marca: "ESP/LTD",
        materia: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
]

const mostrarInventario = () => {
    console.table(productos)
}
let opcion = 0
while (opcion != 5) {
    opcion = parseInt(prompt("Bienvenido al manejo de inventario para Boost Music \nPor favor, selecciona la accion que deseas realizar: \n1.- Revisar inventario.\n2.- Agregar articulo.\n3.- Sacar articulo del inventario.\n4.- Modificar informacion de un articulo.\n5.- Salir. \nSelecciona la opcion deseada: "))

    switch (opcion) {
        case 1:
            mostrarInventario()
            break
        case 2:
            break
        case 4:
            break
        case 5:
            alert("Adios, vuelve pronto.")
            break
        default:
            alert("Opcion no disponible.")
    }
}