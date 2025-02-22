import React, { useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom';

const InputComp: React.FC = () => {
    const [ipValue, setIpValue] = useState<string>("");
    const [searchParam, setSearchParam] = useSearchParams();
    const location = useLocation();

    const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIpValue(e.target.value);
    };

    const handleBtnClick = () => {
        if (ipValue.trim()) {
            setSearchParam({ query: ipValue });
        }
    };

    return (
        <div className='p-4 flex flex-col items-center'>
            <input type='text' value={ipValue} onChange={handleIpChange}
                placeholder='Enter your text..' />

            <button onClick={handleBtnClick}>Update URL</button>
            {/*<p>URL--{searchParam.get("query") || "None"}</p>*/}

            <p>URL-- {window.location.origin + location.search}</p>
        </div>
    );
};

export default InputComp;