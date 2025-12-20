import { Suspense, useEffect, useRef } from 'react';

import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { GasState, LiquidState, SolidState } from './states';
import { StandardState } from '@/types';

interface StandardStatesProps {
    state: StandardState;
}

export function StandardStates({ state }: StandardStatesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleResize = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            // Set canvas dimensions
            const width = canvas.offsetWidth;
            canvas.width = width;
            canvas.height = width;
        }
    };

    // Call handleResize initially and add event listener for window resize
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Suspense>
            <Canvas ref={canvasRef}>
                <Stage />
                <OrbitControls />
                {state === StandardState.Liquid && <LiquidState />}
                {state === StandardState.Solid && <SolidState />}
                {state === StandardState.Gas && <GasState />}
            </Canvas>
        </Suspense>
    );
}
