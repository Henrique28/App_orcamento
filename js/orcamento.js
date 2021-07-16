class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let x in this) {
            if (this[x] === undefined || this[x] === '' || this[x] === null) {
                return false
            }
        }
        return true
    }

    limparDados(){
        for (let y in this){
            document.getElementById(y).value = ''
        }
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoItem() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravarDespesas(desp) {

        let id = this.getProximoItem()

        localStorage.setItem(id, JSON.stringify(desp))
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistro(){
        let id = localStorage.getItem('id')

        let i = 1 
        while(i <= id){
            let despesa = localStorage.getItem(i)
            console.log(despesa)
            i++
        }        
    }
}

let bd = new Bd()

function cadastro() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //Manipulação do Modal Html:
    let titulo = document.getElementById('tituloModal')
    let subtitulo = document.getElementById('subtitulo')  
    let botao = document.getElementById('botaoModal')    
    let fundo = document.getElementById('fundo')    
    

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        
        titulo.innerHTML = 'Dados Registrados!'
        subtitulo.innerHTML = 'Os seus dados foram registrados e já podem ser consultados'
        botao.innerHTML = 'Voltar'
        botao.className = 'btn btn-success'
        fundo.style.backgroundColor = '#198754'


        $('#registroDespesa').modal('show')

        bd.gravarDespesas(despesa)
        despesa.limparDados()

    } else {

        titulo.innerHTML = 'Erro na Gravação'
        subtitulo.innerHTML = 'Por Favor, verifique se todos os campos estão preenchidos corretamente, para que os dados possam ser registrados'
        botao.innerHTML = 'Voltar e corrigir'
        botao.className = 'btn btn-danger'
        fundo.style.backgroundColor = '#dc3545'

        $('#registroDespesa').modal('show')
    }


}

// Pagina de consulta

function carregaListaDespesa(){

    bd.recuperarTodosRegistro()

}

