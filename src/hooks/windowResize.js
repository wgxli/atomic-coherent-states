import { useState, useEffect } from 'react';

export default function useWindowSize(elementID) {
    const [windowSize, setWindowSize] = useState({width: null, height: null});

    function handleResize() {
        const element = document.getElementById(elementID);
        setWindowSize({width: element.offsetWidth, height: element.offsetHeight});
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
