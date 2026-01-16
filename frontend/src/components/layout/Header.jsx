import { BrainCircuit } from 'lucide-react';

export function Header() {
    return (
        <header className="max-w-6xl mx-auto mb-8 md:mb-12 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="p-3 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                <BrainCircuit size={32} className="text-white" />
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    AutoMail
                </h1>
                <p className="text-sm md:text-base text-slate-400">Triagem Inteligente de Emails com AI</p>
            </div>
        </header>
    );
}