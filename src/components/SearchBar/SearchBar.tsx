import React, { useState } from 'react';
import style from './SearchBar.module.css';
import { Suggestions } from '../Suggestions/Suggestions';

interface SearchBarProps {
    onSearchChange: (query: string) => void;
    onSearchSubmit: (query: string) => void;
    searchQuery: string;
    suggestions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
                                                 onSearchChange,
                                                 onSearchSubmit,
                                                 searchQuery,
                                                 suggestions
                                             }) => {
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
        setShowSuggestions(true);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearchSubmit(searchQuery);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion: string) => {
        onSearchChange(suggestion);
        setShowSuggestions(false);
    };

    const handleInputFocus = () => {
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => setShowSuggestions(false), 200);
    };

    return (
        <div className={style.searchBar}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Search posts..."
                    className={style.searchInput}
                />
                <button type="submit" className={style.searchButton}>Search</button>
            </form>
            {showSuggestions && searchQuery && (
                <Suggestions suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
            )}
        </div>
    );
};

export { SearchBar };
