import React from 'react'
import { Input, Slider } from 'antd'
import {
  TargetTypeEnum,
  TSectionCalculatorProps,
} from './SectionCalculatorTypes'
import './SectionCalculator.scss'
import {
  MAX_KKA_PURCHASE_SUM,
  MAX_KKN_PURCHASE_SUM,
} from './SectionCalculatorConstants'
import { correctDate } from './util'

const handleStyle = {
  borderColor: '#0079D0',
  height: '14px',
  width: '14px',
  marginLeft: '-3px',
  marginTop: '-4.5px',
  backgroundColor: '#0079D0',
}
const trackStyle = {
  backgroundColor: '#0079D0',
  height: '4px',
}

export const SectionCalculatorView: React.FC<TSectionCalculatorProps> = ({
  errorMessage,
  purchaseSum,
  initialPayment,
  monthlyPayment,
  moneyBoxName,
  onChangeSliderPurchaseSum,
  onChangeSliderInitialPayment,
  onChangeMonthlyPayment,
  targetType,
  toggleTargetTypeKkn,
  toggleTargetTypeKka,
  onChangeInputPurchaseSum,
  onChangeInputInitialPayment,
  onChangeInputMonthlyPayment,
  onChangeMoneyBoxName,
  accumulationDate,
  purchaseAcceleration,
  periodAccumulation,
  purchaseDeadline,
  isQuestionModalVisible,
  setIsQuestionModalVisible,
  onClickCreateMoneyBox,
}) => {
  // выводить ли результаты расчёта калькулятора
  const validResults =
    errorMessage.length === 0 &&
    initialPayment !== null &&
    purchaseSum !== null &&
    monthlyPayment !== null
  return (
    <>
      <h1 className="section-calculator-h1">
        Рассчитайте свой график накопления и прогноз ускорения покупки
      </h1>
      <div className="section-calculator-wrap">
        <div className="new-piggy-bank-name">
          <p className="new-piggy-bank-name--title">Название копилки:</p>
          <Input
            value={moneyBoxName}
            onChange={onChangeMoneyBoxName}
            aria-label="money-box-name"
            placeholder="Новая копилка"
          />
        </div>

        <div className="target-type">
          <div className="target-type--question">
            <span>Тип цели:</span>
          </div>

          <div className="target-type--type">
            <div className="toggle-button">
              <button
                onClick={toggleTargetTypeKkn}
                className={
                  targetType === TargetTypeEnum.KKN
                    ? 'toggle-button--active'
                    : 'toggle-button--hold'
                }
              >
                Недвижимость
              </button>
              <button
                onClick={toggleTargetTypeKka}
                aria-label="kka-target-type"
                className={
                  targetType === TargetTypeEnum.KKA
                    ? 'toggle-button--active'
                    : 'toggle-button--hold'
                }
              >
                Автомобиль
              </button>
            </div>
          </div>
        </div>

        <div className="purchase-acceleration">
          {errorMessage.length > 0 && (
            <p
              className="purchase-acceleration--warning"
              aria-label="error-message"
            >
              {errorMessage}
            </p>
          )}
        </div>

        <form className="form-calculator">
          <div className="form-calculator--item">
            <p>
              <span>*</span>
              Сумма покупки
            </p>
            <Input
              onChange={onChangeInputPurchaseSum}
              value={purchaseSum !== null ? purchaseSum : undefined}
              aria-label="purchase-sum"
              type="number"
              step={500}
            />
            <Slider
              min={50000}
              max={
                targetType === TargetTypeEnum.KKN
                  ? MAX_KKN_PURCHASE_SUM
                  : MAX_KKA_PURCHASE_SUM
              }
              // @ts-ignore
              onChange={onChangeSliderPurchaseSum}
              value={purchaseSum ? purchaseSum : undefined}
              step={500}
              // в js компонента Slider есть свойства trackStyle и handleStyle,
              // а в интерфейсе SliderProps этих свойств нет
              // @ts-ignore
              trackStyle={trackStyle}
              handleStyle={handleStyle}
            />
          </div>

          <div className="form-calculator--item">
            <p>
              <span>*</span>
              Первоначальный взнос
            </p>
            <Input
              onChange={onChangeInputInitialPayment}
              value={initialPayment !== null ? initialPayment : undefined}
              aria-label="initial-payment"
              type="number"
              step={500}
            />
            <Slider
              min={0}
              max={targetType === TargetTypeEnum.KKN ? 5000000 : 1000000}
              // @ts-ignore
              onChange={onChangeSliderInitialPayment}
              value={initialPayment ? initialPayment : undefined}
              step={500}
              // @ts-ignore
              trackStyle={trackStyle}
              handleStyle={handleStyle}
            />
          </div>

          <div className="form-calculator--item">
            <p>
              <span>*</span>
              Ежемесячное накопление
            </p>
            <Input
              onChange={onChangeInputMonthlyPayment}
              value={monthlyPayment !== null ? monthlyPayment : undefined}
              aria-label="monthly-payment"
              type="number"
              step={500}
            />
            <Slider
              min={500}
              max={targetType === TargetTypeEnum.KKN ? 100000 : 50000}
              // @ts-ignore
              onChange={onChangeMonthlyPayment}
              value={monthlyPayment ? monthlyPayment : undefined}
              step={500}
              trackStyle={trackStyle}
              handleStyle={handleStyle}
            />
          </div>
        </form>

        {validResults && (
          <div className="calc-result-wrap" aria-label="calculation-results">
            <div className="calc-result-wrap--item">
              <div className="calculation-result">
                <div className="calculation-result--title">
                  <span className="blue-box-text">Всего копить:</span>
                </div>
                <p aria-label="accumulation-period">
                  {`${periodAccumulation} мес.`}
                </p>
              </div>
              <div className="calculation-result">
                <div className="calculation-result--title">
                  <span className="blue-box-text">Накопи всю сумму сам:</span>
                </div>
                <p aria-label="accumulation-date">
                  {correctDate(accumulationDate)}
                </p>
              </div>
            </div>
            <div className="calc-result-wrap--item-vs-kk">
              <div className="question-modal-wrap">
                <button
                  onClick={() => setIsQuestionModalVisible(true)}
                  aria-label="question-button"
                >
                  ?
                </button>
                {isQuestionModalVisible && (
                  <div className="question-modal" aria-label="question-modal">
                    <span
                      className="question-modal--close"
                      onClick={() => setIsQuestionModalVisible(false)}
                      aria-label="question-modal--close"
                    />
                    <div className="question-modal--fon"></div>
                    <div className="question-modal--text">
                      <h3>Ускорение покупки</h3>
                      <span className="line"></span>
                      <p>
                        Накопление в КОПИКУПИ происходит также, как и
                        самостоятельное накопление в банке на депозитном счёте.
                        Однако, покупка произойдет гораздо раньше в процессе
                        накопления. Такое ускорение возможно за счёт
                        финансирования от кооператива по технологии совместных
                        накоплений.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="calc-result-wrap--data">
                <div className="calculation-result">
                  <div className="calculation-result--title">
                    <span className="blue-box-text">Купить</span>
                    <span className="blue-box-text font-weight-bold">
                      &nbsp;с сервисом:
                    </span>
                  </div>
                  <p aria-label="purchase-deadline">
                    {`${purchaseDeadline} мес.`}
                  </p>
                </div>
                <div className="calculation-result">
                  <div className="calculation-result--title">
                    <span className="blue-box-text">Купить&nbsp;</span>
                    <span className="blue-box-text font-weight-bold">
                      с ускорением:
                    </span>
                  </div>
                  <p aria-label="purchase-acceleration">
                    {`≈${correctDate(purchaseAcceleration)}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="actions-wrap">
          <button
            className="action-button"
            aria-label="create-money-box-btn"
            onClick={() => onClickCreateMoneyBox()}
            disabled={!validResults}
          >
            Завести копилку
          </button>
          <span>
            Вы всегда сможете поменять
            <br />
            параметры копилки позже
          </span>
        </div>
      </div>
    </>
  )
}
