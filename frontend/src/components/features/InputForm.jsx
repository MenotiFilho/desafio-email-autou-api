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

            <Button onClick={handleAnalyze} isLoading={loading} icon={Send}>
                Analisar Email
            </Button>
        </section>
    );
}