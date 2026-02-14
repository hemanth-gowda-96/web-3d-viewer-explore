import { useState } from 'react'
import { Button } from "@/components/ui/button"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Vite + React + Tailwind + shadcn/ui
        </h1>
        <p className="text-xl text-slate-400">
          State-of-the-art setup for modern web exploration.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 p-8 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          Interactive Demo
        </p>
        <Button
          variant="default"
          size="lg"
          onClick={() => setCount((count) => count + 1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          Count is {count}
        </Button>
        <p className="text-slate-500 text-sm">
          Click the button above to test the shadcn component.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="px-4 py-2 rounded-md bg-slate-800 text-slate-400 text-xs font-mono">
          jsconfig.json
        </div>
        <div className="px-4 py-2 rounded-md bg-slate-800 text-slate-400 text-xs font-mono">
          tailwind.config.js
        </div>
        <div className="px-4 py-2 rounded-md bg-slate-800 text-slate-400 text-xs font-mono">
          components.json
        </div>
      </div>
    </div>
  )
}

export default App
