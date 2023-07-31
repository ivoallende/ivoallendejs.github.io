// Variables que mantienen el estado visible del carrtio

let carritoVisible = false ;

//Esperamos que todos los elementos de la pagina se carguen para continuar con la ejecucion

if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded" , ready )
}else{
    ready()
}

function ready(){
    //Se agrega funcionalidad a los botones del carrtio

    let botonesEliminarItem = document.getElementsByClassName("btn-eliminar")
    for (let i = 0 ; i < botonesEliminarItem.length; i++){
        let button = botonesEliminarItem[i];
        button.addEventListener("click" , eliminarItemCarrito);
    }


    //Agregar funcionalidad al boton de sumar cantidad

    let botonSumarCantidad = document.getElementsByClassName("sumar-cantidad");
        for (let i = 0 ; i < botonSumarCantidad.length ; i++){
                let button = botonSumarCantidad[i];
                button.addEventListener("click",  sumarCantidad ) ;
        }


    //Agregar funcionalidad al boton de restar cantidad

    let botonRestarCantidad = document.getElementsByClassName("restar-cantidad");
        for (let i = 0 ; i < botonRestarCantidad.length ; i++){
                let button = botonRestarCantidad[i];
                button.addEventListener("click",  restarCantidad ) ;
        }

        //Agregar funcionalidad a los botos de agregar al carrito

        let botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
        for(let i = 0 ; i < botonesAgregarAlCarrito.length ; i++){
            let button= botonesAgregarAlCarrito[i]
            button-addEventListener("click" , agregarAlCarritoClicked )
        }

        //agregar Funcionalidad al boton pagar

        document.getElementsByClassName("btn-pagar")[0].addEventListener("click" , pagarClicked )

 }






//eliminar item seleccionado del carrtio

function eliminarItemCarrito(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    //actualizar el total del carrito una vez eliminado el producto

    actualizarTotalCarrito();

        //La siguiente funcion verifica si hay elementos en el carrito una vez que se elimino 
        // Si no hay nada , se oculta el carrito
        ocultarCarrito () ;
}

//Actualziar Carrito
function actualizarTotalCarrito(){
    //Seleccionar el contenedor del carrito
    let carritoContendor = document.getElementsByClassName("carrito")[0];
    let carritoItems = carritoContendor.getElementsByClassName("carrito-item");
    let total = 0

    //recorre el elemento del carrito para actualizar el total
    for (let  i = 0 ; i < carritoItems.length ; i++){
        let item= carritoItems[i];
        let precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
        console.log(precioElemento);

        //se quita el simbolo peso 
        let precio = parseFloat(precioElemento.innerText.replace("$" , "").replace("." , ""));
        console.log(precio)
        let cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
        let cantidad = cantidadItem.value;
        console.log(cantidad)
        total = total + (precio * cantidad);
        
    }

    total = Math.round(total*100)/100
    document.getElementsByClassName("carrito-precio-total")[0].innerText = "$" + total.toLocaleString("es") + ",00";
}

function ocultarCarrito () {
    let carritoItems = document.getElementsByClassName("carrito-items")[0];
    if(carritoItems.childElementCount == 0){
        let carrito = document.getElementsByClassName("carrito")[0]
        carrito.style.marginRight = "-100%";
        carrito.style.opacity = "0";
        carritoVisible = false ;


    //ahora maximizo el contenedor de los elementos
     let items = document.getElementsByClassName("contenedor-items")[0];
     items.style.width = "100%";

    }
}



//Aumentar en uno la cantidad del elemento seleccionado 

function sumarCantidad(event) {
    let  buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value ;
   console.log(cantidadActual)
   cantidadActual++;
   selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;

   //actualizamos el total
   actualizarTotalCarrito()
}

function restarCantidad(event){
    let  buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value ;
   console.log(cantidadActual)
   cantidadActual--;


   //validamos que no sea menor que 1

   if(cantidadActual >=1){
    selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
    //actualizamos el total
    actualizarTotalCarrito()
   }
}

function agregarAlCarritoClicked(event) {
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName("titulo-item")[0].innerText;
    console.log(titulo)
    let precio = item.getElementsByClassName("precio-item")[0].innerText;
    let imagenScr = item.getElementsByClassName("img-item")[0].src;
    console.log(imagenScr)


    //la siguiente funcion agrega el elemento al carrito . lo mando por parametro los valores 

    agregarItemAlCarrito( titulo , precio, imagenScr )

    //hacemos visible el carrito cuando agrega por primera vez

    hacerVisbleCarrito();
}

function agregarItemAlCarrito( titulo , precio, imagenScr ){
    let item = document.createElement("div");
    item.classList.add = "item";
    let itemsCarrito = document.getElementsByClassName("carrito-items")[0];

    //vamos a controlar que el items que esta ingresando no se encuentra ya en el carrito

    let nombresItemsCarrito = itemsCarrito.getElementsByClassName("carrito-items-titulo")
    for (let i = 0 ; i < nombresItemsCarrito.length ; i++){
        if(nombresItemsCarrito[i].innerText == titulo){
            alert("El producto ingresado ya se encuentra en el carrito, por favor indicar cantidad")
            return
        }
    }

    let itemsCarritoContenido = `    
            <div class="carrito-item">
                <img src="${imagenScr}" alt="" width="80px">
                <div class="carrito-item-detalle">
                    <span class="carrito-item-titulo">${titulo}</span>
                    <div class="selector-cantidad">
                        <i class="fa-solid fa-minus restar-cantidad"></i>
                        <input type="text" value="0" class="carrito-item-cantidad" disabled>
                        <i class="fa-solid fa-plus sumar-cantidad"></i>
                    </div>
                    <span class="carrito-item-precio">${precio}</span>
                </div>
                <span class="btn-eliminar">
                    <i class="fa-solid fa-trash"></i>
                </span>
            </div>
    `

    item.innerHTML = itemsCarritoContenido ; 
    itemsCarrito.append(item)

    //Agreganis la funcionalidad de eliminar item nuevo

    item.getElementsByClassName("btn-eliminar")[0].addEventListener("click" , eliminarItemCarrito )

    //agregar la funcionalidad de sumar el nuevo item

    let botonSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0] ;
    botonSumarCantidad.addEventListener("click" , sumarCantidad)

     //agregar la funcionalidad de restar el nuevo item

     let botonRestarCantidad = item.getElementsByClassName("restar-cantidad")[0] ;
     botonRestarCantidad.addEventListener("click" , restarCantidad)
 

}

function pagarClicked(event){
    alert("Gracias por tu compra") ;
    //eliminar todos los productos
    let carritoItems = document.getElementsByClassName("carrito-items")[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();

    //funcion que oculta el carrito
    ocultarCarrito()
}

function hacerVisbleCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName("carrito")[0]
    carrito.style.marginRight = "0";
    carrito.style.opacity = "1"

    var items = document.getElementsByClassName("contenedor-items")[0]
    items.style.width = "60%"
}