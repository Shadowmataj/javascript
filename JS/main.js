const productos = [
    {
        instrumento: "Guitarra",
        modelo: "ASHBE3",
        marca: "ESP/LTD",
        material: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        modelo: "ASHBE3",
        marca: "ESP/LTD",
        material: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        modelo: "ASHBE3",
        marca: "ESP/LTD",
        material: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        modelo: "ASHBE3",
        marca: "ESP/LTD",
        material: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        modelo: "ASHBE3",
        marca: "ESP/LTD",
        material: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        modelo: "ASHBE3",
        marca: "ESP/LTD",
        material: "Roble",
        color: "Fade blue",
        cuerdas: 6,
    },
    {
        instrumento: "Guitarra",
        modelo: "ASHBE3",
        marca: "ESP/LTD",
        material: "Roble",
        color: "Fade blue",
        cuerdas: 7,
    },
]

const mostrarInventario = () => {
    let inventario = []
    let i = 1
    console.clear()
    console.table(productos)
    for (let item of productos) {
        inventario.push("Producto " + i + "\n")
        inventario.push("Instrumento: " + item.instrumento + "\n")
        inventario.push("Modelo: " + item.modelo + "\n")
        inventario.push("Marca: " + item.marca + "\n")
        inventario.push("Material: " + item.material + "\n")
        inventario.push("Color: " + item.color + "\n")
        inventario.push("Cuerdas: " + item.cuerdas + "\n\n")
        i++
    }

    console.log(inventario.join(""))
}

const agregarArticulos = () => {
    console.clear()
    let instrumento = prompt("¿Qué instrumento desea agregar al inventario?")
    let modelo = prompt("¿Cuál es el modelo del instrumento que desea gregar?")
    let marca = prompt("¿Cuál es la marca del instrumento que desea gregar?")
    let material = prompt("¿Cuál es el material del instrumento que desea gregar?")
    let color = prompt("¿Cuál es el color del instrumento que desea gregar?")
    let cuerdas = parseInt(prompt("¿Cuántas cuerdas tiene el instrumento que desea gregar?"))

    const producto = { instrumento, modelo, marca, material, color, cuerdas }
    productos.push(producto)
}

const sacarProducto = () => {
    console.clear()
    console.table(productos)
    let producto = parseInt(prompt("Indique el Index del producto que desea eliminar: "))
    productos.splice(producto, 1)
}

const modificarInformacion = () => {
    console.clear()
    console.table(productos)
    let index = parseInt(prompt("Indique el Index del producto que desea modificar: "))
    let cambios = parseInt(prompt("El producto tiene las siguientes propiedades: \n1.- Instrumento: " + productos[index].instrumento + "\n2.-Modelo: " + productos[index].modelo + "\n3.-Marca: " + productos[index].marca + "\n4.-Material: " + productos[index].material + "\n5.-Color: " + productos[index].color + "\n6.-Cuerdas: " + productos[index].cuerdas + "\n¿Cuántas propiedades del producto desea cambiar?"))
    for (let i = 0; i < cambios; i++) {
        let propiedad = prompt("El producto tiene las siguientes propiedades: \n1.- Instrumento: " + productos[index].instrumento + "\n2.-Modelo: " + productos[index].modelo + "\n3.-Marca: " + productos[index].marca + "\n4.-Material: " + productos[index].material + "\n5.-Color: " + productos[index].color + "\n6.-Cuerdas: " + productos[index].cuerdas + "\nIndique la propiedad que desea modificar del producto").toLowerCase()
        let nuevaPropiedad = prompt("El producto tiene las siguientes propiedades: \n1.- Instrumento: " + productos[index].instrumento + "\n2.-Modelo: " + productos[index].modelo + "\n3.-Marca: " + productos[index].marca + "\n4.-Material: " + productos[index].material + "\n5.-Color: " + productos[index].color + "\n6.-Cuerdas: " + productos[index].cuerdas + "\nIndique el nuevo valor de la propiedad")
        if (propiedad == "instrumento") {
            productos[index].instrumento = nuevaPropiedad
        }
        if (propiedad == "modelo") {
            productos[index].modelo = nuevaPropiedad
        }
        if (propiedad == "marca") {
            productos[index].marca = nuevaPropiedad
        }
        if (propiedad == "material") {
            productos[index].material = nuevaPropiedad
        }
        if (propiedad == "color") {
            productos[index].color = nuevaPropiedad
        }
        if (propiedad == "cuerdas") {

            productos[index].cuerdas = parseInt(nuevaPropiedad)
        }
    }

    alert("El produto se ha modificado completamente: \n1.- Instrumento: " + productos[index].instrumento + "\n2.-Modelo: " + productos[index].modelo + "\n3.-Marca: " + productos[index].marca + "\n4.-Material: " + productos[index].material + "\n5.-Color: " + productos[index].color + "\n6.-Cuerdas: " + productos[index].cuerdas + "\nPuedes modificarlo en cualquier momento.")
}

let opcion = parseInt(prompt("Bienvenido al manejo de inventario para Boost Music \nPor favor, selecciona la accion que deseas realizar: \n1.- Revisar inventario.\n2.- Agregar articulo.\n3.- Sacar articulo del inventario.\n4.- Modificar informacion de un articulo.\n5.- Salir. \nSelecciona la opcion deseada: "))


while (opcion != 5) {
    switch (opcion) {
        case 1:
            if (productos.length != 0) {
                mostrarInventario()
            } else {
                alert("No tienes productos en el inventario.")
            }
            break
        case 2:
            agregarArticulos()
            break
        case 3:
            if (productos.length != 0) {
                sacarProducto()
            } else {
                alert("No tienes productos en el inventario.")
            }
            break
        case 4:
            if (productos.length != 0) {
                modificarInformacion()
            } else {
                alert("No tienes productos en el inventario.")
            }
            break
        case 5:
            alert("Adios, vuelve pronto.")
            break
        default:
            alert("Opcion no disponible.")
    }
    opcion = parseInt(prompt("Bienvenido al manejo de inventario para Boost Music \nPor favor, selecciona la accion que deseas realizar: \n1.- Revisar inventario.\n2.- Agregar articulo.\n3.- Sacar articulo del inventario.\n4.- Modificar informacion de un articulo.\n5.- Salir. \nSelecciona la opcion deseada: "))
}