import moment from 'moment'
import {ICalculator, IMoneyBox} from './interfaces'
import MoneyBox from './MoneyBox'
import {TooLargeStepError} from './errors'

/**
 * Калькулятор параметров копилки
 */
class Calculator implements ICalculator {
  static readonly MAX_STEP: number = 360;
  private readonly topKup: number;
  // шаг срока покупки
  private step: number;
  private readonly _moneyBox: IMoneyBox;

  /**
   *
   * @param purchaseSum - сумма покупки
   * @param initialPayment - первоначальный платёж
   * @param monthlyPayment - ежемесячные накопления
   * @param topKup - КУП 1го места
   */
  constructor(
    purchaseSum: number,
    initialPayment: number,
    monthlyPayment: number,
    topKup: number,
  ) {
    this.topKup = topKup;
    this._moneyBox = new MoneyBox(purchaseSum, initialPayment, monthlyPayment);
    this.step = -1
  }

  get moneyBox(): IMoneyBox {
    return this._moneyBox
  }

  purchaseAcceleration(): Date {
    let deadline;
    if (this.step >= 0) {
      deadline = this.step
    } else {
      deadline = this.purchaseDeadline()
    }
    return moment(Date.now()).add(deadline, 'month').toDate()
  }

  purchaseDeadline(): number {
    // если уже было вычисление, то пользуемся его результатом
    if (this.step >= 0) {
      return this.step;
    }
    let curTimestamp = Date.now();
    while (true) {
      this.step += 1;
      if (this.step >= Calculator.MAX_STEP) {
        throw new TooLargeStepError(
          'С такими параметрами накопления Вам потребуется слишком долго копить до займа' +
          `, более ${
            Calculator.MAX_STEP / 12
          } лет. Попробуйте увеличить первоначальный взнос, или уменьшить сумму покупки.`,
        )
      }
      curTimestamp = moment(curTimestamp).add(1, 'month').valueOf();
      //
      this._moneyBox.topUp(this.step != 0, curTimestamp);
      if (this._moneyBox.kup(curTimestamp) >= this.topKup) {
        break
      }
    }
    return this.step
  }
}

export default Calculator;
