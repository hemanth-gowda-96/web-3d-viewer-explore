import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';

export function FilePicker({ onFileSelect, onClear }) {
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            // Find the main model file (.gltf or .glb)
            const mainFile = files.find(f => f.name.toLowerCase().endsWith('.gltf') || f.name.toLowerCase().endsWith('.glb'));

            if (!mainFile) {
                alert('Please select at least one .gltf or .glb file.');
                return;
            }

            setFileName(mainFile.name + (files.length > 1 ? ` (+${files.length - 1} files)` : ''));

            // Create a map of all files to their Blob URLs
            const fileMap = new Map();
            files.forEach(file => {
                fileMap.set(file.name, URL.createObjectURL(file));
            });

            onFileSelect({
                mainUrl: fileMap.get(mainFile.name),
                fileMap: fileMap
            });
        }
    };

    const handleClear = (e) => {
        e.stopPropagation();
        setFileName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onClear) {
            onClear();
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Upload 3D Model</CardTitle>
                <CardDescription>
                    Select a .gltf or .glb file (and its .bin/textures if needed).
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:bg-secondary/10 transition-colors cursor-pointer relative">
                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                        {fileName || 'Select model and associated files'}
                    </p>
                    <input
                        type="file"
                        accept=".gltf,.glb,.bin,.jpg,.png,.jpeg,.webp"
                        multiple
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                </div>
                {fileName && (
                    <div className="flex items-center justify-between p-2 bg-secondary/50 rounded-md border border-border">
                        <p className="text-sm font-medium truncate flex-1">
                            Current: <span className="text-primary">{fileName}</span>
                        </p>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClear}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
