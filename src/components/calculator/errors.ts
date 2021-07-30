// TODO: доопределить тип, чтобы new CalculatorError().constructor === CalculatorError
export default class CalculatorError extends Error {
}

/**
 * "ошибка самостоятельного накопления".
 * ошибка говорящая о том, что накоплено 80% от суммы покупки
 */
export class SelfAccumulationError extends CalculatorError {}

export class TooLargeStepError extends CalculatorError {}
