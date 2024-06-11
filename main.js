let listaDeItens = []
let itemASerEditado

const form = document.getElementById('form-itens')
const itensInput = document.getElementById('receber-item')
const ulItens = document.getElementById('lista-de-itens')
const ulItensComprados = document.getElementById('itens-comprados')
const listaRecuperados = localStorage.getItem('listaDeItens')

form.addEventListener('submit', function (evento) {
    evento.preventDefault()
    salvarItens()
    mostrarItem()
})

function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))
}

if (listaRecuperados) {
    listaDeItens = JSON.parse(listaRecuperados)
    mostrarItem()
} else {
    listaDeItens = []
}

function salvarItens() {
    const comprasItem = itensInput.value
    const checarDuplicidade = listaDeItens.some((e) => e.valor.toUpperCase() === comprasItem.toUpperCase())
    if (checarDuplicidade) {
        alert('Você já salvou este item')
    } else {
        
        listaDeItens.push({
            'valor' : comprasItem,
            'checar': false
        })
    }
}

function mostrarItem() {
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''

    listaDeItens.forEach((elemento, index) => {
        if (elemento.checar) {
            ulItensComprados.innerHTML += `
    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>

            `
        } else {
            ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemASerEditado) ? 'disabled' : ''}></input>
                </div>

                <div>
                    ${ index === Number(itemASerEditado) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button> ': '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
                `
        }

    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')
  

    inputsCheck.forEach(i => {
        i.addEventListener("click", (evento) =>{
           valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
           listaDeItens[valorDoElemento].checar = evento.target.checked
           mostrarItem()
        })
    })

    const deletarObjetos = document.querySelectorAll(".deletar")

    deletarObjetos.forEach(i => {
        i.addEventListener('click', (evento) => {
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens.splice(valorDoElemento,1)
            mostrarItem()
        })
    })

    const editar = document.querySelectorAll('.editar')

    editar.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemASerEditado = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItem()
        })
    })

    atualizaLocalStorage()
}

function salvarEdicao() {
    const ItemEditado = document.querySelector(`[data-value="${itemASerEditado}"] input[type="text"]`)
    listaDeItens[itemASerEditado].valor = ItemEditado.value
    console.log(listaDeItens);
    itemASerEditado = -1
    mostrarItem()
}
