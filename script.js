//Encontrar o botao adicionar tarefa
const btnRemoverConluida = document.querySelector('#btn-remover-concluidas')
const btnRemovertodas    = document.querySelector('#btn-remover-todas')
const btnAddTarefa  = document.querySelector('.app__button--add-task')
const btnCancelar   = document.querySelector('.app__form-footer__button--cancel')
const formAddTarefa = document.querySelector('.app__form-add-task')
const textArea      = document.querySelector('.app__form-textarea')
const ulTarefas     = document.querySelector('.app__section-task-list')
const tarefaAtiva   = document.querySelector('.app__section-active-task-description')

let tarefas       =  []
let tarefaSelecionada   = null
let liTarefaSelecionada = null

tarefas = JSON.parse(localStorage.getItem('tarefas'))

function atualizarTarefas(){
    localStorage.setItem('tarefas',JSON.stringify(tarefas))
}

//funções

function criarElementoTarefa(tarefa){
    const li  = document.createElement('li')
    li.classList.add('app__section-task-list-item')
    
     li.classList.add('animate__animated','animate__rubberBand')

    const svg = document.createElement('svg')
    svg.innerHTML =`<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#FFF">
                        </circle>
                        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E">
                        </path>
                    </svg>`

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
   
    paragrafo.textContent = tarefa.descricao

    const botao = document.createElement('button')
    botao.onclick = ()=>{

        const paragrafoAtual = paragrafo.textContent
        const novaDescricao = prompt("Qual é o novo nome da Tarefa?",paragrafoAtual)
        if(novaDescricao){
            paragrafo.textContent = novaDescricao
            atualizarTarefas()
        }
    }
    const imgBotao = document.createElement('img')
    imgBotao.setAttribute('src','imagens/edit.png')
    botao.classList.add('app_button-edit')
    
    botao.append(imgBotao)
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)
  
    if (tarefa.completa){
        
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled','disabled')

    }else{
        li.onclick=()=>{
        
            document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento =>{
                elemento.classList.remove('app__section-task-list-item-active')
                
            })

            document.querySelectorAll('.animate__animated')
            .forEach(elemento=>{
                elemento.classList.remove('animate__animated','animate__rubberBand','animate__bounce')
            })
    
            if (tarefaSelecionada == tarefa){
                tarefaAtiva.textContent = ''
                tarefaSelecionada   = null
                liTarefaSelecionada = null
                return
            }

            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            li.classList.add('app__section-task-list-item-active')
            li.classList.add('animate__animated','animate__bounce')
            tarefaAtiva.textContent = paragrafo.textContent
    
        }

    }


    return li

}

// add eventos


btnAddTarefa.addEventListener('click',() => {
    formAddTarefa.classList.toggle('hidden')

})

btnCancelar.addEventListener('click',()=>{
    textArea.value = ''; 
    formAddTarefa.classList.add('hidden')
})

formAddTarefa.addEventListener('submit', (evento)=>{
    evento.preventDefault()
    const tarefa ={
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    const elementoDaTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoDaTarefa)
    atualizarTarefas()
    textArea.value =''
    formAddTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
})

document.addEventListener('focoFinalizado',()=>{

    if (tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        tarefaSelecionada.completa = true
        tarefaAtiva.textContent =''
        atualizarTarefas()
    }
})


function removeTarefas(somenteCompletas){
    //if ternario

    seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento =>{
        console.log(elemento)
        // elemento.classList.remove('animate__animated','animate__rubberBand','animate__bounce')
        // elemento.classList.ad('animate__animated','animate__backOutDown')
        elemento.remove()
    })
    debugger
    tarefas = somenteCompletas? tarefas.filter(tarefa => !tarefa.completa):[]
    atualizarTarefas()
}
btnRemoverConluida.addEventListener('click',()=>{
    removeTarefas(true)
})

btnRemovertodas.addEventListener('click',()=>{
    
    removeTarefas(false)
})