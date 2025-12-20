import { Suspense, useEffect, useRef } from 'react';

import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { GasState } from './states/GasState';
import { LiquidState } from './states/LiquidState';
import { SolidState } from './states/SolidState';

interface StandardStatesProps {
    state: 'solid' | 'gas' | 'liquid';
}

export function StandardStates({ state }: StandardStatesProps) {
    const standardStates: Record<string, string> = {
        liquid: '/states/fluid_gif_800px_transparent.gif',
        solid: '/states/cube_gif_800px_transparent.gif',
        gas: '/states/cloud_gif_800px_violet.gif',
    };

    // Reference for the canvas element
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Function to handle resize
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            // Set canvas dimensions
            const width = canvas.offsetWidth;
            canvas.width = width;
            canvas.height = width; // Set height equal to width for a quadratic canvas
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
        <Suspense fallback={<img className="w-8" src={standardStates[state]} />}>
            <Canvas ref={canvasRef}>
                <Stage />
                <OrbitControls />
                {state === 'liquid' && <LiquidState />}
                {state === 'solid' && <SolidState />}
                {state === 'gas' && <GasState />}
            </Canvas>
        </Suspense>
    );
}
