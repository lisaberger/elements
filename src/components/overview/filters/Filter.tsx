import { ChangeEvent, FC } from 'react';
import styles from './Filter.module.scss';

interface FilterProps {
    id: string;
    options: { value: string; label: string }[]; // Liste der Filteroptionen
    defaultValue?: string; // Standardwert für den Filter
    onFilterChange: (id: string, selectedValue: string) => void;
}

const Filter: FC<FilterProps> = ({
    options,
    defaultValue,
    id,
    onFilterChange,
}) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        onFilterChange(id, selectedValue);
    };

    return (
        <select
            name={id}
            id={id}
            onChange={handleChange}
            className={`${styles.filter} text-white mt-4 px-2 py-2 border-solid border-round-lg hover:border-primary active:text-primary`}
        >
            {defaultValue && (
                <option value={defaultValue} selected>
                    {defaultValue}
                </option>
            )}
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Filter;
