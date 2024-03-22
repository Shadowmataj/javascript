
const elementosEliminados = JSON.parse(localStorage.getItem("eliminatedProducts"))
let eraseItems = []
if (elementosEliminados) {
    eraseItems = JSON.parse(localStorage.getItem("eliminatedProducts"))
}

console.log(eraseItems)

const appSection = document.getElementById("app")
const head = document.createElement("header")
head.innerHTML = "<h1>Manejo de inventario Boost Music</h1>"
appSection.appendChild(head)
const productsContainer = document.createElement("section")
productsContainer.id = "list-container"
appSection.appendChild(productsContainer)
const contenedorProductos = document.createElement("div")
contenedorProductos.className = "products-container"

productsContainer.innerHTML = `
    <div class="first-line">
        <p class="table-first">ID</p>
        <p class="table-first">Nombre</p>
        <p class="table-first">Precio</p>
        <p class="table-first">Categoría</p>
        <p class="table-first">Piezas</p>
    </div>`

productsContainer.appendChild(contenedorProductos)

const footer = document.createElement("footer")
footer.innerHTML = "Gracias por usar nuestro servicio."
appSection.appendChild(footer)

const returnLink = document.createElement("a")
returnLink.innerHTML = `
<a href="../index.html" id= "link">Volver al manejo de inventario</a>`

appSection.appendChild(returnLink)

showProducts(eraseItems)

function showProducts(listaProductos) {

    contenedorProductos.innerHTML = ""
    listaProductos.forEach(element => {

        let lineaProducto = document.createElement("div")
        lineaProducto.className = "product-line"
        lineaProducto.innerHTML = `
        <p class="table id">${element.id}</p>
        <textarea class="text-area table" id= ${"nombre-element-" + element.id} ${element.id}>${element.nombre}</textarea>
        <textarea class="text-area table" id= ${"precio-element-" + element.id}>$${element.precio}</textarea>
        <textarea class="text-area table" id= ${"category-element-" + element.id}>${element.category}</textarea>
        <textarea class="text-area table" id= ${"stock-element-" + element.id}>${element.stock}</textarea>
`
        contenedorProductos.appendChild(lineaProducto)
    })
}

const paginas = document.createElement("div")

if ([...eraseItems].length == 0) {
    paginas.className = "paginas-display erase-page"
    paginas.innerHTML = `<h2 class="erase-items-empty">No hay elementos para mostrar.</h2>`
} else {
    paginas.className = "paginas-display restore-items"
    paginas.innerHTML = `
    <button id= "restore-elements">Recuperar</button>
        `
}

productsContainer.appendChild(paginas)

const restoreButton = document.getElementById("restore-elements")

restoreButton.addEventListener("click", () => {
    Swal.fire({
        icon: "question",
        title: "¿Deseas restaurar estos elementos?",
        showConfirmButton: true,
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        confirmButtonText: "Confirmar"
    }).then(resp => {
        if(resp.isConfirmed)
        localStorage.clear()
        location.reload()
    })
})

