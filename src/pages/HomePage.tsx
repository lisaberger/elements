import { Canvas } from '@react-three/fiber';
import Particles from '@/components/Particles';
import Start from '@/components/Start';

const HomePage = () => {
    return (
        <>
            <Canvas style={{ position: 'absolute' }}>
                <Particles count={1000} />
            </Canvas>
            <Start />
        </>
    );
};

export default HomePage;
