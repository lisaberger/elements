import { Html, useProgress } from '@react-three/drei';
import { FC } from 'react';

const Loader: FC = () => {
    const { progress } = useProgress();
    return (
        <Html center className="text-primary text-xl">
            {Math.floor(progress)}%
        </Html>
    );
};

export default Loader;
