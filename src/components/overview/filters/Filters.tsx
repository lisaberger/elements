import { FC, useState } from 'react';
import Filter from '@/components/overview/filters/Filter';

interface FiltersProps {
    onFiltersChange: (filters) => void;
}

const Filters: FC<FiltersProps> = ({ onFiltersChange }) => {
    const groupBlockOptions = [
        { value: 'nonmetal', label: 'Nonmetals' },
        { value: 'noble gas', label: 'Noble Gasses' },
        { value: 'alkali metal', label: 'Alkali Metals' },
        { value: 'alkaline earth metal', label: 'Alkine Earth Metals' },
        { value: 'metalloid', label: 'Metalloids' },
        { value: 'halogen', label: 'Halogens' },
        { value: 'transition metal', label: 'Transition Metals' },
    ];

    const standardStateOptions = [
        { value: 'solid', label: 'Solid' },
        { value: 'liquid', label: 'Liquid' },
        { value: 'gas', label: 'Gas' },
    ];

    const bondingTypeOptions = [
        { value: 'diatomic', label: 'Diatomic' },
        { value: 'atomic', label: 'Atomic' },
        { value: 'metallic', label: 'Metallic' },
        { value: 'covalent network', label: 'Covalent Network' },
    ];

    const [selectedFilters, setSelectedFilters] = useState({
        groupBlock: '',
        standardState: '',
        bondingType: '',
    });

    const handleFilterChange = (id: string, value: string) => {
        setSelectedFilters({
            ...selectedFilters,
            [id]: value,
        });
        onFiltersChange(selectedFilters);
    };

    return (
        <section
            style={{
                position: 'absolute',
                zIndex: 2,
                bottom: 0,
            }}
            className="mb-4 w-full flex justify-content-center px-4 gap-2"
        >
            <Filter
                options={groupBlockOptions}
                defaultValue="GroupBlock"
                id="groupBlock"
                onFilterChange={handleFilterChange}
            />
            <Filter
                id="standardState"
                options={standardStateOptions}
                defaultValue="StandardState"
                onFilterChange={handleFilterChange}
            />
            <Filter
                id="bondingType"
                options={bondingTypeOptions}
                defaultValue="BondingType"
                onFilterChange={handleFilterChange}
            />
        </section>
    );
};

export default Filters;
