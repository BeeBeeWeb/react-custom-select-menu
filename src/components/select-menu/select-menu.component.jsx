import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes, { arrayOf } from 'prop-types';

import { ReactComponent as CheckArrow } from './assets/check-light.svg';

import './styles/select-menu.styles.scss';

const SelectMenu = ({ options, selected, placeholder='Select', theme='light', type='normal', onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelected] = useState(selected ? selected : null);
    const selectBoxRef = useRef();
    theme = (theme === 'light' || theme === 'dark') ? theme : 'light';

    const toggleMenu = (e) => {
        setIsOpen(isOpen => !isOpen);
    };

    const closeMenu = useCallback((e) => {
        if (e && !selectBoxRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }, [setIsOpen]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', closeMenu, false);
        } else {
            document.removeEventListener('click', closeMenu, false);
        }
    }, [isOpen, closeMenu]);

    const onItemClick = (e, item) => {
        e.stopPropagation();
        setSelected(item);
        setIsOpen(false);
        if (onChange) {
            onChange(item);
        }
    }

    return (
        <div className={`adjust-select-menu ${theme}`}>
            <div title={selectedItem?.name} ref={selectBoxRef} className="select-box" onClick={toggleMenu}>
                {selectedItem && selectedItem.name ?
                    <span className="selected-text">{selectedItem?.name}</span>
                    :
                    <span className="placeholder">{placeholder}</span>
                }
                <span className="arrow-wrap">
                    <span className="arrow"></span>
                </span>
            </div>
            {isOpen && <div className="dropdown">
                {
                    options.map(optionGroup => (
                        <div key={optionGroup.id} className="option-group">
                            {optionGroup.items.map(item => (
                                <div
                                    className={`${item.value === (selectedItem?.value || null) ? 'selected-option' : ''} option`}
                                    key={item.value}
                                    onClick={(e) => onItemClick(e, item)}
                                >
                                    <span className="check-icon"><CheckArrow /></span>
                                    <div>
                                        <span>{item.name}</span>
                                        <br />
                                        {
                                            type === 'extended' &&
                                            <span className="info-text">
                                                {item.info || ''}
                                            </span>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>}
        </div>
    );
}

SelectMenu.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string,
            items: arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                    info: PropTypes.string
                })
            ).isRequired
        })
    ).isRequired,
    selected: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }),
    placeholder: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark']),
    type: PropTypes.oneOf(['simple', 'extended']),
    onChange: PropTypes.func
}

export default SelectMenu;