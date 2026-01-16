import { AlertTriangle, CheckCircle, BrainCircuit, Loader2, Mail } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';

export function ResultDisplay({ result, loading }) {
    const isIdle = !result && !loading;
    const isProdutivo = result?.classificacao?.toLowerCase().includes('produtivo') &&
        !result?.classificacao?.toLowerCase().includes('im');

    const statusConfig = {
        idle: {
            color: 'slate',
            icon: BrainCircuit,
            title: 'Aguardando Análise',
            desc: 'Envie um email para ver a sugestão de resposta.',
            borderColor: 'border-slate-700',
            bgHeader: 'bg-slate-800'
        },
        loading: {
            color: 'blue',
            icon: Loader2,
            title: 'Analisando...',
            desc: 'A inteligência artificial está lendo seu email.',
            borderColor: 'border-blue-500/50',
            bgHeader: 'bg-blue-900/20'
        },
        produtivo: {
            color: 'green',
            icon: CheckCircle,
            title: 'Produtivo - Ação Necessária',
            desc: result?.motivo,
            borderColor: 'border-green-500',
            bgHeader: 'bg-green-500/10'
        },
        improdutivo: {
            color: 'red',
            icon: AlertTriangle,
            title: 'Improdutivo - Informativo',
            desc: result?.motivo,
            borderColor: 'border-red-500',
            bgHeader: 'bg-red-500/10'
        }
    };

    let currentStatus = statusConfig.idle;
    if (loading) currentStatus = statusConfig.loading;
    else if (result) currentStatus = isProdutivo ? statusConfig.produtivo : statusConfig.improdutivo;

    const StatusIcon = currentStatus.icon;

    return (
        <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
            <div className={`flex-1 flex flex-col bg-slate-900 border rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${currentStatus.borderColor}`}>

                <div className={`p-6 border-b border-slate-800 transition-colors duration-500 ${currentStatus.bgHeader} flex items-start gap-4`}>
                    <div className={`p-3 rounded-xl bg-slate-900/50 shadow-sm transition-colors duration-500 text-${currentStatus.color}-400`}>
                        <StatusIcon size={28} className={loading ? "animate-spin" : ""} />
                    </div>
                    <div>
                        <h2 className={`text-xl font-bold tracking-tight transition-colors duration-500 text-${currentStatus.color}-100`}>
                            {currentStatus.title}
                        </h2>
                        <p className="text-slate-400 text-sm mt-1 leading-relaxed max-w-md">
                            {currentStatus.desc}
                        </p>
                    </div>
                </div>

                <div className="flex-1 flex flex-col relative bg-slate-950/50">

                    <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-4 bg-slate-900/30">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest min-w-[60px]">Assunto</span>

                        {loading ? (
                            <div className="h-5 w-2/3 bg-slate-800 rounded animate-pulse" />
                        ) : (
                            <div className="flex-1 min-w-0 flex items-start justify-between gap-4 group">
                                <span className="font-medium text-slate-200 whitespace-pre-wrap break-words block mt-1">{result?.assunto}</span>
                                {!isIdle && (
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <CopyButton
                                            text={result?.assunto}
                                            label="Assunto"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 p-6 relative group flex justify-center gap-4">
                        {loading ? (
                            <div className="flex-1 space-y-3 animate-pulse">
                                <div className="h-4 bg-slate-800 rounded w-3/4" />
                                <div className="h-4 bg-slate-800 rounded w-full" />
                                <div className="h-4 bg-slate-800 rounded w-5/6" />
                                <div className="h-4 bg-slate-800 rounded w-1/2" />
                            </div>
                        ) : result ? (
                            <>
                                <textarea
                                    className="flex-1 h-full bg-transparent text-slate-300 focus:outline-none resize-none leading-relaxed font-sans text-base min-w-0"
                                    readOnly
                                    value={result.resposta}
                                />
                                <div className="flex-none pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <CopyButton
                                        text={result.resposta}
                                        label="Resposta"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600">
                                <Mail size={48} className="mb-4 opacity-20" />
                                <p className="text-sm font-medium opacity-50">Sua resposta aparecerá aqui</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}