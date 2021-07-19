
// Classes__________________

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
            if (this[x] === undefined || this[x] === '' || this[x] === null || this.dia > 31) {
                return false
            }
        }
        return true
    }

    limparDados() {
        for (let y in this) {
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

    recuperarTodosRegistro() {
        let id = localStorage.getItem('id')
        let despesasArray = []


        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa === null) {
                continue
            }
            despesa.id = i
            despesasArray.push(despesa)
        }

        return despesasArray
    }

    pesquisar(despesa) {
        let filtro = []
        filtro = this.recuperarTodosRegistro()        

        if (despesa.ano != '') {
            filtro = filtro.filter(d => d.ano == despesa.ano)
        }
        if (despesa.mes != '') {
            filtro = filtro.filter(d => d.mes == despesa.mes)
        }
        if (despesa.dia != '') {
            filtro = filtro.filter(d => d.dia == despesa.dia)
        }
        if (despesa.tipo != '') {
            filtro = filtro.filter(d => d.tipo == despesa.tipo)
        }
        if (despesa.descricao != '') {
            filtro = filtro.filter(d => d.descricao == despesa.descricao)
        }
        if (despesa.valor != '') {
            filtro = filtro.filter(d => d.valor == despesa.valor)
        }

        return filtro   
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

// Funções_____________

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

function carregaListaDespesa(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistro()
    }
    

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(function (d) {

        
        let linha = listaDespesas.insertRow()
        
        // Coluna Data
        
        
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        // Coluna Tipo
        switch (parseInt(d.tipo)) {
            case 1: d.tipo = 'Alimentação'
                break;

            case 2: d.tipo = 'Educação'
                break;

            case 3: d.tipo = 'Lazer'
                break;

            case 4: d.tipo = 'Saúde'
                break;

            case 5: d.tipo = 'Transporte'
                break;

            case 6: d.tipo = 'Outro'
                break;

        }
        linha.insertCell(1).innerHTML = d.tipo

        // Coluna Descrição
        linha.insertCell(2).innerHTML = d.descricao

        // Coluna Valor
        linha.insertCell(3).innerHTML = d.valor

        //Coluna Botão Apagar
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            
            let id = this.id.replace('id_despesa_', '')
            
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn) 

        console.log(d)
    })   
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    carregaListaDespesa(despesas, true)
    
}

