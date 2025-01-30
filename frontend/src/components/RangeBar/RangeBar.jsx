import React, { useState } from 'react';
import './RangeBar.css';

const RangeBar = (props) => {

    const [value, setValue] = useState(props.value);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        props.onChange(newValue)
    };

    return (
        <div className="rangeBarContainer">
            <input
                type="range"
                min="2"
                max="20"
                value={value}
                className={props.className}
                onChange={handleChange}
            />
            <p className='rangeValue'>Colors {value}</p>
        </div>
    );
};

export default RangeBar;
