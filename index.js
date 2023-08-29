const itemMenu = document.querySelectorAll(".item-menu")
const leerProductos = async() =>{
    try{
        const peticion = await fetch("datos/productos.txt");
        if(peticion.status == 200){
            const resultado = await peticion.json();
            return resultado
        }else{
            throw error;
        }
    }catch{
        console.log("aver")
    }
}
const crearCard = (producto) =>{
    const card = document.createElement("DIV");
    const imagen = document.createElement("IMG");
    const desc = document.createElement("DIV");
    const h4 = document.createElement("H4");
    const parrafo = document.createElement("P");

    card.className = "card";
    desc.className = "card-desc";

    h4.textContent = producto.nombre;
    parrafo.textContent = producto.precio;
    imagen.setAttribute("src", producto.url)

    desc.appendChild(h4);
    desc.appendChild(parrafo);
    card.appendChild(imagen);
    card.appendChild(desc);

    return card;
}

const añadir = (productos) =>{

    let cont = 0;
    Object.values(productos).forEach(producto =>{
        cont++;
        let div;
        let fragmento = document.createDocumentFragment();
        if(cont === 1) div = document.querySelector(".licores");
        else if(cont === 2) div = document.querySelector(".cervezas");
        else div = document.querySelector(".cigarros");

        Object.values(producto).forEach(item =>{
            fragmento.appendChild(crearCard(item));
        })
        div.appendChild(fragmento)
    })

}

window.addEventListener("DOMContentLoaded", async() =>{
    console.log("jaaja");
    let resultado = await leerProductos()
    añadir(resultado);

})

const colorMenu = (a,lista)=>{
    lista.forEach(aItem =>{
        if(aItem === a) aItem.classList.replace("noSel","sel");
        else aItem.classList.replace("sel","noSel");
    })
}
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry =>{
        const id = entry.target.getAttribute("id");
        const aMenu = document.querySelector(`.menu a[href = "#${id}"]`);
        if(entry.isIntersecting){
            colorMenu(aMenu,itemMenu);
        }    
    });

},{rootMargin: "-50% 0px -50% 0px"});

itemMenu.forEach(a =>{
    const hash = a.getAttribute("href");
    const target = document.querySelector(hash);
    if(target) observer.observe(target);
});
