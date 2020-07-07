import React, { useState, useEffect } from 'react';
import './App.scss';
import SeachInput from '../../components/SearchInput/SearchInput';
import { Pagination } from 'antd';
import API from '../../API/API';
import ResultContainer from '../ResultContainer/ResultContainer';

const App = () => {
  const [amountOfResult, setamountOfResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchResults, setCurrentSearchResults] = useState([]);
  const [searchValue, changeSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect( () => {
    if(searchValue.length > 1) {
      API.searchFilmsByTitle(searchValue, currentPage)
          .then(result => {
            if(result.data.Response === 'False') {
                console.log(result.data)
                setamountOfResult(0)
                setCurrentSearchResults([]);
                setErrorMessage(result.data.Error)
                return
            }
            setamountOfResult(+result.data.totalResults);
            setCurrentSearchResults(result.data.Search);
          })
          .catch(err => console.log('err', err));
    }
  }, [searchValue, currentPage]);

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='App'>
      <h1>Welcome to movie search service!</h1>
      <SeachInput searchValue={searchValue} changeSearchValue={changeSearchValue} />
      { amountOfResult > 10
          ? <div className='Pagination'>
              <div className='Wide'>
                  <Pagination
                      defaultCurrent={currentPage}
                      total={amountOfResult}
                      showSizeChanger={false}
                      showQuickJumper={true}
                      onChange={onPageChange}
                  />
              </div>
              <div className='Narrow'>
                  <Pagination
                      simple
                      defaultCurrent={currentPage}
                      total={amountOfResult}
                  />
              </div>
          </div>
          : null }
      {   searchValue.length > 1
          ? currentSearchResults.length !== 0
             ? <ResultContainer currentSearchResults={currentSearchResults} />
             : <h2>{errorMessage}</h2>
          : null
      }
    </div>
  );
}

export default App;
