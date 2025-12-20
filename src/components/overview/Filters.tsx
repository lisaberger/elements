import { useTranslation } from 'react-i18next';

import Dropdown from '@/components/_ui/Drowdown';
import {
    useAppDispatch,
    useAppSelector,
    filterOptions,
    selectFilters,
    updateFilter,
    resetFilters,
} from '@/store';
import { type Filter } from '@/types/Filter.interface';
import { type FiltersKey } from '@/types/Filters.interface';

function Filters() {
    const { t } = useTranslation('filters');

    const dispatch = useAppDispatch();
    const filters = useAppSelector(filterOptions);
    const selectedFilters = useAppSelector(selectFilters);

    const handleChange = (key: FiltersKey) => (value: string) => {
        dispatch(updateFilter({ key, value }));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    return (
        <section className="mb-4 md:mb-10 w-full flex justify-center px-4 gap-2 absolute bottom-0 z-2">
            {(Object.entries(filters) as [FiltersKey, Filter[]][]).map(([key, options]) => {
                // Reset option at the beginning
                const optionsWithReset = [
                    { value: '', label: t('buttons.resetFilter') },

                    // real options
                    ...options.map((option) => ({
                        value: option.value,
                        label: t(`${key}.${option.value}`),
                    })),
                ];

                return (
                    <Dropdown
                        key={key}
                        id={key}
                        options={optionsWithReset}
                        value={selectedFilters[key]}
                        placeholder={t(`labels.${key}`)}
                        onChange={handleChange(key)}
                    />
                );
            })}
            <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-lg bg-primary text-white"
            >
                {t('buttons.resetFilters')}
            </button>
        </section>
    );
}

export default Filters;
