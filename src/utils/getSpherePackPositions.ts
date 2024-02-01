import { randomNumber } from './random';

/**
 * Generates positions for a packed sphere arrangement within a given canvas.
 *
 * @param {HTMLElement} canvas - The container element representing the canvas.
 * @param {number} nucleusNumber - The number of spheres in the nucleus.
 * @returns {Array} An array of objects representing sphere positions with properties (radius, x, y, z).
 */
export const getSpherePackPositions = (canvas, nucleusNumber: number) => {
    const SCREEN_WIDTH = canvas.domElement.clientWidth;
    const SCREEN_HEIGHT = canvas.domElement.clientHeight;

    const nodes = d3.range(nucleusNumber).map(() => {
        return {
            radius: randomNumber(100, 100),
            x: Math.random() * SCREEN_WIDTH - SCREEN_WIDTH / 2,
            y: Math.random() * SCREEN_HEIGHT - SCREEN_HEIGHT / 2,
            z: 0,
        };
    });

    const root = nodes[0];
    root.radius = 0.1;
    root.fixed = true;

    const force = d3.layout
        .force3D()
        .gravity(0.5)
        .charge(function (d, i) {
            return i ? 0 : -5000;
        })
        .nodes(nodes)
        .size([SCREEN_WIDTH, SCREEN_HEIGHT, 1]);

    force.start();

    return nodes;
};
