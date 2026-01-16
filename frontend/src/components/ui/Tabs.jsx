import { Upload, FileText } from 'lucide-react';

export function Tabs({ activeTab, setActiveTab }) {
    return (
        <div className="flex p-1 bg-slate-900 rounded-lg mb-6 border border-slate-700">
            {['file', 'text'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === tab
                        ? 'bg-slate-700 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    {tab === 'file' ? (
                        <>
                            <Upload size={16} /> Arquivo
                        </>
                    ) : (
                        <>
                            <FileText size={16} /> Texto
                        </>
                    )}
                </button>
            ))}
        </div>
    );
}
