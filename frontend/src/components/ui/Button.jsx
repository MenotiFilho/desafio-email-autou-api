import { Loader2 } from 'lucide-react';

export function Button({ children, onClick, isLoading, icon: Icon, disabled, className = "" }) {
    return (
        <button
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group ${className}`}
        >
            {isLoading ? <Loader2 className="animate-spin" /> : (
                <>
                    {Icon && <Icon size={18} />}
                    {children}
                </>
            )}
        </button>
    );
}