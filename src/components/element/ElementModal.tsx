import { FC } from 'react';
import { Element } from '@/types/Element.interface';

interface ElectronConfigModalProps {
    element: Element;
    onClose: () => void;
}

const ElectronConfigModal: FC<ElectronConfigModalProps> = ({ element, onClose }) => {
    const parseElectronConfiguration = () => {
        return element.electronicConfiguration.split(' ').map((orbital) => {
            const match = orbital.match(/^(\d)([spdf])(\d+)$/);
            if (!match) return null;

            const [, shell, subshell, count] = match;
            return { orbital, shell, subshell, count: Number(count) };
        }).filter(Boolean) as { orbital: string; shell: string; subshell: string; count: number }[];
    };

    const parsedConfig = parseElectronConfiguration();

    const valenceElectrons = parsedConfig
        .slice(-2)
        .reduce((acc, o) => acc + o.count, 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 hover:text-black cursor-pointer"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Modal Title */}
                <h2 className="text-xl font-bold mb-4">
                    {element.name} ({element.symbol}) – Electron Configuration
                </h2>

                {/* Explanation */}
                <p className="text-sm mb-4">
                    The electron configuration shows how electrons are distributed across the atom's shells and orbitals.
                    Each part like <code className="bg-gray-200 px-1 rounded">1s2</code> means:
                </p>

                {/* Electron Configuration */}
                <ul className="text-sm space-y-2 mb-4">
                    {parsedConfig.map(({ orbital, shell, subshell, count }) => (
                        <li key={orbital}>
                            <strong>Shell {shell}, {subshell}-orbital:</strong> {count} electron{count !== 1 ? 's' : ''}
                        </li>
                    ))}
                </ul>

                {/* Summary */}
                <div className="text-sm border-t pt-3 mt-3">
                    <p><strong>Total Electrons:</strong> {element.atomicNumber}</p>
                    <p><strong>Protons:</strong> {element.atomicNumber}</p>
                    <p><strong>Valence Electrons:</strong> {valenceElectrons}</p>
                </div>
            </div>
        </div>
    );
};

export default ElectronConfigModal;
