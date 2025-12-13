import { ChangeEvent, FC } from 'react';
import styles from './Filter.module.css';
import { Filter as IFilter } from '@/types/Filter.interface';
import { useAppDispatch } from '@/store/hooks';
import { updateFilter } from '@/store/slices/filtersSlice';
import { FiltersKey } from '@/types/Filters.interface';

interface FilterProps {
    id: FiltersKey;
    options: IFilter[];
    value: string;
}

const Filter: FC<FilterProps> = ({ options, id, value }) => {
    const dispatch = useAppDispatch();

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;

        dispatch(updateFilter({ key: id, value: selectedValue }));
    };

    return (
        <select
            name={id}
            id={id}
            value={value}
            onChange={handleChange}
            className={`${styles.filter} text-white mt-4 px-2 py-2 rounded-lg border hover:border-primary active:text-primary`}
        >
            <option value="">{id}</option>

            {options &&
                options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
        </select>
    );
};

export default Filter;
