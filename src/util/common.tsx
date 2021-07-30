/**
 * Функции общего назначения
 */

import { message, Popover } from 'antd'
import React, { useMemo, useRef } from 'react'
import moment from 'moment'

interface RestrictionAction {
  title: string
  handler: () => void
}

export const withCheckRestrictions = (
  picked: RestrictionAction,
  current: RestrictionAction,
) => {
  if (picked.title && current && picked.title !== current.title) {
    message.warning(
      `Прежде чем ${picked.title.toLocaleLowerCase()}, необходимо ${current.title.toLocaleLowerCase()}.`,
    )
  }
  if (current) {
    current.handler()
  } else {
    picked.handler()
  }
}

export function generateQrCode(info: { [key: string]: string | number }) {
  const qrcodeParams = Object.entries(info)
    .map(([key, value]) => `${key}=${value}`)
    .join('|')
  return `ST00012|${qrcodeParams}`
}

/**
 * Данный код нужен пока только для того, чтобы можно было отсканировать QR-код в приёмочных тестах
 *
 * @param name
 * @param number
 */
export const downloadQR = (
  name: string = 'downloadLink123',
  number: number = 0,
) => {
  const canvas = document.querySelectorAll('canvas')[number]
  if (canvas !== null) {
    // @ts-ignore
    const pngUrl = canvas.toDataURL('image/png')
    let downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.id = name
    document.body.appendChild(downloadLink)
  }
}

export function sum_num(number: any) {
  let num = number.toString().replace(/ /g, '')
  if (num === '') {
    return ''
  } else {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
}

export async function handleResponseWithErrors(response: Response) {
  if (response.status === 403) {
    message.error('У вас недостаточно прав для совершения операции')
    return false
  }
  if (response.status === 401) {
    return false
  }
  let data = await response.text()
  if (data.length > 0) {
    const responseData = JSON.parse(data)
    if (Array.isArray(responseData)) {
      message.error(responseData[0])
    } else if (typeof responseData === 'object') {
      const name: any = Object.getOwnPropertyNames(responseData)[0]
      if (Array.isArray(responseData[name])) {
        message.error(responseData[name][0])
      } else if (typeof responseData.name === 'object') {
        const subKey: any = Object.getOwnPropertyNames(responseData[name])[0]
        message.error(responseData[name][subKey])
      } else {
        message.error(responseData[name])
      }
    }
  } else {
    if (response.status === 404) {
      message.error('Запрашиваемая информация не найдена.')
    }
  }
  return false
}

export function checkLengthObject(obj: any) {
  var size = 0,
    key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++
  }
  return size
}

// Отлавливает изменение состояние в компоненте
export const useChangeLog = (
  dependency: any,
  func: Function,
  ...variable: any
) => {
  const firstExecution = useRef(true)
  useMemo(() => {
    if (firstExecution.current) {
      firstExecution.current = false
    } else {
      func(variable)
    }
  }, [func, variable])
}

export function changeBoolAll(props: any) {
  if (props[3]) {
    if (props[2] !== '' && props[2] !== 0) {
      props[1](props[0])
    } else {
      props[1](!props[0])
    }
  }
}

export function calculateMonthDuration(duration: any, date_start: any = '') {
  let date
  if (date_start === '') {
    date = moment(new Date()).add(Number(duration), 'M').format('MM.YYYY')
  } else {
    date = moment(date_start).add(Number(duration), 'M').format('MM.YYYY')
  }
  let split_date: any = date.split('.')
  return `${months[Number(split_date[0]) - 1]}  ${split_date[1]}`
}

export const validationMinMaxLength = (
  value: number,
  changeVal: any,
  length: number,
) => {
  //@ts-ignore
  let val = String(value).length
  if (length < val) {
    return
  } else if (val < 0) {
    return
  } else {
    changeVal(value)
  }
}

export const onlyNumberInput = (event: any) => {
  if (
    event.keyCode === 46 ||
    event.keyCode === 8 ||
    event.keyCode === 9 ||
    event.keyCode === 27 ||
    // Разрешаем: Ctrl+A
    (event.keyCode === 65 && event.ctrlKey === true) ||
    // Разрешаем: home, end, влево, вправо
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    // Ничего не делаем
    return
  } else {
    // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
    if (
      (event.keyCode < 48 || event.keyCode > 57) &&
      (event.keyCode < 96 || event.keyCode > 105)
    ) {
      event.preventDefault()
    }
  }
}

/**
 * Принимаем сумму от сервера, переводим её в копейки и отбрасываем дробную часть
 * Функция внедрена потому что сканеры qr кодов не воспринимают дробную часть
 * @param sum
 */
export const correctSumForQRCode = (sum: number): number => {
  return Math.round(sum * 100)
}

export const months_for_number = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
]

export const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

export function textLimit(text: string, limit: number) {
  let textLimit = text.trim()
  if (textLimit.length <= limit) return textLimit
  textLimit = textLimit.slice(0, limit) // тупо отрезать по лимиту
  const lastSpace = textLimit.lastIndexOf(' ')
  if (lastSpace > 0) {
    // нашлась граница слов, ещё укорачиваем
    textLimit = textLimit.substr(0, lastSpace)
  }
  return <Popover content={text}>{textLimit}...</Popover>
}

/**
 * Делает заглавной первый символ строки
 * @param str
 */
export function ucFirst(str: string): string {
  if (str.length === 0) return str
  return str[0].toUpperCase() + str.slice(1)
}

export function removeTheLastCharacters(text: any, lastCharacters: any) {
  let lastcharacters = 2
  if (lastCharacters) {
    lastcharacters = lastCharacters
  }
  if (text) {
    text.substr(0, text.length - lastcharacters)
  }
}

/**
 * Прокрутился ли пользователь до низа документа?
 */
export function isScrolledToDocBottom(): boolean {
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  )
  const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight,
  )
  const delta = 10

  return Math.abs(viewportHeight + window.pageYOffset - scrollHeight) <= delta
}

/**
 * Форматирует вывод суммы
 *
 * @param sum - сумма
 * @param label - текст, который будет добавлен после суммы
 * @param withKopecks - с копейками либо же без
 */
export function convertRu(
  sum: any,
  label: string = '',
  withKopecks: boolean = true,
) {
  let num = Number(sum).toFixed(2)
  let rub = num.toString().split('.')[0]
  let kopecks

  if (withKopecks) {
    let str = num.toString().split('.')[1]
    kopecks = Number(num.toString().split('.')[1]) === 0 ? '00' : str
  } else {
    kopecks = ''
  }

  return (
    Number(rub).toLocaleString() + (withKopecks ? ',' : '') + kopecks + label
  )
}

/**
 * Форматирование сумм
 *
 * @param sum
 */
export const sumFormat = (sum: number) => {
  let numb = Number((Number(sum) / 1000000).toFixed(1)).toLocaleString()
  if (numb.indexOf(',') !== -1) {
    return numb
  } else {
    return numb + ',0'
  }
}

/**
 * Группировка массива на указанное кол-во групп.
 * Группы имеют одинаковый размер, за исключением последней группы.
 * Сначала элементы массива, по порядку, заполняют нулевую группу, затем первую и тд.
 * Например, исходный массив представляет собой [1,2,3,4,5,6,7,8], и нужно разбить его на 3 группы.
 * Тогда в нулевой группе будет [1,2,3], в первой [4,5,6], во второй - сколько останется, [7,8]
 *
 * @param sourceArr - исходный массив
 * @param groupsAmount - кол-во групп
 * @returns [[]] - массив групп
 */
export const groupArray = (
  sourceArr: Array<any>,
  groupsAmount: number,
): Array<Array<any>> => {
  const groupLen = Math.ceil(sourceArr.length / groupsAmount)
  let groups: Array<any> = []
  for (let groupNum = 0; groupNum < groupsAmount; groupNum++) {
    groups[groupNum] = []
  }
  let groupIndex
  sourceArr.forEach((elem, index) => {
    groupIndex = Math.floor(index / groupLen)
    groups[groupIndex].push(elem)
  })
  return groups
}

export const padTime = (time: number) => {
  return String(time).length === 1 ? `0${time}` : `${time}`
}
export const formatForTimer = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${padTime(seconds)}`
}
