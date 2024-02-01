//Expansion of collision function from http://bl.ocks.org/mbostock/3231298
export const collide = (node) => {
    const r = node.radius,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r,
        nz1 = node.z - r,
        nz2 = node.z + r;
    return function (quad, x1, y1, z1, x2, y2, z2) {
        if (quad.point && quad.point !== node) {
            let x = node.x - quad.point.x,
                y = node.y - quad.point.y,
                z = node.z - quad.point.z,
                l = Math.sqrt(x * x + y * y + z * z),
                r = node.radius + quad.point.radius;

            if (l < r) {
                l = ((l - r) / l) * 0.5;
                node.x -= x *= l;
                node.y -= y *= l;
                node.z -= z *= l;

                quad.point.x += x;
                quad.point.y += y;
                quad.point.z += z;
            }
        }
        return (
            x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1 || z1 > nz2 || z2 < nz1
        );
    };
};
