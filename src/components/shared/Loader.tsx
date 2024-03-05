import { Html, useProgress } from '@react-three/drei';
import { FC } from 'react';

const Loader: FC = () => {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return (
        <Html center className="text-primary text-xl">
            {Math.floor(progress)}%
        </Html>
    );
};

export default Loader;
