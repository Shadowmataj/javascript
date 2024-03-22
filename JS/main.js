fetch("https://raw.githubusercontent.com/Shadowmataj/javaScript/main/db/data.json")
    .then(resp => resp.json())
    .then(data => {
        
        let productsList = data

        for (let i = 0; i < productsList.length; i++) {
            productsList[i]["shown"] = productsList[i].id
        }

        let newItemVar = {
            id: null,
            nombre: "",
            description: "",
            precio: 0,
            category: "",
            stock: 0,
            imagen: "",
            shown: null
        }


        // Elementos
        const appSection = document.getElementById("app")
        const head = document.createElement("header")
        head.innerHTML = "<h1>Manejo de inventario Boost Music</h1>"
        appSection.appendChild(head)
        const productsContainer = document.createElement("section")
        productsContainer.id = "list-container"
        appSection.appendChild(productsContainer)
        const contenedorProductos = document.createElement("div")
        contenedorProductos.className = "products-container"
        const returnLink = document.createElement("a")
        returnLink.innerHTML = `
<a href="./pages/elementosborrados.html" id= "link">Ir a elementos borrados</a>`

        appSection.appendChild(returnLink)


        // Variables
        let filtro = []
        let numeroArticulos = 5
        let pagina = 1
        let newProductList = []

        const elementosEliminadosDB = JSON.parse(localStorage.getItem("eliminatedProducts"))
        let elementosEliminados = []
        if (elementosEliminadosDB) {
            elementosEliminados = JSON.parse(localStorage.getItem("eliminatedProducts"))
            console.log(elementosEliminados)
            elementosEliminados.forEach(itm => {
                productsList = productsList.filter(item => item.id != itm.id)
            })
            resetShowOrder()
        }

        newProductList = productsList
        let numeroPaginas = Math.ceil(newProductList.length / numeroArticulos)
        // implementaciones.
        productsContainer.innerHTML = `
    <div class="first-line">
        <p class="table-first">ID</p>
        <p class="table-first">Nombre</p>
        <p class="table-first">Precio</p>
        <p class="table-first">Categoría</p>
        <p class="table-first">Piezas</p>
        <P class="table-first">Acciones</P>
    </div>`

        productsContainer.appendChild(contenedorProductos)

        showProducts(productsList)


        const paginas = document.createElement("div")
        paginas.className = "paginas-display"
        paginas.innerHTML = `
    <div class="modifiers-container">
        <div class="modifiers" id="text-filter">
            <div class="filter-modifier">
                <select name="filter-selection" id="filter-selection">
                    <option value="Nombre">Nombre</option>
                    <option value="ID">ID</option>
                    <option value="Categoría">Categoría</option>
                </select >
            </div >
            <input type="text" id="busqueda" name="busqueda" value="">
        </div>
        <div class="modifiers" id="pages-counter">
            Paginas: ${numeroPaginas}
        </div>
        <div class="modifiers pagina-modifier">
            <span>Página: </span>
            <button id="pagina-anterior">-</button>
            <span id="pagina">${pagina}</span>
            <button id="pagina-siguiente">+</button>
        </div>
        <div class="modifiers">
            <span>Articulos:</span>
            <select name="items" id="items">
                <option value=5>5</option>
                <option value=10>10</option>
                <option value=15>15</option>
            </select >
        </div >
        <button id= "add-element-button">Agregar</button>
    </div >
    `


        productsContainer.appendChild(paginas)
        const page = document.getElementById("pagina")
        const nextPage = document.getElementById("pagina-siguiente")
        const previousPage = document.getElementById("pagina-anterior")
        const conteoPaginas = document.getElementById("pages-counter")
        const itemsShowed = document.getElementById("items")
        const footer = document.createElement("footer")
        footer.innerHTML = "Gracias por usar nuestro servicio."
        appSection.appendChild(footer)

        const addElementButton = document.getElementById("add-element-button")
        addElementButton.addEventListener("click", newItem)

        const textFilter = document.getElementById("busqueda")
        textFilter.addEventListener("keyup", textFilt)

        const textFilterSelection = document.getElementById("filter-selection")
        textFilterSelection.addEventListener("change", (event) => resetFilter(event))


        // mostrar productos.

        function showProducts(listaProductos) {
            filtro = listaProductos.filter(producto => producto.shown <= (numeroArticulos * pagina) && producto.shown >= (numeroArticulos * pagina - (numeroArticulos - 1)))
            contenedorProductos.innerHTML = ""
            filtro.forEach(element => {

                let lineaProducto = document.createElement("div")
                lineaProducto.className = "product-line"
                lineaProducto.innerHTML = `
        <p class="table id">${element.id}</p>
        <textarea class="text-area table" id= ${"nombre-element-" + element.id} ${element.id}>${element.nombre}</textarea>
        <textarea class="text-area table" id= ${"precio-element-" + element.id}>$${element.precio}</textarea>
        <textarea class="text-area table" id= ${"category-element-" + element.id}>${element.category}</textarea>
        <textarea class="text-area table" id= ${"stock-element-" + element.id}>${element.stock}</textarea>
        <div class= "table">
            <button class= "erase-button" id=${"erase-button-" + element.id}>Eliminar</button>
        </div>
`
                contenedorProductos.appendChild(lineaProducto)
            })
            addEraseButton()
            addProductUpdate()

        }


        function addEraseButton() {
            const buttons = document.querySelectorAll(".erase-button")
            buttons.forEach(item => {
                item.onclick = (e) => {
                    const pseudoId = Number(e.currentTarget.id.split("-")[2])
                    const elementName = document.getElementById(`nombre-element-${pseudoId}`)
                    eliminatedProduct = productsList.filter(producto => producto.nombre == elementName.innerHTML)[0]
                    productsList = productsList.filter(producto => producto.nombre != elementName.innerHTML)

                    localStorage.removeItem("eliminatedProducts")
                    elementosEliminados = [...elementosEliminados, eliminatedProduct]
                    localStorage.setItem("eliminatedProducts", JSON.stringify(elementosEliminados))
                    resetShowOrder()
                    textFilt()
                }
            })
        }


        function addProductUpdate() {
            const elementsList = document.querySelectorAll(".text-area")
            elementsList.forEach(item => {
                item.onchange = (e) => {
                    console.log(e)
                    const pseudoId = Number(e.currentTarget.id.split("-")[2])
                    const elementName = document.getElementById(`nombre-element-${pseudoId}`)

                    const productListIndex = productsList.findIndex(item => item.nombre == elementName.innerHTML)

                    const updateNombre = document.getElementById(`nombre-element-${pseudoId}`).value
                    const updatePrecio = document.getElementById(`precio-element-${pseudoId}`).value
                    const updateCategory = document.getElementById(`category-element-${pseudoId}`).value
                    const updateStock = document.getElementById(`stock-element-${pseudoId}`).value

                    productsList[productListIndex].nombre = updateNombre
                    productsList[productListIndex].precio = updatePrecio.slice(1)
                    productsList[productListIndex].category = updateCategory
                    productsList[productListIndex].stock = updateStock
                    textFilt()
                }
            }
            )
        }

        itemsShowed.addEventListener("change", changeShowedItems)
        function changeShowedItems() {
            numeroArticulos = document.getElementById("items").value
            numeroPaginas = Math.ceil(newProductList.length / numeroArticulos)
            pagina = 1
            page.innerHTML = pagina
            conteoPaginas.innerHTML = `Paginas: ${numeroPaginas} `
            showProducts(newProductList)
        }

        nextPage.onclick = () => {
            if (pagina < Math.ceil(newProductList.length / numeroArticulos)) {
                pagina++
            }
            page.innerHTML = pagina
            showProducts(newProductList)
        }

        previousPage.onclick = () => {
            if (pagina > 1) {
                pagina--
            }
            page.innerHTML = pagina
            showProducts(newProductList)
        }

        function textFilt() {

            const filterType = document.getElementById("filter-selection").value


            switch (filterType) {
                case "ID":
                    if (Number(textFilter.value) > 0) {
                        newProductList = productsList.filter(producto => producto.id == Number(textFilter.value))
                    } else {
                        newProductList = productsList
                    }
                    break
                case "Nombre":
                    newProductList = productsList.filter(producto => producto.nombre.toLocaleLowerCase().includes(textFilter.value.toLocaleLowerCase()))
                    break
                case "Categoría":
                    newProductList = productsList.filter(producto => producto.category.toLocaleLowerCase().includes(textFilter.value.toLocaleLowerCase()))
                    break
            }

            if (newProductList.length == 0) {
                Toastify({
                    text: "No hay coincidencias en la base",
                    duration: 3000,
                    destination: "",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, rgba(0,0,0,0.5), rgb(71, 13, 100))",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();
            }

            for (let i = 0; i < newProductList.length; i++) {
                newProductList[i].shown = i + 1
            }
            numeroPaginas = Math.ceil(newProductList.length / numeroArticulos)
            if (pagina > numeroPaginas) {
                pagina = 1
            }
            page.innerHTML = pagina
            conteoPaginas.innerHTML = `Páginas: ${numeroPaginas} `
            showProducts(newProductList)

        }
        const newItemFormContainer = document.createElement("section")
        newItemFormContainer.className = "new-item-form-container"

        function newItem() {
            newItemFormContainer.innerHTML = ""
            appSection.appendChild(newItemFormContainer)

            const form = document.createElement("div")
            form.className = "form"
            newItemFormContainer.appendChild(form)
            form.innerHTML = `
    <h2>Nuevo Producto</h2>
    <form id= "form-content">
            <label htmlFor="">Nombre</label>
            <input type="text" className="form-control" id="form-name" value="" required/>
            <label htmlFor="">Descripción</label>
            <input type="text" className="form-control" id="form-description" value="" required/>
            <label htmlFor="">Precio</label>
            <input type="number" className="form-control" id="form-precio" value="" required/>
            <label htmlFor="">category</label>
            <input type="text" className="form-control" id="form-category" value="" required/>
            <label htmlFor="">Stock</label>
            <input type="number" className="form-control" id="form-stock" value="" required/>
            <input type="submit" id="submit-button" className="btn btn-success mt-3 form-control checkout-button" value="Agregar nuevo producto" />
    </form>
    <button class="cancel-button" id="cancel-button">X</button>
    `

            const formName = document.getElementById("form-name")
            const formDescription = document.getElementById("form-description")
            const formPrecio = document.getElementById("form-precio")
            const formCategory = document.getElementById("form-category")
            const formStock = document.getElementById("form-stock")

            formName.addEventListener("change", handleName)
            formDescription.addEventListener("change", handleDescription)
            formPrecio.addEventListener("change", handlePrecio)
            formCategory.addEventListener("change", handleCategory)
            formStock.addEventListener("change", handleStock)

            const buttonSubmit = document.getElementById("form-content")
            buttonSubmit.addEventListener("submit", (event) => addElement(event))

            const cancelButton = document.getElementById("cancel-button")
            cancelButton.addEventListener("click", cancelForm)
        }

        function cancelForm() {
            appSection.removeChild(newItemFormContainer)
        }


        const handleName = (e) => {
            newItemVar = {
                ...newItemVar,
                nombre: e.target.value
            }
        }
        const handleDescription = (e) => {
            newItemVar = {
                ...newItemVar,
                description: e.target.value
            }

        }
        const handlePrecio = (e) => {
            newItemVar = {
                ...newItemVar,
                precio: e.target.value
            }
        }
        const handleCategory = (e) => {
            newItemVar = {
                ...newItemVar,
                category: e.target.value
            }
        }
        const handleStock = (e) => {
            newItemVar = {
                ...newItemVar,
                stock: e.target.value
            }
        }

        function addElement(event) {
            event.preventDefault()

            const maxIdNumber = Math.max(...productsList.map(item => item.id))
            newItemVar = {
                ...newItemVar,
                id: maxIdNumber + 1
            }

            const repeatItem = productsList.findIndex(item => item.nombre == newItemVar.nombre)

            if (repeatItem != -1) {
                Toastify({
                    text: "No puedes agregar dos veces el mismo producto",
                    duration: 3000,
                    destination: "",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, rgba(0,0,0,0.5), rgb(71, 13, 100))",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();
            } else {
                productsList = [
                    ...productsList,
                    newItemVar
                ]

                resetShowOrder()

                newItemVar = {
                    id: null,
                    nombre: "",
                    description: "",
                    precio: 0,
                    category: "",
                    imagen: "",
                    stock: 0,
                }


                newProductList = productsList
                appSection.removeChild(newItemFormContainer)
                numeroPaginas = Math.ceil(newProductList.length / numeroArticulos)
                conteoPaginas.innerHTML = `Paginas: ${numeroPaginas} `
                textFilt()
            }
        }

        function resetShowOrder() {
            for (let i = 0; i < productsList.length; i++) {
                productsList[i].shown = i + 1
            }
        }

        function resetFilter(event) {
            newProductList = productsList
            resetShowOrder()
            textFilter.value = ""
            showProducts(newProductList)
        }
    })

        