import React, { useState, useEffect } from 'react';
import './App.scss';
import SeachInput from '../../components/SearchInput/SearchInput';
import { Pagination } from 'antd';
import API from '../../API/API';
import ResultContainer from '../ResultContainer/ResultContainer';

const App = () => {
  const [pagesAmount, setPagesAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchResults, setCurrentSearchResults] = useState([]);
  const [searchValue, changeSearchValue] = useState('');

  useEffect( () => {
    if(searchValue.length > 1) {
      API.searchFilmsByTitle(searchValue, currentPage)
          .then(result => {
            if(result.data.Response === 'False') return;
            setPagesAmount(+result.data.totalResults);
              console.log(result.data)
            setCurrentSearchResults(result.data.Search);
          })
          .catch(err => console.log('err', err));
    }
  }, [searchValue, currentPage]);

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <SeachInput searchValue={searchValue} changeSearchValue={changeSearchValue} />
      { pagesAmount > 1
          ? <Pagination
              defaultCurrent={currentPage}
              total={pagesAmount}
              showSizeChanger={false}
              showQuickJumper={true}
              onChange={onPageChange}
          />
          : null }
      {
          currentSearchResults.length !== 0
            ? <ResultContainer currentSearchResults={currentSearchResults} />
            : null
      }
    </div>
  );
}

export default App;
