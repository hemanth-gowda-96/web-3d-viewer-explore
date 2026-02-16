import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Bounds } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import { updateCameraView } from '../lib/threejs/viewUtils';
import { createModelLoadingManager } from '../lib/threejs/modelUtils';

function Model({ modelData }) {
    const { mainUrl, fileMap } = modelData;
    const manager = useMemo(() => createModelLoadingManager(fileMap), [fileMap]);

    const { scene } = useGLTF(mainUrl, 'https://www.gstatic.com/draco/v1/decoders/', false, (loader) => {
        loader.manager = manager;
    });

    // Programmatically optimize materials for CAD clarity
    useMemo(() => {
        scene.traverse((child) => {
            if (child.isMesh && child.material) {
                // Reduce environment reliance and metalness to avoid "dark steel" look
                child.material.envMapIntensity = 0.5;
                if (child.material.metalness > 0.5) {
                    child.material.metalness = 0.2;
                }
                child.material.roughness = 0.4; // Ensure it's not too shiny/reflective
                child.material.needsUpdate = true;
            }
        });
    }, [scene]);

    // Clone to ensure clean state
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    return <primitive object={clonedScene} />;
}

const ViewControls = ({ controlsRef }) => {
    const setView = (view) => {
        if (!controlsRef.current) return;
        updateCameraView(controlsRef.current.object, controlsRef.current, view);
    };

    return (
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {['front', 'back', 'up', 'down'].map((view) => (
                <button
                    key={view}
                    onClick={() => setView(view)}
                    className="px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded border border-white/20 transition-colors backdrop-blur-sm capitalize"
                >
                    {view}
                </button>
            ))}
        </div>
    );
};

export function ModelViewer({ modelData }) {
    const controlsRef = useRef();

    if (!modelData?.mainUrl) {
        return (
            <div className="flex items-center justify-center w-full h-full bg-secondary/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <p className="text-muted-foreground">Upload a .gltf or .glb file (and assets) to preview</p>
            </div>
        );
    }

    return (
        <div className="w-full h-[600px] bg-[#1a1a1a] rounded-lg overflow-hidden shadow-2xl relative">
            <ViewControls controlsRef={controlsRef} />
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                shadows={false}
                gl={{
                    toneMappingExposure: 1.5,
                    antialias: true
                }}
            >
                {/* Clean CAD Lighting Setup (3-Point + Vertical Fill) */}
                <ambientLight intensity={0.8} />

                {/* Key Light: High intensity from front-side */}
                <directionalLight position={[10, 10, 10]} intensity={1.5} />

                {/* Fill Light: Softens shadows from the key light */}
                <directionalLight position={[-10, 5, 5]} intensity={1.0} />

                {/* Back Light: Highlights edges and adds depth */}
                <directionalLight position={[0, 10, -10]} intensity={0.8} />

                {/* Bottom Light: Eliminates dark shadows from below */}
                <directionalLight position={[0, -10, 0]} intensity={1.0} />

                <Suspense fallback={null}>
                    <Bounds fit observe margin={1.2}>
                        <Center top>
                            <Model modelData={modelData} />
                        </Center>
                    </Bounds>
                </Suspense>
                <OrbitControls ref={controlsRef} makeDefault />
            </Canvas>
        </div>
    );
}
