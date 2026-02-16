import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export function ModelConfigurator({ onModelSelect }) {
    const [configs, setConfigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selections, setSelections] = useState({
        OPT_DRV: '',
        TERMINAL: '',
        EPAC: '',
        GEAR_BOX: '',
        GEAR_BOX_REQ: 'NO'
    });
    const [currentMatch, setCurrentMatch] = useState(null);

    useEffect(() => {
        fetch('/assets/config/model_configs.json')
            .then(res => res.json())
            .then(data => {
                setConfigs(data.data);
                if (data.data.length > 0) {
                    const first = data.data[0];
                    setSelections({
                        OPT_DRV: first.OPT_DRV,
                        TERMINAL: first.TERMINAL,
                        EPAC: first.EPAC,
                        GEAR_BOX: first.GEAR_BOX,
                        GEAR_BOX_REQ: first.GEAR_BOX_REQ
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load model configs:", err);
                setLoading(false);
            });
    }, []);

    const options = useMemo(() => {
        const keys = ['OPT_DRV', 'TERMINAL', 'EPAC', 'GEAR_BOX', 'GEAR_BOX_REQ'];
        const optMap = {};
        keys.forEach(key => {
            optMap[key] = Array.from(new Set(configs.map(item => item[key])));
        });
        return optMap;
    }, [configs]);

    useEffect(() => {
        if (configs.length === 0) return;

        const match = configs.find(item =>
            item.OPT_DRV === selections.OPT_DRV &&
            item.TERMINAL === selections.TERMINAL &&
            item.EPAC === selections.EPAC &&
            item.GEAR_BOX === selections.GEAR_BOX &&
            item.GEAR_BOX_REQ === selections.GEAR_BOX_REQ
        );

        if (match) {
            setCurrentMatch(match);
            onModelSelect({
                mainUrl: '/' + match.File,
                fileMap: new Map() // Empty map for static public files
            });
        } else {
            setCurrentMatch(null);
        }
    }, [selections, configs, onModelSelect]);

    const handleChange = (key, value) => {
        setSelections(prev => ({ ...prev, [key]: value }));
    };

    if (loading) return <div>Loading configurations...</div>;
    if (configs.length === 0) return null;

    return (
        <Card className="border border-border bg-secondary/30">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Model Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    {Object.keys(options).map(key => {
                        if (key === 'GEAR_BOX_REQ') {
                            return (
                                <div key={key} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={key}
                                        checked={selections[key] === 'YES'}
                                        onChange={(e) => handleChange(key, e.target.checked ? 'YES' : 'NO')}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Gear Box Required
                                    </label>
                                </div>
                            );
                        }

                        return (
                            <div key={key} className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase text-muted-foreground">{key.replace('_', ' ')}</label>
                                <select
                                    value={selections[key]}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {options[key].map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>

                {currentMatch && currentMatch.STEP_FILE && (
                    <div className="pt-4 border-t border-border mt-4">
                        <a
                            href={'/' + currentMatch.STEP_FILE}
                            download={currentMatch.STEP_FILE.split('/').pop()}
                            className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                            Download STEP File
                        </a>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
