import React, { useContext } from 'react';

import PageContext from '../context/PageContext';

const PageController = () => {
    const pageContext = useContext(PageContext);
    const { panZoomRef, setPrintDialogOpen } = pageContext;

    const zoomIn = () => panZoomRef.current.zoomIn(2);
    const zoomOut = () => panZoomRef.current.zoomOut(2);
    const centerReset = () => {
        panZoomRef.current.autoCenter(1);
        panZoomRef.current.reset(1);
    };

    return (
        <div
            id="pageController"
            className="absolute z-20 opacity-75 hover:opacity-100 transition-all duration-150"
        >
            <div className="text-2xl px-8 border border-gray-200 rounded-full bg-white flex justify-center items-center leading-none select-none">
                <div className="p-3 hover:bg-gray-200 cursor-pointer flex"
                    title="Zoom In" 
                    onClick={zoomIn}>
                    <i className="material-icons">zoom_in</i>
                </div>

                <div className="p-3 hover:bg-gray-200 cursor-pointer flex" 
                    title="Zoom Out" 
                    onClick={zoomOut}>
                    <i className="material-icons">zoom_out</i>
                </div>

                <div className="p-3 hover:bg-gray-200 cursor-pointer flex" 
                    title="Center Focus" 
                    onClick={centerReset}>
                    <i className="material-icons">center_focus_strong</i>
                </div>

                <div className="text-gray-400 p-3">|</div>

                <div className="p-3 hover:bg-gray-200 cursor-pointer flex" 
                    title="Print as PDF" 
                    onClick={() => window.print()}>
                    <i className="material-icons">print</i>
                </div>

                <div
                    className="p-3 hover:bg-gray-200 cursor-pointer flex"
                    title="Save as Image PDF" 
                    onClick={() => setPrintDialogOpen(true)}
                >
                    <i className="material-icons">save</i>
                </div>

                <div className="text-gray-400 p-3">|</div>

                <a
                    className="p-3 hover:bg-gray-200 cursor-pointer flex"
                    href="https://docs.simpleresume.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Go to Documentation"
                >
                    <i className="material-icons">help_outline</i>
                </a>
            </div>
        </div>
    );
};

export default PageController;
