import React from 'react';
import style from './Suggestions.module.css';

interface SuggestionsProps {
    suggestions: string[];
    onSuggestionClick: (suggestion: string) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions, onSuggestionClick }) => {
    return (
        <div className={style.suggestions}>
            {suggestions.map((suggestion, index) => (
                <div
                    key={index}
                    onClick={() => onSuggestionClick(suggestion)}
                    className={style.suggestion}
                >
                    {suggestion}
                </div>
            ))}
        </div>
    );
};

export { Suggestions };
