import React from 'react';
import ShowResult from '../../components/ShowResult/ShowResult';

const ResultContainer = ({currentSearchResults, currentPage, setIsLoading}) => {
	const viewResults = currentSearchResults.map((result, index) =>
		<ShowResult
			index={currentPage * 10 - (9 - index)}
			Type={result.Type}
			Title={result.Title}
			Year={result.Year}
			imdbID={result.imdbID}
			setIsLoading={setIsLoading}
			key={result.imdbID}
		/>)
	return(
		<div className='ResultContainer'>
			<h2>The following matches are displayed for your request:</h2>
			{viewResults}
		</div>
	);
}

export default ResultContainer;