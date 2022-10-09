import { useState, useEffect } from 'react';

// delay khi nhập value liên tục
function Debounce(value, delay) {
    const [debouncedValue, setDeboucedValue] = useState(value);
    useEffect(() => {
        const handle = setTimeout(() => {
            setDeboucedValue(value);
        }, delay);
        return () => {
            clearTimeout(handle);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return debouncedValue;
}

export default Debounce;
