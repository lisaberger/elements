import { Canvas } from '@react-three/fiber';

import { Intro, LanguageSwitcher, Particles } from '@/components';

function HomePage() {
    return (
        <>
            <Canvas style={{ position: 'absolute' }}>
                <Particles count={1000} />
            </Canvas>
            <Intro />
            <LanguageSwitcher />
        </>
    );
}

export default HomePage;
