import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { retrieveContext } from '@/lib/ai-tutor/rag';

// API Keys for failover
const API_KEYS = [
    process.env.GEMINI_API_KEY,
    "AIzaSyDc_p3iZpLfJCwgujSQzMDExDIMLtAkSBk",
    "AIzaSyDjdnMFjY6pacj93s9UrLPofiZ2OV4bPIw",
    "AIzaSyAOGwxsSiyxLUmdiVvkVFpf7Ruv3OPFnrc"
].filter(Boolean) as string[]; // Filter out undefined env keys

let currentKeyIndex = 0;

function getNextKey(): string | null {
    if (API_KEYS.length === 0) return null;
    const key = API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    return key;
}

export async function POST(req: NextRequest) {
    try {
        console.log("AI Tutor API called");

        const { question, userContext } = await req.json();

        if (!question) {
            return NextResponse.json({ error: 'Question is required' }, { status: 400 });
        }

        // 1. Retrieve Context (RAG)
        console.log("Step 1: Retrieve Context");
        const ragContext = await retrieveContext(question);
        console.log("Context retrieved:", ragContext ? "Yes" : "No");

        // 2. Construct System Prompt
        const systemPrompt = `
You are Lumina, an expert AI Tutor.
Your goal is to answer the student's question clearly and concisely.
Use the provided Context if relevant, but rely on your general knowledge if the context is insufficient.
Keep answers short (under 3 sentences) unless asked for more detail.

User Data:
${userContext || "No user data available."}

Learning Context (RAG):
${ragContext ? ragContext : "No specific topic context available."}

Student Question: ${question}
`;

        // 3. Try each API key until one works
        let lastError: Error | null = null;
        for (let attempt = 0; attempt < API_KEYS.length; attempt++) {
            const apiKey = getNextKey();
            if (!apiKey) {
                console.error("No API keys available");
                return NextResponse.json({ error: 'Server Authorization Error: No API Keys configured' }, { status: 500 });
            }
            console.log(`Attempt ${attempt + 1}: Using API Key index ${currentKeyIndex === 0 ? API_KEYS.length - 1 : currentKeyIndex - 1} (${apiKey.substring(0, 8)}...)`);

            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                const result = await model.generateContent(systemPrompt);
                console.log("Step 4: Response received");
                const response = result.response;
                const answer = response.text();

                return NextResponse.json({ answer });
            } catch (e: any) {
                console.error(`Key ${apiKey.substring(0, 8)}... failed:`, e.message);
                lastError = e;
                // Continue to next key
            }
        }

        // All keys failed
        console.error('All API keys exhausted. Last error:', lastError?.message);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: lastError?.message || 'All API keys failed'
        }, { status: 500 });

    } catch (error: any) {
        console.error('AI Tutor API Error Details:', error.message);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}

