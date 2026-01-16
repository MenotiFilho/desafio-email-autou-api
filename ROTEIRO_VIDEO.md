# Roteiro para Vídeo Demonstrativo - Desafio Autou

**Duração Alvo:** 3 a 5 minutos.
**Objetivo:** Apresentar a solução de auditoria de e-mails com IA, demonstrando funcionalidade e explicando decisões técnicas.

---

## 1. Introdução (0:00 - 0:30)

**Cena:** Você na câmera (ou tela com slide de título "AutoMail - Auditor Inteligente de E-mails").

**Falas Sugeridas:**
> "Olá, meu nome é [Seu Nome] e este vídeo é a apresentação da minha solução para o desafio técnico da Autou."
> "O objetivo foi criar uma ferramenta inteligente capaz de analisar e-mails corporativos, classificando-os automaticamente como 'Produtivos' ou 'Improdutivos' e sugerindo respostas adequadas, tudo isso utilizando Inteligência Artificial Generativa."
> "Vamos ver como funciona na prática."

---

## 2. Demonstração (0:30 - ~3:30)

**Cena:** Compartilhamento de tela. Mostre o Browser com a aplicação rodando (`http://localhost:5173`).

**Passo a Passo (Ação + Fala):**

1.  **Visão Geral (15s):**
    *   **Ação:** Mostre a interface limpa e moderna.
    *   **Fala:** "Esta é a interface web da aplicação, desenvolvida para ser intuitiva. Do lado esquerdo temos a área de entrada (upload ou texto) e do lado direito, o painel de resultados."

2.  **Cenário 1: Email Improdutivo (1 min):**
    *   **Ação:** Digite ou cole um texto simples, ex: *"Oi, valeu pelo café ontem!"*. Clique em **Analisar**.
    *   **Fala:** "Primeiro, vou testar com um e-mail informal, apenas um agradecimento. Ao clicar em 'Analisar', o frontend envia os dados para nossa API."
    *   **Ação:** Mostre o resultado aparecendo.
    *   **Fala:** "Veja que a IA classificou corretamente como **'Improdutivo'**. O motivo é claro: é apenas social, sem demanda de trabalho. E a resposta sugerida é um encerramento educado."

3.  **Cenário 2: Email Produtivo com Arquivo (1 min e 45s):**
    *   **Ação:** Clique na aba 'Arquivo' (se houver) ou mostre o botão de Upload. Selecione um PDF (ex: um comprovante ou dúvida técnica).
    *   **Fala:** "Agora, um cenário real. Vou fazer o upload de um arquivo PDF contendo uma solicitação de cliente."
    *   **Ação:** Aguarde o processamento.
    *   **Fala:** "O sistema extrai o texto do PDF automaticamente. Veja o resultado: Classificação **'Produtivo'**. A IA identificou que é uma solicitação de suporte e já preparou um rascunho de resposta formal abordando o problema descrito no anexo."

---

## 3. Explicação Técnica (3:30 - 4:30)

**Cena:** Pode manter a tela da aplicação ou mostrar o VS Code com a estrutura de pastas aberta (opcional).

**Falas Sugeridas (Pontos Chave):**

*   **Arquitetura:** "A solução utiliza uma arquitetura desacoplada."
    *   **Backend:** "Construído em **Python com FastAPI**, escolhido pela performance assíncrona e facilidade de criação de APIs robustas."
    *   **Frontend:** "Desenvolvido com **React e Vite**, utilizando **Tailwind CSS** para uma interface responsiva e moderna."
    
*   **A Inteligência Artificial (O "Cérebro"):**
    *   "A mágica acontece na integração com o **Google Gemini (versão Flash Lite)**. Optei por esse modelo pelo excelente balanço entre velocidade, custo e capacidade de raciocínio."

*   **Decisão Técnica Importante (Destaque):**
    *   "Uma decisão técnica crucial foi **NÃO utilizar pré-processamento tradicional de NLP**, como remoção de stopwords ou stemming."
    *   "Como estamos usando uma LLM moderna, ela precisa do contexto completo (tom, preposições, pontuação) para entender a *intenção* real do remetente. Remover palavras poderia tornar a análise robótica e menos precisa."

*   **Engenharia de Prompt:**
    *   "Utilizei **Few-Shot Prompting**, fornecendo exemplos históricos no prompt do sistema. Isso garante que a IA sempre responda no formato JSON estrito que o frontend espera, evitando erros de parse."

---

## 4. Conclusão (4:30 - 5:00)

**Cena:** Volta para a câmera ou tela de agradecimento.

**Falas Sugeridas:**
> "Em resumo, entreguei uma solução completa: Backend robusto, Frontend amigável e uma integração de IA calibrada para o mundo corporativo."
> "Foi um desafio excelente para aplicar conceitos de Fullstack e AI Engineering. O código completo está no repositório. Muito obrigado!"

---

**Dicas para Gravação:**
*   Use um software como **OBS Studio** ou **Loom**.
*   Fale com clareza e pausas naturais.
*   Certifique-se de que o texto na tela esteja legível (zoom se necessário).
