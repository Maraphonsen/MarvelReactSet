import md5 from 'md5';

const publicKey = '0a167095bb5456f5b8c9b9873dab411c';
const privateKey = 'a542ba57265ff638c2d88d44fcbb938f4238d47d';
const baseUrl = 'https://gateway.marvel.com/v1/public';

const createHash = (ts) => {
    return md5(ts + privateKey + publicKey);
};
export const getCharacters = async (limit = 20, offset = 0) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);

    const url = `${baseUrl}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}&orderBy=name`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.data || !data.data.results) {
            throw new Error('Invalid data structure from API');
        }
        return {
            characters: data.data.results,
            total: data.data.total // Добавляем общее количество персонажей
        };
    } catch (error) {
        console.error('Error fetching characters:', error);
        return { characters: [], total: 0 };
    }
};
export const getCharacterById = async (characterId) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);

    const url = `${baseUrl}/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results[0]; // Возвращаем информацию о персонаже
    } catch (error) {
        console.error('Error fetching character:', error);
        return null;
    }
};
export const getSeries = async (limit = 20, offset = 0) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);
    const url = `${baseUrl}/series?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}&orderBy=title`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            series: data.data.results,
            total: data.data.total
        };
    } catch (error) {
        console.error('Error fetching series:', error);
        return { series: [], total: 0 };
    }
};
export const getSeriesById = async (seriesId) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);

    const url = `${baseUrl}/series/${seriesId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results[0]; 
    } catch (error) {
        console.error('Error fetching character:', error);
        return null;
    }
};
export const getComics = async (limit = 20, offset = 0) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);
    const url = `${baseUrl}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}&orderBy=title`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            comics: data.data.results,
            total: data.data.total
        };
    } catch (error) {
        console.error('Error fetching comics:', error);
        return { comics: [], total: 0 };
    }
};

export const getComicsById = async (comicsId) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);

    const url = `${baseUrl}/comics/${comicsId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results[0]; 
    } catch (error) {
        console.error('Error fetching character:', error);
        return null;
    }
};
export const getCharacterComics = async (characterId, limit = 100) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);
    const url = `${baseUrl}/characters/${characterId}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching character comics:', error);
        return [];
    }
};
export const getCharacterSeries = async (characterId, limit = 100) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);
    const url = `${baseUrl}/characters/${characterId}/series?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching character series:', error);
        return [];
    }
};
export const getSeriesCharacters = async (seriesId, limit = 100) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);
    const url = `${baseUrl}/series/${seriesId}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching series characters:', error);
        return [];
    }
};
export const getComicCharacters = async (comicId, limit = 100) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);
    const url = `${baseUrl}/comics/${comicId}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching comic characters:', error);
        return [];
    }
};
export const getSeriesComics = async (seriesId, limit = 100) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);
    const url = `${baseUrl}/series/${seriesId}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error('Error fetching series comics:', error);
        return [];
    }
};
export const searchCharacters = async (nameStartsWith, limit = 100) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);

    const url = `${baseUrl}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${encodeURIComponent(nameStartsWith)}&limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.data || !data.data.results) {
            throw new Error('Invalid data structure from API');
        }
        return data.data.results;
    } catch (error) {
        console.error('Error searching characters:', error);
        return [];
    }
};
export const searchComics = async (titleStartsWith, limit = 100) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);

    const url = `${baseUrl}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&titleStartsWith=${encodeURIComponent(titleStartsWith)}&limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.data || !data.data.results) {
            throw new Error('Invalid data structure from API');
        }
        return data.data.results;
    } catch (error) {
        console.error('Error searching characters:', error);
        return [];
    }
};
export const searchSeries = async (titleStartsWith, limit = 100) => {
    const ts = Date.now().toString();
    const hash = createHash(ts);

    const url = `${baseUrl}/series?ts=${ts}&apikey=${publicKey}&hash=${hash}&titleStartsWith=${encodeURIComponent(titleStartsWith)}&limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.data || !data.data.results) {
            throw new Error('Invalid data structure from API');
        }
        return data.data.results;
    } catch (error) {
        console.error('Error searching characters:', error);
        return [];
    }
};