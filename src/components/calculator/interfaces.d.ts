/**
 * Интерфейс копилки
 */
export interface IMoneyBox {
  /**
   * КУП (коэффициент участия пайщика)
   * @param calculatedAt - дата расчёта КУПа, в формате timestamp
   */
  kup(calculatedAt: number): number;

  /**
   * Дата накопления (взаиморасчётов), когда вся сумма будет накоплена
   */
  accumulationDate(): Date;

  /**
   * Срок накопления
   */
  accumulationPeriod(): number;

  /**
   * Пополнение, либо ежемесячное (monthly == true), либо первоначальное
   * @param monthly - ежемесячное ли пополнение
   * @param paymentTimestamp - дата платежа, выраженная в timestamp
   */
  topUp(monthly: boolean, paymentTimestamp: number): void;

}

/**
 * Интерфейс калькулятора
 */
export interface ICalculator {
  readonly moneyBox: IMoneyBox;

  /**
   * Расчётный (прогнозируемый) срок покупки,
   * т.е. кол-во месяцев, когда копилка предположительно выйдет на 1 место и получит займ.
   */
  purchaseDeadline(): number;

  /**
   * Ускорение покупки, т.е. рассчитываемая (прогнозируемая)
   * дата когда будет получен займ.
   * Если уже был расчёт срока покупки, используем результат расчёта, иначе запускаем расчёт.
   */
  purchaseAcceleration(): Date;
}

/**
 * Интерфейс платежа
 */
export interface IPayment {
  sum: number;
  timestamp: number;
  ekup: number;
}