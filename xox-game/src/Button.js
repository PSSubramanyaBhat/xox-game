import './Button.css';

import React from 'react';
import cn from 'classnames';

export default function Button({ selected, onClick, children }) {
    const classes = `historyBtn ${selected ? 'historyButtonSelected' : undefined}`;
    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
}