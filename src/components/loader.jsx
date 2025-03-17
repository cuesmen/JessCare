import React from 'react';
import ReactDOM from 'react-dom';
import { useLoader } from "../main/LoaderContext";

function Loader() {

    const { loading } = useLoader();

    if (!loading) return null;

    return ReactDOM.createPortal(
        <div className="loader-overlay">
            <div className='loading_modal_overlay'>
                <div className="loader">
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                </div>
            </div>
        </div>,
        document.getElementById('loader-root')
    );
};

export default Loader;