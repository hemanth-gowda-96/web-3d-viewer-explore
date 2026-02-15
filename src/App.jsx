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

  const handleClear = () => {
    if (modelData?.fileMap) {
      modelData.fileMap.forEach(url => URL.revokeObjectURL(url));
    }
    setModelData(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="max-w-7xl mx-auto w-full p-4 md:p-8 flex-grow space-y-8">
        <header className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-4">
            <img src="/logo/zerothdesign.png" alt="Zeroth Designs Logo" className="h-16 w-auto" />
            <div className="h-12 w-px bg-border hidden md:block"></div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              3D Model Viewer
            </h1>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <FilePicker onFileSelect={handleFileSelect} onClear={handleClear} />

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
      </div>

      <footer className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© 2025 Zeroth Designs. All rights Reserved.</p>
        <div className="flex gap-4">
          <a href="https://zerothdesigns.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Website</a>
          <a href="https://www.linkedin.com/company/zerothdesigns" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
        </div>
        <p>Built for Conscious Engineering.</p>
      </footer>
    </div>
  );
}

export default App;
