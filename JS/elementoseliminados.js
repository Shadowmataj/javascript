
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
productsContainer.id = "erase-list-container"
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

const restorButton = document.createElement("button")
restorButton.className = "restore-elements"
restorButton.innerHTML = "Recuperar"
appSection.appendChild(restorButton)

productsContainer.appendChild(paginas)

const restoreButton = document.getElementById("restore-elements")

restorButton.addEventListener("click", () => {
    Swal.fire({
        icon: "question",
        title: "¿Deseas restaurar estos elementos?",
        showConfirmButton: true,
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        confirmButtonColor: "#470d64"
    }).then(resp => {
        if (resp.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "Se han restaurado los elementos",
                showConfirmButton: false,
                timer: 1000
            })
            setTimeout(() => {
                localStorage.clear()
                location.reload()
            }, 1000)
        }
    })
})

