import { useState } from 'react';
import { ModelViewer } from './components/ModelViewer';
import { FilePicker } from './components/FilePicker';
import './App.css';

function App() {
  const [modelData, setModelData] = useState(null);

  const handleFileSelect = (data) => {
    // Revoke previous URLs to avoid memory leaks
    if (modelData?.fileMap) {
      modelData.fileMap.forEach(url => URL.revokeObjectURL(url));
    }
    setModelData(data);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            3D Model Viewer
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore your 3D creations directly in the browser.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <FilePicker onFileSelect={handleFileSelect} />

            <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">Instructions</h3>
              <ul className="text-sm list-disc list-inside space-y-1 text-muted-foreground">
                <li>Upload a <code>.gltf</code> or <code>.glb</code> file.</li>
                <li>Use mouse to rotate (Left Click).</li>
                <li>Zoom in/out (Scroll).</li>
                <li>Pan around (Right Click).</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ModelViewer modelData={modelData} />
          </div>
        </main>

        <footer className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          Built with React, Three.js, and Tailwind CSS.
        </footer>
      </div>
    </div>
  );
}

export default App;
