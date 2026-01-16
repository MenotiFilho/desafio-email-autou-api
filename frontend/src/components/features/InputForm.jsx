import { useState, useEffect } from 'react';
import { Upload, FileText, Send, X, Trash2, Eye } from 'lucide-react';
import { Button } from '../ui/Button';

export function InputForm({
    activeTab, setActiveTab,
    file, setFile,
    inputText, setInputText,
    handleAnalyze, loading, error
}) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [textContent, setTextContent] = useState('');

    // Limpa preview ao mudar arquivo
    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            setTextContent('');
            return;
        }

        if (file.type === 'application/pdf') {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
        else if (file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (e) => setTextContent(e.target.result);
            reader.readAsText(file);
        }
    }, [file]);

    const removeFile = (e) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm h-fit">

            {/* --- BLOCO DA API KEY REMOVIDO --- */}

            {/* Tabs */}
            <div className="flex p-1 bg-slate-900 rounded-lg mb-6 border border-slate-700">
                {['file', 'text'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === tab ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        {tab === 'file' ? <><Upload size={16} /> Arquivo</> : <><FileText size={16} /> Texto</>}
                    </button>
                ))}
            </div>

            {/* Área de Input */}
            <div className="min-h-[300px] mb-6">
                {activeTab === 'file' ? (
                    // MODO ARQUIVO
                    !file ? (
                        <div className="h-[300px] border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center hover:border-blue-500 hover:bg-slate-800/80 transition-all cursor-pointer relative group">
                            <input
                                type="file"
                                accept=".pdf,.txt"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="p-4 bg-slate-700 group-hover:bg-slate-600 rounded-full transition-colors mb-4">
                                <Upload size={24} className="text-blue-400" />
                            </div>
                            <p className="font-medium text-slate-200">Clique ou arraste um arquivo</p>
                            <p className="text-xs text-slate-500 mt-1">PDF ou TXT</p>
                        </div>
                    ) : (
                        <div className="relative h-[300px] border border-slate-600 rounded-xl overflow-hidden bg-slate-900 flex flex-col">
                            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                                <div className="flex items-center gap-2 text-sm text-slate-300 truncate max-w-[80%]">
                                    <FileText size={16} className="text-blue-400" />
                                    <span className="truncate">{file.name}</span>
                                </div>
                                <button
                                    onClick={removeFile}
                                    className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-md transition-colors"
                                    title="Remover arquivo"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-auto p-4 bg-slate-900/50">
                                {file.type === 'application/pdf' && previewUrl ? (
                                    <iframe
                                        src={previewUrl}
                                        className="w-full h-full rounded-md border border-slate-700"
                                        title="Preview PDF"
                                    />
                                ) : file.type === 'text/plain' ? (
                                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                                        {textContent}
                                    </pre>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                        <Eye size={48} className="mb-2 opacity-50" />
                                        <p>Preview não disponível</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                ) : (
                    // MODO TEXTO
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Cole o corpo do email aqui..."
                        className="w-full h-[300px] bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed font-mono text-sm"
                    ></textarea>
                )}
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center animate-pulse">
                    {error}
                </div>
            )}

            <Button onClick={handleAnalyze} isLoading={loading} icon={Send}>
                Analisar Email
            </Button>
        </section>
    );
}