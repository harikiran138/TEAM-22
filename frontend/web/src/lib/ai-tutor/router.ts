import { getCachedResponse, cacheResponse, saveMessage, getHistory } from './cache';

export interface ChatResponse {
    text: string;
    source: 'cache' | 'api' | 'rule';
}

// Simple rule-based matcher for common questions
const checkRules = (question: string): string | null => {
    const lower = question.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi ')) return "Hello! I'm your AI Tutor. How can I help you today?";
    if (lower.includes('your name')) return "I am Lumina, your personal AI learning assistant.";
    return null;
};

export const processMessage = async (question: string): Promise<ChatResponse> => {
    // 1. Check local cache (Exact match)
    const cached = await getCachedResponse(question);
    if (cached) {
        return { text: cached.answer, source: 'cache' };
    }

    // 2. Check simple rules (Instant, 0 cost)
    const ruleAnswer = checkRules(question);
    if (ruleAnswer) {
        return { text: ruleAnswer, source: 'rule' };
    }

    // 3. Fallback to API (RAG + LLM)
    try {
        // [LOCAL] Prefix handling
        if (question.startsWith('[LOCAL]')) {
            const cleanQuestion = question.replace('[LOCAL]', '').trim();
            try {
                const res = await fetch('http://localhost:8000/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: cleanQuestion }),
                });
                const data = await res.json();
                return { text: data.response, source: 'api' };
            } catch (localErr) {
                return { text: "Local model is offline. Run 'serve.py'.", source: 'rule' };
            }
        }

        // Standard Cloud API
        const response = await fetch('/api/ai-tutor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) throw new Error('API Error');

        const data = await response.json();

        // Cache the result for next time
        await cacheResponse(question, data.answer);

        return { text: data.answer, source: 'api' };
    } catch (e) {
        console.error(e);
        return { text: "I'm having trouble connecting to my brain right now. Try again?", source: 'rule' };
    }
};
