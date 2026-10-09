export class ContaBancaria {
  #saldo: number;

  constructor() {
    this.#saldo = 0;
  }

  depositar(valor: number) {
    if (valor > 0) {
      this.#saldo += valor;
    }
  }

  sacar(valor: number) {
    if (valor <= this.#saldo) {
      this.#saldo -= valor;
    }
  }

  verSaldo(): number {
    return this.#saldo;
  }
}
