/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global brackets: true, $, window, navigator , clearInterval , setInterval, d3, THREE, Stats , requestAnimationFrame*/

"use strict";


$.getJSON('./periodic-table.json', function(data){ //API Request
            
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            var pivot = new THREE.Object3D();
            var ordnungszahl = 0;   //Index Ordnungszahl

            let id = urlParams.get("id");

            if(id !== null) {
                ordnungszahl = parseInt(id);
            }
            $('.left').attr('href', '/detail/?id=' + (ordnungszahl - 1));
            $('.right').attr('href', '/detail/?id=' + (ordnungszahl + 1));
            var quaternion = new THREE.Quaternion();
            var object;
            
                // atomicNumber = Außenatomen; davon immer zwei auf der ersten schale und dann i.d.r 8
                // Spalten-Nummer ist Anzahl von Außenatomen

             var anzSchalen = 1;
             var config = data[ordnungszahl - 1].electronicConfiguration;
             var parts;
             var he = "1s2";
             var ne = he + " 2s2 2p6";
             var ar = ne + " 3s2 3p6";
             var kr = ar + " 3d10 4s2 4p6";
             var xe = kr + " 4d10 5s2 5p6";
             var rn = xe + " 4f14 5d10 6s2 6p6";


             if (config.includes("[He]")) {
                 anzSchalen = 2;
                 config = he + config.substring(4);
                 parts = config.split(" ");                 

             } else if (config.includes("[Ne]")) {
                 anzSchalen = 3;
                 config = ne + config.substring(4);
                 parts = config.split(" "); 

             } else if (config.includes("[Ar]")) {
                anzSchalen = 4;
                config = ar + config.substring(4);
                parts = config.split(" "); 

             } else if (config.includes("[Kr]")) {
                anzSchalen = 5;
                config = kr + config.substring(4);
                parts = config.split(" "); 

            } else if (config.includes("[Xe]")) {
                anzSchalen = 6;
                config = xe + config.substring(4);
                parts = config.split(" "); 

            } else if (config.includes("[Rn]")) {
                anzSchalen = 7;
                config = rn + config.substring(4);
                parts = config.split(" "); 

            } else {
                anzSchalen = 1;
                parts = config.split(" "); 
            }
             
             
             console.log(parts);
             var atomVerteilung = [];
             var spheresAtoms = [];


             for (var i=0; i<parts.length; i++) {
                 
                 var schalenNummer = parseInt(parts[i].substring(0,1));
                 var anzahl = parseInt(parts[i].substring(2));

                 if(atomVerteilung[schalenNummer-1] == null) {
                    atomVerteilung[schalenNummer-1] = anzahl;
                 } else {
                     atomVerteilung[schalenNummer-1] += anzahl;
                 }
             }
             console.log(atomVerteilung);
             console.log(data[ordnungszahl - 1].name);






             var anzElektronen = data[ordnungszahl - 1].atomicNumber;
             var anzAussenelektronen = (anzElektronen- 2) % 8;

             var kernZahl;
             if (ordnungszahl == 1) {
                 kernZahl = 2;
             } else {
                 kernZahl = 2*anzElektronen+1
             }

             




function sphereCollision(canvas) {

    var camera, scene, renderer;

    var mouse = new THREE.Vector2(),
        controls, force;
    var nodes, spheresNodes = [],
        root, raycaster = new THREE.Raycaster(),
        INTERSECTED;


    function rnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

     


    //Expansion of collision function from http://bl.ocks.org/mbostock/3231298

    function collide(node) {
        var r = node.radius,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r,
            nz1 = node.z - r,
            nz2 = node.z + r;
        return function (quad, x1, y1, z1, x2, y2, z2) {

            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    z = node.z - quad.point.z,
                    l = Math.sqrt(x * x + y * y + z * z),
                    r = node.radius + quad.point.radius;

                if (l < r) {

                    l = (l - r) / l * 0.5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    node.z -= z *= l;

                    quad.point.x += x;
                    quad.point.y += y;
                    quad.point.z += z;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1 || z1 > nz2 || z2 < nz1;
        };
    }


    function getSpherePackPositions(canvas) {

        var containerEle = $(canvas);
        var SCREEN_WIDTH = containerEle.innerWidth();
        var SCREEN_HEIGHT = containerEle.innerHeight();

        nodes = d3.range(kernZahl).map(function () { // Mapt die Kugeln; Anzahl festgelegt
            return {
                radius: rnd(100, 100)       // Radius der Kugeln
            };
        });
        root = nodes[0];
        root.radius = 0.1;
        root.fixed = true;

        force = d3.layout.force3D()
            .gravity(0.5)               //Anziehung
            .charge(function (d, i) {
                return i ? 0 : -5000;
            })
            .nodes(nodes)
            .size([SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 1]);

        force.start();

        return nodes;
    }
var angle = 1;

    function addSpheres() {

        //Schalen
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var xPos = 0;
        var yPos = 0;
        var R = 1500;  
        var abstand = 1000;
        pivot.position.set(0,0,0);
        pivot.rotation.set(0,0,0);

        //Versuch Schalenaufbau

        for (var s = 0; s < atomVerteilung.length; s++) {
            for (var n = 0; n < atomVerteilung[s]; n++) {

                xPos =R * Math.cos(n/atomVerteilung[s] * 2 * Math.PI); 
                yPos =R * Math.sin(n/atomVerteilung[s] * 2 * Math.PI);

                var geometry = new THREE.SphereGeometry(80, 50, 16);
                var material = new THREE.MeshLambertMaterial({
                    color: 0xFFFFFF, // Color Electrons
                });

                const circlegeometry = new THREE.RingGeometry( R, R+10, 80 );
                const circlematerial = new THREE.MeshBasicMaterial({ 
                    color: 0x816CFF, // Color Circles
                    side: THREE.DoubleSide,
                 });
                const circle = new THREE.Mesh( circlegeometry, circlematerial );
                scene.add( circle );


                var mesh = new THREE.Mesh(geometry, material);
                pivot.add(mesh);

                mesh.position.set(xPos, yPos, 0);    
                console.log(xPos);   
                // scene.add(mesh);

            }
            R += abstand;
            // mesh.rotation.z = value;

        }
        
        scene.add(pivot)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        var nodes = getSpherePackPositions(canvas);

        for (var i = 0; i < nodes.length; i++) {
            if(i % 2 == true) {
                var geo = new THREE.SphereGeometry(nodes[i].radius, 20, 20);
                var sphere = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({
                    color: 0x816CFF,     // hälfte dunkler
                }));
                var vec = new THREE.Vector3(nodes[i].x, nodes[i].y, nodes[i].z);
                sphere.position.add(vec);
                spheresNodes.push(sphere);
                scene.add(sphere); 

            } else {           
                var geo = new THREE.SphereGeometry(nodes[i].radius, 20, 20);
                var sphere = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({
                    color: 0xE1BEFF,     //hälfte heller
                }));
                var vec = new THREE.Vector3(nodes[i].x, nodes[i].y, nodes[i].z);
                sphere.position.add(vec);
                spheresNodes.push(sphere);
                scene.add(sphere); 
            }
        }
    }

    function updateSpheres() { //Position
        var q = d3.geom.octree(nodes);
        for (var i = 1; i < nodes.length; ++i) {
            q.visit(collide(nodes[i]));
            spheresNodes[i].position.x = nodes[i].x-300;
            spheresNodes[i].position.y = nodes[i].y-200;
            spheresNodes[i].position.z = nodes[i].z;
        }  

        
        //object = scene.getObjectByName('mesh');
    }



    function setupScreen(canvas) {

        var containerEle = $(canvas);

        //set camera
        camera = new THREE.PerspectiveCamera(45, containerEle.innerWidth() / containerEle.innerHeight(), 1, 100000);
        camera.position.set(0, -10000, 7000);

        // RENDERER

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        renderer.setSize(containerEle.innerWidth(), containerEle.innerHeight());
        renderer.domElement.style.position = 'absolute';
        containerEle.append(renderer.domElement);

        controls = new THREE.OrbitControls(camera, renderer.domElement);

        scene = new THREE.Scene();


        // LIGHTS

        var directionalLight = new THREE.DirectionalLight("#ffffff", 0.5);
        directionalLight.position.set(100, 100, -100);
        scene.add(directionalLight);

        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.25);
        hemiLight.position.y = 5100;
        scene.add(hemiLight);

        var axes = new THREE.AxisHelper(1000);
        // scene.add(axes);


        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            camera.aspect = containerEle.innerWidth() / containerEle.innerHeight();
            camera.updateProjectionMatrix();
            renderer.setSize(containerEle.innerWidth(), containerEle.innerHeight());

        }

     

        addSpheres();


    }

    


    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {


        updateSpheres();
        pivot.rotation.z += 0.002;

        renderer.render(scene, camera);


    }




    setupScreen(canvas);
    animate();
}


$(function () {
    sphereCollision($('#stage'));
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dynamic View

var standardState = data[ordnungszahl-1].standardState
var pElement = data[ordnungszahl-1]

if(standardState == "solid") {
    $('.standardstate').attr('src', './static/solid_cube_masked.webm');
} else if (standardState == "liquid") {
    $('.standardstate').attr('src', './static/fluid_sphere_masked.webm');
} else if (standardState == "gas") {
    $('.standardstate').attr('src', './static/cloud_sphere_masked.webm');
} else {
    $('.standardstate').attr('src', '');
}

$('#atomicnumber').text(pElement.atomicNumber)
$('#symbol').text(pElement.symbol)
$('#name').text(pElement.name)

$('#groupblock').text(pElement.groupBlock)
$('#boilingpoint').text(pElement.boilingPoint)
$('#electronegativity').text(pElement.electronegativity)
$('#yeardiscovered').text(pElement.yearDiscovered)

$('.state').text(pElement.standardState)
})

$('.x, .logo').on('click', () => {
    window.location.replace('/?started=true');
})