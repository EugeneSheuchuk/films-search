import React, { useState, useEffect } from 'react';
import './App.scss';
import SeachInput from '../../components/SearchInput/SearchInput';
import { Pagination } from 'antd';
import API from '../../API/API';
import ResultContainer from '../ResultContainer/ResultContainer';
import Loading from '../../components/Loading/Loading';

const App = () => {
    const [amountOfResult, setamountOfResult] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearchResults, setCurrentSearchResults] = useState([]);
    const [searchValue, changeSearchValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchValue.length > 1) {
            setIsLoading(true);
            API.searchFilmsByTitle(searchValue, currentPage)
                .then((result) => {
                    if (result.data.Response === 'False') {
                        setamountOfResult(0);
                        setCurrentSearchResults([]);
                        setErrorMessage(result.data.Error);
                        setIsLoading(false);
                        return;
                    }
                    setamountOfResult(+result.data.totalResults);
                    setCurrentSearchResults(result.data.Search);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(true);
                    console.log('err', err);
                });
        }
    }, [searchValue, currentPage]);

    const onPageChange = (pageNumber) => setCurrentPage(pageNumber);
    const loading = (
        <div className="Paranja">
            <Loading />
        </div>
    );

    const activeStyle = isLoading ? 'ResultContainer Loading' : 'ResultContainer';

    return (
        <div className="App">
            <h1>Welcome to movie search service!</h1>
            <SeachInput searchValue={searchValue} changeSearchValue={changeSearchValue} />
            <div className={activeStyle}>
                {amountOfResult > 10 ? (
                    <div className="Pagination">
                        <div className="Wide">
                            <Pagination
                                defaultCurrent={currentPage}
                                total={amountOfResult}
                                showSizeChanger={false}
                                showQuickJumper={true}
                                onChange={onPageChange}
                            />
                        </div>
                        <div className="Narrow">
                            <Pagination
                                simple
                                defaultCurrent={currentPage}
                                total={amountOfResult}
                                onChange={onPageChange}
                            />
                        </div>
                    </div>
                ) : null}
                {searchValue.length > 1 ? (
                    currentSearchResults.length !== 0 ? (
                        <ResultContainer
                            currentSearchResults={currentSearchResults}
                            currentPage={currentPage}
                            setIsLoading={setIsLoading}
                        />
                    ) : (
                        <h2>{errorMessage}</h2>
                    )
                ) : null}
                {isLoading ? loading : null}
            </div>
        </div>
    );
};

export default App;
