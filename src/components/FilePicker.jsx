import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';

export function FilePicker({ onFileSelect }) {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const url = URL.createObjectURL(file);
            onFileSelect(url);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Upload 3D Model</CardTitle>
                <CardDescription>
                    Select a .gltf or .glb file to render it in the 3D viewer.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:bg-secondary/10 transition-colors cursor-pointer relative">
                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                        {fileName || 'Drag and drop or click to upload'}
                    </p>
                    <Input
                        type="file"
                        accept=".gltf,.glb"
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
