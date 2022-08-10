const modal = document.querySelector('.modal-wrapper')
const tbody = document.querySelector('tbody')
const wName = document.querySelector('#m-name')
const wFunction = document.querySelector('#m-function')
const wSalary = document.querySelector('#m-salary')
const btnSalvar = document.querySelector('#btn-salvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-wrapper') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    wName.value = itens[index].nome
    wFunction.value = itens[index].funcao
    wSalary.value = itens[index].salario
    id = index
  } else {
    wName.value = ''
    wFunction.value = ''
    wSalary.value = ''
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let trWorker = document.createElement('tr')

  trWorker.innerHTML = `
  <td>${item.nome}</td>
  <td>${item.funcao}</td>
  <td>R$ ${item.salario}</td>
  <td class="acao">
    <button onclick="editItem(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
  </td>
  <td class="acao">
    <button onclick="deleteItem(${index})"><i class="fa-solid fa-trash"></i></button>
  </td>
    `
  tbody.appendChild(trWorker)
}

btnSalvar.onclick = e => {

  if (wName.value == '' || wFunction.value == '' || wSalary.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = wName.value
    itens[id].funcao = wFunction.value
    itens[id].salario = wSalary.value
  } else {
    itens.push({ 'nome': wName.value, 'funcao': wFunction.value, 'salario': wSalary.value })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  });
}

loadItens()