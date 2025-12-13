import { Canvas } from '@react-three/fiber';
import Particles from '@/components/start/Particles';
import Intro from '@/components/start/Intro';
import LanguageSwitcher from '@/i18n/LanguageSwitcher';

const HomePage = () => {
    return (
        <>
            <Canvas style={{ position: 'absolute' }}>
                <Particles count={1000} />
            </Canvas>
            <Intro />
            <LanguageSwitcher />
        </>
    );
};

export default HomePage;
