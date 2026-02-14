import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Center } from '@react-three/drei';
import { Suspense } from 'react';

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

export function ModelViewer({ url }) {
    if (!url) {
        return (
            <div className="flex items-center justify-center w-full h-full bg-secondary/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <p className="text-muted-foreground">Upload a .gltf or .glb file to preview</p>
            </div>
        );
    }

    return (
        <div className="w-full h-[600px] bg-black rounded-lg overflow-hidden shadow-2xl">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5}>
                        <Center>
                            <Model url={url} />
                        </Center>
                    </Stage>
                </Suspense>
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    );
}
