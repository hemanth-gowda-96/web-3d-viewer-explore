import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Center } from '@react-three/drei';
import { Suspense } from 'react';

import { LoadingManager } from 'three';

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

export function ModelViewer({ modelData }) {
    if (!modelData?.mainUrl) {
        return (
            <div className="flex items-center justify-center w-full h-full bg-secondary/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <p className="text-muted-foreground">Upload a .gltf or .glb file (and assets) to preview</p>
            </div>
        );
    }

    return (
        <div className="w-full h-[600px] bg-black rounded-lg overflow-hidden shadow-2xl">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5}>
                        <Center>
                            <Model modelData={modelData} />
                        </Center>
                    </Stage>
                </Suspense>
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    );
}
