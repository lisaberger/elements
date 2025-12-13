import { Html, useProgress } from '@react-three/drei';

function Loader() {
    const { progress } = useProgress();
    
    return (
        <Html center className="text-primary text-xl">
            {Math.floor(progress)}%
        </Html>
    );
};

export default Loader;
