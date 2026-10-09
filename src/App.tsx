import { useState } from 'react'
import { ContaBancaria } from './models/ContaBancaria'
import './App.css'

const conta = new ContaBancaria()

const formatarMoeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)

function App() {
  const [operacao, setOperacao] = useState<'deposito' | 'saque'>('deposito')
  const [valor, setValor] = useState('')
  const [saldo, setSaldo] = useState(conta.verSaldo())
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const executarOperacao = () => {
    const valorNumerico = Number(valor.replace(',', '.'))

    if (!valor || Number.isNaN(valorNumerico) || valorNumerico <= 0) {
      const mensagemErro =
        operacao === 'deposito'
          ? 'Erro: o valor do depósito deve ser maior que zero.'
          : 'Erro: o valor do saque deve ser maior que zero.'

      setErro(mensagemErro)
      setMensagem('')
      return
    }

    if (operacao === 'deposito') {
      conta.depositar(valorNumerico)
      setSaldo(conta.verSaldo())
      setMensagem(`Depósito de ${formatarMoeda(valorNumerico)} realizado com sucesso.`)
      setErro('')
    } else {
      if (valorNumerico > conta.verSaldo()) {
        setErro('Erro: saldo insuficiente para realizar o saque.')
        setMensagem('')
        return
      }

      conta.sacar(valorNumerico)
      setSaldo(conta.verSaldo())
      setMensagem(`Saque de ${formatarMoeda(valorNumerico)} realizado com sucesso.`)
      setErro('')
    }

    setValor('')
  }

  return (
    <main className="app-container">
      <div className="card">
        <p className="label">Saldo atual</p>
        <h1>{formatarMoeda(saldo)}</h1>

        <div className="form-group">
          <label htmlFor="operacao">Operação</label>
          <select
            id="operacao"
            value={operacao}
            onChange={(event) => setOperacao(event.target.value as 'deposito' | 'saque')}
          >
            <option value="deposito">Depósito</option>
            <option value="saque">Saque</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="valor">Valor</label>
          <input
            id="valor"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Digite o valor"
            value={valor}
            onChange={(event) => setValor(event.target.value)}
          />
        </div>

        <button type="button" onClick={executarOperacao}>
          Confirmar operação
        </button>

        {erro ? <p className="message error">{erro}</p> : null}
        {mensagem ? <p className="message success">{mensagem}</p> : null}
      </div>
    </main>
  )
}

export default App
