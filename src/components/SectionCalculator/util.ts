import { ucFirst } from '../../util/common'

/**
 * Корректирует входящую дату - преобразует её в определённый формат,
 * делает заглавной первый символ и обрезает последние 3 символа
 * @param srcDate
 */
export const correctDate = (srcDate: Date | null) : string => {
  if (srcDate === null) {
    return ' --'
  }
  let correctedDate = ucFirst(
    srcDate.toLocaleDateString('ru-Ru', {
      year: 'numeric',
      month: 'long',
    }),
  )
  return correctedDate.substr(0, correctedDate.length - 3)
}
