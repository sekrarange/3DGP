// 3D Graphics Programming
// Module 4 solution
// Jouni Ala
// 1201110

var CANVAS_WIDTH = 1280,
         CANVAS_HEIGHT = 720;

var      renderer = null,     //WebGL or 2D
         scene = null,      //scene object
         camera = null,    //camera object
         cameraObject = null;

var shoulder = null,
    upper = null,
    elbow = null,
    lower = null,
    hand = null,
    finger = [];

document.onkeydown = function (e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        cameraObject.rotation.y -= 0.05;
    }
    else if (e.keyCode == '39') {
        cameraObject.rotation.y += 0.05;
    }
}

function Initialize()
{
    renderer = new THREE.WebGLRenderer({
        clearColor: 0x037703,
        clearAlpha: 1
    });
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    cameraObject = new THREE.Object3D();
    camera = new THREE.PerspectiveCamera(
        35,
        CANVAS_WIDTH / CANVAS_HEIGHT,
        .1,
        1000
        );

    cameraObject.add(camera);
    camera.position.set(0, 5, -50);
    camera.lookAt(scene.position);
    scene.add(cameraObject);

    shoulder = new THREE.Mesh(new THREE.SphereGeometry(1),
                            new THREE.MeshBasicMaterial({ color: 0x005050 }));
    scene.add(shoulder);

    upper = new THREE.Mesh(new THREE.CubeGeometry(1, 3, 1),
                           new THREE.MeshBasicMaterial({ color: 0xFF2020 }));
    shoulder.add(upper);
    upper.position.y = 2;

    elbow = new THREE.Mesh(new THREE.SphereGeometry(1),
                           new THREE.MeshBasicMaterial({ color: 0x6AC380 }));
    upper.add(elbow);
    elbow.position.y = 1.5;

    lower = new THREE.Mesh(new THREE.CubeGeometry(1, 3, 1),
                           new THREE.MeshBasicMaterial({ color: 0xFF2020 }));
    elbow.add(lower);
    lower.position.y = 1.5;

    var handgeometry = new THREE.CubeGeometry(1.75, 2, 1);
    handgeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1, 0));
    hand = new THREE.Mesh(handgeometry,
                          new THREE.MeshBasicMaterial({ color: 0x0000FF }));
    lower.add(hand);
    hand.position.y = 1.5;

    for (i = 0; i < 4; i++)
    {
        finger.push(new THREE.Mesh(new THREE.CubeGeometry(0.4, 1.5, 0.6),
                              new THREE.MeshBasicMaterial({ color: 0xE5F082 })));
        hand.add(finger[i]);
        finger[i].position.y = 2.75;
    };

    finger[0].position.x = -0.75;
    finger[2].position.x = 0.5;
    finger[3].position.x = -1.3;
    finger[3].position.y = 1.5;
    finger[3].rotation.z = Math.PI / 4;

    requestAnimationFrame(Update);
}

var timer = 0.0;

function Update()
{
    renderer.render(scene, camera);

    timer += 0.05;
    shoulder.rotation.z = Math.cos(timer);
    elbow.rotation.z = Math.sin(timer);
    hand.rotation.x = Math.cos(timer * 2);


    requestAnimationFrame(Update);
}