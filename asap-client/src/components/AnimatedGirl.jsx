import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "../pages/LoginPage"; // Import styles

const AnimatedGirl = ({ showSpeech }) => {
    const mountRef = useRef(null);
    const modelRef = useRef(null);
    const mixerRef = useRef(null);

    useEffect(() => {
        // Create Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(250, 250); // Increased size for better quality
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Load 3D Model
        const loader = new GLTFLoader();
        loader.load(
            "/girl_speedsculpt.glb",
            (gltf) => {
                const model = gltf.scene;
                modelRef.current = model; // ✅ Now properly assigned
                scene.add(model);

                // ✅ Increase size for better quality
                model.scale.set(1.8, 1.8, 1.8);
                model.position.set(5, 0.1, 0);

                // ✅ Animations (waving)
                mixerRef.current = new THREE.AnimationMixer(model); // ✅ Now properly assigned

                if (gltf.animations.length > 0) {
                    const waveAction = mixerRef.current.clipAction(gltf.animations[0]); // Assuming the first animation is waving
                    waveAction.play();
                }
            },
            undefined,
            (error) => console.error("Error loading 3D model:", error)
        );

        // Camera Position
        camera.position.set(0, -0.5, 3);

        // Animation Loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            if (mixerRef.current) mixerRef.current.update(delta);
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    // ✅ Hover Effects (Wave & Wink)
    const handleMouseEnter = () => {
        if (mixerRef.current && modelRef.current) {
            // Check if model has animations
            if (modelRef.current.animations && modelRef.current.animations.length > 1) {
                const winkAnimation = mixerRef.current.clipAction(modelRef.current.animations[1]); // Assuming second animation is winking
                winkAnimation.setLoop(THREE.LoopOnce);
                winkAnimation.reset();
                winkAnimation.play();
            } else {
                console.warn("No wink animation found!");
            }
        } else {
            console.warn("Model or mixer not initialized yet.");
        }
    };

    return (
        <div className="girl-container" onMouseEnter={handleMouseEnter}>
            <div ref={mountRef} className="girl-animation"></div>
            {showSpeech && (
                <div className="speech-bubble">
                    <p>If you don't have an account, you should sign up.</p>
                </div>
            )}
        </div>
    );
};

export default AnimatedGirl;
