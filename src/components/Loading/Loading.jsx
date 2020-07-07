import React from 'react';
import './Loading.scss';

const Loading = () => {
    const _prevent = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="loadingdiv"
             onClick={(e) => _prevent(e)}
             onDoubleClick={(e) => _prevent(e)}
        >
            <p>Loading data...</p>
            <span />
            <span />
            <span />
            <span />
            <span />
        </div>
    );
};

export default Loading;
