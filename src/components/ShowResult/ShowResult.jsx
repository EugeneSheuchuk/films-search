import React, { useState, useEffect, Fragment } from 'react';
import './ShowResult.scss';
import API from '../../API/API';

const ShowResult = ({ index, Type, Title, Year, imdbID, setIsLoading }) => {
    const [isClicked, changeIsClicked] = useState(false);
    const [movieData, setMovieData] = useState({});
    useEffect(() => {
        if (isClicked) {
            setIsLoading(true);
            API.getFullPlot(imdbID)
                .then((result) => {
                    setMovieData(result.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err', err);
                    setIsLoading(false);
                });
        }
    }, [isClicked]);
    const onClickResult = (e) => {
        e.preventDefault();
        changeIsClicked(!isClicked);
    };

    const shortResult = (
        <div className="ShowResult" onClick={onClickResult}>
            <div className="Small">{index}</div>
            <div>{Type}</div>
            <div className="Title">{Title}</div>
            <div className="Small">{Year}</div>
        </div>
    );
    let posterUrl = '';
    let posterAlt = '';
    if (movieData.Poster === 'N/A') {
        posterUrl = '#';
        posterAlt = 'There is no poster';
    } else {
        posterUrl = movieData.Poster;
        posterAlt = 'The poster of the movie';
    }

    const fullResult = (
        <div className="FullResult">
            <div className="Poster">
                <img src={posterUrl} alt={posterAlt} />
            </div>
            <div className="Description">
                <div>Title: {Title}</div>
                <div>Year: {Year}</div>
                <div>BoxOffice: {movieData.BoxOffice}</div>
                <div>Country: {movieData.Country}</div>
                <div>Released: {movieData.Released}</div>
                <div>
                    Plot:
                    <p>{movieData.Plot}</p>
                </div>
                <button onClick={onClickResult}>Hide description</button>
            </div>
        </div>
    );

    const viewResult = isClicked ? fullResult : shortResult;

    return <Fragment>{viewResult}</Fragment>;
};

export default ShowResult;
