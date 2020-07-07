import React from 'react';
import { Input } from 'antd';

const SeachInput = ({ searchValue, changeSearchValue }) => {
    const typeMovieName = (e) => {
        e.preventDefault();
        const movieName = e.currentTarget.value;
        changeSearchValue(movieName);
    };

    return <Input placeholder={`Type the movie's name`} value={searchValue} onChange={typeMovieName} />;
};

export default SeachInput;
