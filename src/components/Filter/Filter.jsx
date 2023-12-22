import React from 'react'
import css from './Filter.module.css'

const Filter = ({filter, handleChangeFilter}) => {
    return (
        <div className={css.item}>
            <span>Find contacts by name:</span>
            <input
                value={filter}
                onChange={handleChangeFilter}
                type="text"
                name="filter"
                placeholder="Eden..."
            />
        </div>
    );
};

export { Filter }

