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
                min="0"
                max="255"
                value={value}
                className={props.className}
                onChange={handleChange}
            />
            {/* <p>Value: {value}</p> */}
        </div>
    );
};

export default RangeBar;
