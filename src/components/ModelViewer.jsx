import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Center } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { LoadingManager, Vector3 } from 'three';

function Model({ modelData }) {
    const { mainUrl, fileMap } = modelData;

    // Create a LoadingManager to handle relative paths
    const manager = new LoadingManager();
    manager.setURLModifier((url) => {
        // url is the relative path found in the gltf (e.g., "PartDesignExample-Body.bin")
        // We check if it's in our fileMap
        const fileName = url.split('/').pop();
        if (fileMap.has(fileName)) {
            return fileMap.get(fileName);
        }
        return url;
    });

    const { scene } = useGLTF(mainUrl, false, false, (loader) => {
        loader.manager = manager;
    });

    return <primitive object={scene} />;
}

const ViewControls = ({ controlsRef }) => {
    const setView = (view) => {
        if (!controlsRef.current) return;

        const camera = controlsRef.current.object;
        // Calculate distance based on current camera distance
        const distance = camera.position.length() || 5;
        const target = new Vector3(0, 0, 0);

        switch (view) {
            case 'front':
                camera.position.set(0, 0, distance);
                break;
            case 'back':
                camera.position.set(0, 0, -distance);
                break;
            case 'up':
                camera.position.set(0, distance, 0);
                break;
            case 'down':
                camera.position.set(0, -distance, 0);
                break;
            default:
                break;
        }

        camera.lookAt(target);
        controlsRef.current.target.copy(target);
        controlsRef.current.update();
    };

    return (
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <button
                onClick={() => setView('front')}
                className="px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded border border-white/20 transition-colors backdrop-blur-sm"
            >
                Front
            </button>
            <button
                onClick={() => setView('back')}
                className="px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded border border-white/20 transition-colors backdrop-blur-sm"
            >
                Back
            </button>
            <button
                onClick={() => setView('up')}
                className="px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded border border-white/20 transition-colors backdrop-blur-sm"
            >
                Up
            </button>
            <button
                onClick={() => setView('down')}
                className="px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded border border-white/20 transition-colors backdrop-blur-sm"
            >
                Down
            </button>
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

