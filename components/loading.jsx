import React from 'react';
import '@styles/Loader.css';

const Loader = () => {
    return (
        <div className='container'>
            <div className='loader'>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--text'></div>
            </div>
        </div>
    );
};

export default Loader;