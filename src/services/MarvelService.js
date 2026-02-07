import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { request, clearError, process, setProcess } = useHttp();

    const _apiBase = "https://marvel-server-zeta.vercel.app/";
    const _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
    const _baseOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`,
        );
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getCharacterByName = async (name) => {
        const res = await request(
            `${_apiBase}characters?name=${name}&${_apiKey}`,
        );
        return res.data.results.map(_transformCharacter);
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`,
        );
        return res.data.results.map(_transformComic);
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : "There is no description for this character",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        };
    };
    const _transformComic = (comics) => {
        return {
            title: comics.title,
            description: comics.description,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            id: comics.id,
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "not available",
            language: comics.textObjects[0]?.language || "en-us",
            pageCount: comics.pageCount
                ? `${comics.pageCount} p.`
                : "No information about the number of pages",
        };
    };

    return {
        clearError,
        process,
        setProcess,
        getAllCharacters,
        getCharacterByName,
        getCharacter,
        getAllComics,
        getComic,
    };
};

export default useMarvelService;
