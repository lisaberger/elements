import { FC } from 'react';
import Filter from '@/components/overview/filters/Filter';
import { useAppSelector } from '@/store/hooks';
import { filterOptions } from '@/store/slices/filtersSlice';

interface FiltersProps {}

const Filters: FC<FiltersProps> = () => {
    const filters = useAppSelector(filterOptions);

    return (
        <section
            style={{
                position: 'absolute',
                zIndex: 2,
                bottom: 0,
            }}
            className="mb-4 w-full flex justify-content-center px-4 gap-2"
        >
            {Object.entries(filters).map((filter) => (
                <Filter options={filter[1]} id={filter[0]} />
            ))}
        </section>
    );
};

export default Filters;
