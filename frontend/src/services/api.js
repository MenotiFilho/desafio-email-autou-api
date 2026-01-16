import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

export const analyzeEmail = async (file, text) => {
    const formData = new FormData();

    // Se tiver chave, envia (REMOVIDO)
    // if (apiKey) formData.append('api_key', apiKey);

    // Decide o que enviar
    if (file) {
        formData.append('file', file);
    } else {
        formData.append('text', text);
    }

    const response = await axios.post(`${API_URL}/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 5000 // 5 seconds timeout
    });

    return response.data;
};