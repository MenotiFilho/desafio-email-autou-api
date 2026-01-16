import { useState } from 'react';
import { Header } from './components/layout/Header';
import { InputForm } from './components/features/InputForm';
import { ResultDisplay } from './components/features/ResultDisplay';
import { useEmailAnalysis } from './hooks/useEmailAnalysis';

function App() {
  const [activeTab, setActiveTab] = useState('file');
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState('');

  const { loading, result, error, analyze, reset } = useEmailAnalysis();

  const handleFileChange = (newFile) => {
    setFile(newFile);
    reset();
  };

  const handleAnalyzeClick = () => {
    analyze(file, inputText, activeTab);
  };

  return (
    <div className="min-h-screen w-screen p-4 md:p-8 font-sans text-slate-100 bg-[#0f172a]">
      <Header />

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <InputForm
          activeTab={activeTab} setActiveTab={setActiveTab}
          file={file} setFile={handleFileChange}
          inputText={inputText} setInputText={setInputText}
          handleAnalyze={handleAnalyzeClick}
          loading={loading}
          error={error}
        />

        <ResultDisplay
          result={result}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;