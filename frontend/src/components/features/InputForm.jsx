import { Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { FileUpload } from '../ui/FileUpload';

export function InputForm({
    activeTab, setActiveTab,
    file, setFile,
    inputText, setInputText,
    handleAnalyze, loading, error
}) {
    return (
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm h-fit">

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="min-h-[300px] mb-6">
                {activeTab === 'file' ? (
                    <FileUpload file={file} setFile={setFile} />
                ) : (
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

            <div className="flex gap-3">
                <Button onClick={handleAnalyze} isLoading={loading} icon={Send} className="flex-1">
                    Analisar Email
                </Button>

                <button
                    onClick={() => {
                        setFile(null);
                        setInputText('');
                    }}
                    disabled={loading || (!file && !inputText)}
                    className="px-4 py-2 text-slate-400 rounded-lg border border-transparent transition-all font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:text-white enabled:hover:bg-slate-700/50 enabled:hover:border-slate-600"
                >
                    Novo Email
                </button>
            </div>
        </section>
    );
}