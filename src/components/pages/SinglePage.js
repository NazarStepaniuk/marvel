import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComic, getCharacter, clearError } =
        useMarvelService();

    const onDataLoaded = (data) => {
        setData(data);
    };

    const updateData = useCallback(() => {
        if (!id) return;

        clearError();

        switch (dataType) {
            case "comic":
                getComic(id).then(onDataLoaded);
                break;
            case "character":
                getCharacter(id).then(onDataLoaded);
                break;
            default:
                return;
        }
    }, [id, dataType, getComic, getCharacter, clearError]);

    useEffect(() => {
        updateData();
    }, [updateData]);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? (
        <Component data={data} />
    ) : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

export default SinglePage;
