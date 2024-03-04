import Filter from './Filter';

const Filters = () => {
    const mainGroupFilters = [
        { value: 'nonmetal', label: 'Nonmetals' },
        { value: 'noble gas', label: 'Noble Gasses' },
        { value: 'alkali metal', label: 'Alkali Metals' },
        { value: 'alkaline earth metal', label: 'Alkine Earth Metals' },
        { value: 'metalloid', label: 'Metalloids' },
        { value: 'halogen', label: 'Halogens' },
        { value: 'transition metal', label: 'Transition Metals' },
    ];

    const standardStatesOptions = [
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
                options={mainGroupFilters}
                defaultValue="Maingroup"
                id="maingroup"
            />
            <Filter
                id="standardstates"
                options={standardStatesOptions}
                defaultValue="States"
            />
            <Filter
                id="bondingtype"
                options={bondingTypeOptions}
                defaultValue="Bondingtype"
            />
        </section>
    );
};

export default Filters;
