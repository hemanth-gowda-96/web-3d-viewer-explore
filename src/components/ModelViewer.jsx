import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Center } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import { updateCameraView } from '../lib/threejs/viewUtils';
import { createModelLoadingManager } from '../lib/threejs/modelUtils';

function Model({ modelData }) {
    const { mainUrl, fileMap } = modelData;

    // Use memo to ensure manager is only created when fileMap changes
    const manager = useMemo(() => createModelLoadingManager(fileMap), [fileMap]);

    const { scene } = useGLTF(mainUrl, false, false, (loader) => {
        loader.manager = manager;
    });

    return <primitive object={scene} />;
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
        <div className="w-full h-[600px] bg-black rounded-lg overflow-hidden shadow-2xl relative">
            <ViewControls controlsRef={controlsRef} />
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5}>
                        <Center>
                            <Model modelData={modelData} />
                        </Center>
                    </Stage>
                </Suspense>
                <OrbitControls ref={controlsRef} makeDefault />
            </Canvas>
        </div>
    );
}


