import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyButton({ text, label, className = "" }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`flex-none p-2 bg-slate-800/50 hover:bg-slate-700/80 backdrop-blur-sm rounded-lg text-slate-400 hover:text-white transition-all shadow-sm border border-slate-700/50 group/btn ${className}`}
            title={`Copiar ${label}`}
        >
            <div className="relative">
                {isCopied ? (
                    <Check size={16} className="text-green-400" />
                ) : (
                    <Copy size={16} />
                )}
            </div>
        </button>
    );
}
