// export const BACKEND_URL = `/server`;
// для костыльной схемы с проксированием на хосте - это нужно для https
// релиз соберать с этим значением!

export const BACKEND_URL = `${window.location.protocol}//${window.location.hostname}:8000`;
// типичный адрес сервера - удобен для теста на локалке

export const BACKEND_API_URL = BACKEND_URL + '/api/v0';


/**
 * Получить URL для запроса ресурса (через API).
 * @param uniquePartOfUrl Уникальная часть запроса.
 */
export const getResourceUrl = (uniquePartOfUrl: string) => (
    BACKEND_API_URL + (uniquePartOfUrl[0] !== '/' ? '/' : '') + uniquePartOfUrl
);
