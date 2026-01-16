import { Loader2 } from 'lucide-react';

export function Button({ children, isLoading, icon: Icon, ...props }) {
    return (
        <button
            disabled={isLoading}
            className="w-full py-4 rounded-xl font-bold text-white transition-all 
                 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500
                 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]
                 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            {...props}
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