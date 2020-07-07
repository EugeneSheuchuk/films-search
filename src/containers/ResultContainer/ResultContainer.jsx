import React from 'react';
import ShowResult from '../../components/ShowResult/ShowResult';

const ResultContainer = ({currentSearchResults}) => {
	const viewResults = currentSearchResults.map((result, index) =>
		<ShowResult
			index={index + 1}
			Type={result.Type}
			Title={result.Title}
			Year={result.Year}
			imdbID={result.imdbID}
			key={result.imdbID}
		/>)
	return(
		<div className='ResultContainer'>
			<h3>The following matches are displayed for your request:</h3>
			{viewResults}
		</div>
	);
}

export default ResultContainer;