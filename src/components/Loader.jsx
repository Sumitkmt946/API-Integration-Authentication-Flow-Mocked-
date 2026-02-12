import React from 'react';

const Loader = ({ fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50">
                <div className="loader"></div>
            </div>
        );
    }
    return <div className="loader"></div>;
};

export default Loader;
