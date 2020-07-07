import React, { useState, useEffect, Fragment } from 'react';
import './ShowResult.scss';
import API from '../../API/API';

const ShowResult = ({index, Type, Title, Year, imdbID }) => {
	const [isClicked, changeIsClicked] = useState(false);
	const [movieData, setMovieData] = useState({ });
	useEffect(() => {
		if(isClicked) {
			API.getFullPlot(imdbID)
				.then(result => {
					setMovieData(result.data);
				})
				.catch(err => console.log('err', err));
		}
	}, [isClicked]);

	const onClickResult = (e) => {
		e.preventDefault();
		changeIsClicked(!isClicked);
	};
	
	const shortResult = <div className='ShowResult' onClick={onClickResult}>
		<div>{index}</div>
		<div>Type: {Type}</div>
		<div>Title: {Title}</div>
		<div>Year: {Year}</div>
	</div>;

	const fullResult = <div className='FullResult'>
		<div className='Poster'>
			<img src={movieData.Poster} alt="The poster of the movie"/>
		</div>
		<div className='Description' >
			<div>Title: {Title}</div>
			<div>Year: {Year}</div>
			<div>BoxOffice: {movieData.BoxOffice}</div>
			<div>Country: {movieData.Country}</div>
			<div>Released: {movieData.Released}</div>
			<div>Plot:
				<p>{movieData.Plot}</p>
			</div>
			<button onClick={onClickResult}>Hide description</button>
		</div>
	</div>;

	const viewResult = isClicked ? fullResult : shortResult;

	return(
		<Fragment>
			{ viewResult }
		</Fragment>
	);
}

export default ShowResult;