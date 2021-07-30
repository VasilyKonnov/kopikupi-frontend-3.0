export const BACKEND_URL = process.env.NODE_ENV === 'development' ?
    `${window.location.protocol}//${window.location.hostname}:8000` : `/server`;

export const BACKEND_API_URL = BACKEND_URL + '/api/v0';

/**
 * Получить URL для запроса ресурса (через API).
 * @param uniquePartOfUrl Уникальная часть запроса.
 */
export const getResourceUrl = (uniquePartOfUrl: string) => (
    BACKEND_API_URL + (uniquePartOfUrl[0] !== '/' ? '/' : '') + uniquePartOfUrl
);
