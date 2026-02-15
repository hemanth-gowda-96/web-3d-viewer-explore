import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';

export function FilePicker({ onFileSelect }) {
    const [fileName, setFileName] = useState('');

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
                    <Input
                        type="file"
                        accept=".gltf,.glb,.bin,.jpg,.png,.jpeg"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                {fileName && (
                    <p className="text-sm font-medium text-center">
                        Current file: <span className="text-primary">{fileName}</span>
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
