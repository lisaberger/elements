import Dropdown from '@/components/_ui/Drowdown';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    filterOptions,
    selectFilters,
    updateFilter,
} from '@/store/slices/filtersSlice';
import { FiltersKey } from '@/types/Filters.interface';
import { Filter as IFilter } from '@/types/Filter.interface';
import { useTranslation } from 'react-i18next';

function Filters() {
    const { t } = useTranslation('filters');
    const dispatch = useAppDispatch();
    const filters = useAppSelector(filterOptions);
    const selectedFilters = useAppSelector(selectFilters);

    const handleChange =
        (key: FiltersKey) =>
        (value: string) => {
            dispatch(updateFilter({ key, value }));
        };

    return (
        <section className="mb-4 md:mb-10 w-full flex justify-center px-4 gap-2 absolute bottom-0 z-2">
            {(Object.entries(filters) as [FiltersKey, IFilter[]][]).map(
                ([key, options]) => (
                    <Dropdown
                        key={key}
                        id={key}
                        options={options.map((option) => ({
                            value: option.value,
                            label: t(`${key}.${option.value}`),
                        }))}
                        value={selectedFilters[key]}
                        placeholder={t(`labels.${key}`)}
                        onChange={handleChange(key)}
                    />
                )
            )}
        </section>
    );
};

export default Filters;
