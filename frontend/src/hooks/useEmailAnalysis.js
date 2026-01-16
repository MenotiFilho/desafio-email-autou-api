import { useState } from 'react';
import { analyzeEmail } from '../services/api';

export function useEmailAnalysis() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const analyze = async (file, text, activeTab) => {
        if (activeTab === 'file' && !file) {
            setError('Selecione um arquivo.');
            return;
        }
        if (activeTab === 'text' && !text?.trim()) {
            setError('Digite o texto.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const data = await analyzeEmail(activeTab === 'file' ? file : null, text);

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

    const reset = () => {
        setResult(null);
        setError('');
    };

    return {
        loading,
        result,
        error,
        analyze,
        reset
    };
}
