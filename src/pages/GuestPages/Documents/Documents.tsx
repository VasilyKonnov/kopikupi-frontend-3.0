import { Col, Row } from 'antd'
import React from 'react'
import img from '../../../assets/images/doc-check-icon.svg'
import './Documents.css'

const responsiveThreeCol = { xs: 32, sm: 12, md: 8, lg: 8 }
export const Documents: React.FC = () => {
  return (
    <div className="container">
      <h1 className="doc-h1">Нормативная документация</h1>
      <Row gutter={32} className="wrapper-doc">
        <Col {...responsiveThreeCol} className="doc-col">
          <a
            href="/docs/КопиКупи - устав.pdf"
            target="_blank"
            aria-label="charter"
          >
            <img src={img} alt="иконка для списка" />
            <span>Устав ПКСН&nbsp;«КОПИКУПИ»</span>
          </a>
          <a
            href="/docs/КопиКупи - политика конфиденциальности.pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>
              Политика защиты&nbsp;и&nbsp;обработки персональных&nbsp;данных
            </span>
          </a>
          <a
            href="/docs/КопиКупи - свидетельство о регистрации.pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>
              Свидетельство о&nbsp;постановке на&nbsp;учёт в&nbsp;налоговой
            </span>
          </a>
          <a
            href="/docs/Приложение №1 к Правилам системы очередности Целевой потребительской программы «КОПИКУПИ».pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>
              Приложение №1 к Правилам системы очередности Целевой
              потребительской программы «КОПИКУПИ»
            </span>
          </a>
          <a href="/docs/Информация о подключении услуги.pdf" target="_blank">
            <img src={img} alt="иконка для списка" />
            <span>Прием платежей с процессинговой компанией Uniteller</span>
          </a>
          <a
            href="/docs/Заявление_возврат_и_передачу_КУП_для_сайта_образец.pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Заявление на возврат и передачу КУП для сайта образец</span>
          </a>
        </Col>

        <Col {...responsiveThreeCol} className="doc-col">
          <a
            href="/docs/КопиКупи - Правила выдачи займов 2019.pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Правила выдачи займов</span>
          </a>
          <a
            href="/docs/КопиКупи - Правила системы очередности.pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Правила системы очередности</span>
          </a>
          <a
            href="/docs/Протокол и Правила уступки параметров КУП.pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Протокол и Правила уступки параметров КУП</span>
          </a>
          <a
            href="/docs/КопиКупи - Пользовательское соглашение.pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Пользовательское соглашение</span>
          </a>
          <a href="/docs/КопиКупи - Договор УХД.pdf" target="_blank">
            <img src={img} alt="иконка для списка" />
            <span>Договор об участии в хозяйственной деятельности</span>
          </a>
          <a
            href="/docs/Заявление_возврат_и_передачу_КУП_для_сайта.pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Заявление на возврат и передачу КУП для сайта (.pdf)</span>
          </a>
        </Col>

        <Col {...responsiveThreeCol} className="doc-col">
          <a
            href="/docs/Заявление_возврат_и_передачу_КУП_для_сайта.docx"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Заявление на возврат и передачу КУП для сайта (.word)</span>
          </a>
          <a
            href="/docs/Заявление на прием пая и приобретение КУП (образец).pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Заявление на прием пая и приобретение КУП (образец)</span>
          </a>
          <a
            href="/docs/Заявление на прием пая и приобретение КУП (для сайта).docx"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Заявление на прием пая и приобретение КУП (.word)</span>
          </a>
          <a
            href="/docs/Заявление на прием пая и приобретение КУП (для сайта).pdf"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Заявление на прием пая и приобретение КУП (.pdf)</span>
          </a>
          <a
            href="/docs/Протокол_и_Правила_уступки_параметров_КУП.docx"
            target="_blank"
          >
            <img src={img} alt="иконка для списка" />
            <span>Протокол и Правила уступки параметров КУП (.word)</span>
          </a>
        </Col>
      </Row>
    </div>
  )
}
