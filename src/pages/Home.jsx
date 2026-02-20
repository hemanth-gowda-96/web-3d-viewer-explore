import { useState, lazy, Suspense, useCallback } from 'react';
import { FilePicker } from '../components/FilePicker';
import { ModelConfigurator } from '../components/ModelConfigurator';

const ModelViewer = lazy(() => import('../components/ModelViewer').then(module => ({ default: module.ModelViewer })));

export function Home() {
  const [modelData, setModelData] = useState(null);
  const [activeTab, setActiveTab] = useState('config'); // 'config' or 'upload'

  const handleFileSelect = useCallback((data) => {
    setModelData(prev => {
      if (prev?.mainUrl === data.mainUrl) return prev;
      if (prev?.fileMap) {
        prev.fileMap.forEach(url => URL.revokeObjectURL(url));
      }
      return data;
    });
  }, []);

  const handleConfigSelect = useCallback((data) => {
    setModelData(prev => {
      // Guard against redundant updates to prevent infinite loops and re-zooming
      if (prev?.mainUrl === data.mainUrl) return prev;
      if (prev?.fileMap) {
        prev.fileMap.forEach(url => URL.revokeObjectURL(url));
      }
      return data;
    });
  }, []);

  const handleClear = useCallback(() => {
    setModelData(prev => {
      if (prev?.fileMap) {
        prev.fileMap.forEach(url => URL.revokeObjectURL(url));
      }
      return null;
    });
  }, []);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 flex flex-col space-y-6">
        <div className="flex p-1 bg-secondary/50 rounded-lg border border-border">
          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'config'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            Configuration
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'upload'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            File Upload
          </button>
        </div>

        {activeTab === 'config' ? (
          <ModelConfigurator onModelSelect={handleConfigSelect} />
        ) : (
          <FilePicker onFileSelect={handleFileSelect} onClear={handleClear} />
        )}

        <div className="p-4 bg-secondary/30 rounded-lg border border-border">
          <h3 className="font-semibold mb-2">Instructions</h3>
          <ul className="text-sm list-disc list-inside space-y-1 text-muted-foreground">
            <li>{activeTab === 'config' ? "Select options to view a pre-configured model." : "Upload a .gltf or .glb file."}</li>
            <li>Use mouse to rotate (Left Click).</li>
            <li>Zoom in/out (Scroll).</li>
            <li>Pan around (Right Click).</li>
          </ul>
        </div>
      </div>

      <div className="lg:col-span-2">
        <Suspense fallback={<div className="w-full h-[600px] flex items-center justify-center bg-secondary/10 rounded-lg">Loading 3D Viewer...</div>}>
          <ModelViewer modelData={modelData} />
        </Suspense>
      </div>
    </main>
  );
}
