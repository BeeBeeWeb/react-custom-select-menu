import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes, { arrayOf } from 'prop-types';

import { ReactComponent as CheckArrow } from './assets/check-light.svg';
import { ReactComponent as SearchIcon } from './assets/icon-search.png';
import ClearIcon from './assets/icon-close.png';

import './styles/select-menu.styles.scss';

const SelectMenu = ({ options, selected, placeholder='Select', theme='light', type='normal', onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelected] = useState(selected ? selected : null);
    const selectBoxRef = useRef();
    theme = (theme === 'light' || theme === 'dark') ? theme : 'light';
    const searchContainerRef = useRef();
    const [searchString, setSearchString] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [noResults, setNoResults] = useState(false);

    const toggleMenu = (e) => {
        setIsOpen(isOpen => !isOpen);
    };

    const closeMenu = useCallback((e) => {
        if (e && !selectBoxRef.current.contains(e.target) && !searchContainerRef.current.contains(e.target)) {
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
        onClear();
        if (onChange) {
            onChange(item);
        }
    }

    const onSearchContainerClick = (e) => {
        e.stopPropagation();
    }

    const onSearch = (e) => {
        setNoResults(false);
        console.log('search string', e.target.value);
        const searchString = e.target.value;
        setSearchString(e.target.value);
        const newFilteredOptions = options.map(group => {
            const groupItems = group.items.filter(item => {
                return item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
            });

            return {...group, items: [...groupItems]};
        });

        let found = false;
        newFilteredOptions.forEach(group => {
            if (!found) {
                found = group.items.length > 0
            }
        });
        if (found) {
            setFilteredOptions(newFilteredOptions);
        } else {
            setNoResults(true);
        }
    }

    const onClear = () => {
        setSearchString('');
        setFilteredOptions(options);
        setNoResults(false);
    }

    return (
        <div className={`adjust-select-menu ${theme}`}>
            <div title={selectedItem?.name} ref={selectBoxRef} className="select-box" onClick={toggleMenu}>
                {selectedItem && selectedItem.name ?
                    <span className="selected-text">{selectedItem?.name}</span>
                    :
                    <span className="placeholder">{placeholder}</span>
                }
                <span className="arrow-wrap" onClick={(e) => onSearchContainerClick(e)}>
                    <span className="arrow"></span>
                </span>
            </div>
            {isOpen && <div className="dropdown">
                <div className="search-container" ref={searchContainerRef}>
                    <input value={searchString} onChange={(e) => onSearch(e)} type="text" />
                    <button onClick={onClear}><img src={ClearIcon} alt="close icon" /></button>
                </div>
                {
                    !noResults && filteredOptions.map(optionGroup => (
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
                {noResults && <p className="no-results">'No items matching your search'</p>}
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
    type: PropTypes.oneOf(['normal', 'extended']),
    onChange: PropTypes.func
}

export default SelectMenu;