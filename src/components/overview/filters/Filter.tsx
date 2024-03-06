import { ChangeEvent, FC } from 'react';
import styles from './Filter.module.scss';
import { Filter as IFilter } from '@/types/Filter.interface';
import { useAppDispatch } from '@/store/hooks';
import { updateFilter } from '@/store/slices/filtersSlice';

interface FilterProps {
    id: string;
    options: IFilter[];
}

const Filter: FC<FilterProps> = ({ options, defaultValue, id }) => {
    const dispatch = useAppDispatch();

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;

        dispatch(updateFilter({ key: id, value: selectedValue }));
    };

    return (
        <select
            name={id}
            id={id}
            onChange={handleChange}
            className={`${styles.filter} text-white mt-4 px-2 py-2 border-solid border-round-lg hover:border-primary active:text-primary`}
        >
            <option value="" selected>
                {id}
            </option>

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
