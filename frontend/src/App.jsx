import { useState } from 'react';
import { Header } from './components/layout/Header';
import { InputForm } from './components/features/InputForm';
import { ResultDisplay } from './components/features/ResultDisplay';
import { analyzeEmail } from './services/api';

function App() {
  // Estados
  /* API Key state removed */
  const [activeTab, setActiveTab] = useState('file');
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Lógica de Negócio (Controlador)
  const handleAnalyze = async () => {
    // Validações
    if (activeTab === 'file' && !file) return setError('Selecione um arquivo.');
    if (activeTab === 'text' && !inputText.trim()) return setError('Digite o texto.');

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeEmail(activeTab === 'file' ? file : null, inputText);

      if (data.erro) {
        setError(data.erro);
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen p-4 md:p-8 font-sans text-slate-100 bg-[#0f172a]">
      <Header />

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <InputForm
          activeTab={activeTab} setActiveTab={setActiveTab}
          file={file} setFile={setFile}
          inputText={inputText} setInputText={setInputText}
          handleAnalyze={handleAnalyze}
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