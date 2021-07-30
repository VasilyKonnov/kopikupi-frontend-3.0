import {IMoneyBox, IPayment} from "./interfaces";
import moment from "moment";
import CalculatorError, {SelfAccumulationError} from "./errors";

class MoneyBox implements IMoneyBox {
  private static readonly MAGIC_FACTOR = 10000.0;
  private static readonly MAX_ACCUM_SUM_COEFF: number = 0.8;
  private payments: IPayment[];
  // ежемесячный платёж
  private readonly monthlyPayment: number;
  // первоначальный взнос
  private readonly initialPayment: number;
  // сумма покупки
  private readonly purchaseSum: number;
  private readonly accumPeriod: number;
  private readonly maxAccumulationSum: number;
  private readonly queueCoeff: number;
  // сумма всех платежей
  private paymentsSum: number;

  constructor(purchaseSum: number, initialPayment: number, monthlyPayment: number) {
    this.purchaseSum = purchaseSum;
    this.initialPayment = initialPayment;
    this.monthlyPayment = monthlyPayment;
    this.payments = [];
    // оптимизация, чтобы снизить время вычислений
    this.accumPeriod = this.accumulationPeriod();
    this.maxAccumulationSum = MoneyBox.MAX_ACCUM_SUM_COEFF * this.purchaseSum;
    this.paymentsSum = 0;
    this.queueCoeff = MoneyBox.MAGIC_FACTOR / (this.purchaseSum * this.accumPeriod);
    this._validate();
  }

  /**
   * Сумма накоплений
   */
  get accumulationSum(): number {
    return this.paymentsSum;
  }

  topUp(monthly: boolean, paymentTimestamp: number): void {
    let paymentSum;
    if (monthly) {
      paymentSum = this.monthlyPayment;
    } else {
      if (this.initialPayment > 0) {
        paymentSum = this.initialPayment;
      } else {
        paymentSum = this.monthlyPayment;
      }
    }
    const ekup = paymentSum * this.queueCoeff;
    this.payments.push({'sum': paymentSum, 'timestamp': paymentTimestamp, 'ekup': ekup});
    this.paymentsSum += paymentSum;
    if (this.paymentsSum >= this.maxAccumulationSum) {
      // ошибка "самостоятельного накопления"
      throw new SelfAccumulationError('Сумма накоплений приблизилась ' +
        `к сумме покупки ${this.purchaseSum} руб. либо превысила её.` +
        ' Возможно, необходимо увеличить сумму покупки, так как при данных параметрах займ не имеет логического смысла')
    }
  }

  accumulationPeriod(): number {
    return Math.round((this.purchaseSum - this.initialPayment) / this.monthlyPayment);
  }

  accumulationDate(): Date {
    return moment(Date.now()).add(this.accumPeriod, 'month').toDate();
  }

  kup(calculatedAt: number): number {
    return this.payments.reduce((totalKup, payment) => {
      // время жизни платежа, в днях
      const paymentLifetime = (calculatedAt - payment.timestamp) / 86400000;
      totalKup += payment.ekup * paymentLifetime;
      return totalKup;
    }, 0);
  }

  /**
   * Валидация параметров копилки
   * @private
   */
  private _validate() {
    if (!isFinite(this.queueCoeff)) {
      throw new CalculatorError('Нельзя создавать копилку с нулевой суммой покупки или нулевым сроком покупки!');
    }
    if (this.monthlyPayment === 0) {
      throw new CalculatorError('Нельзя создавать копилку с нулевым ежемесячным платежём!');
    }
  }
}

export default MoneyBox;