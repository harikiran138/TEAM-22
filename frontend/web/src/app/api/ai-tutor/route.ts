import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { retrieveContext } from '@/lib/ai-tutor/rag';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const { question } = await req.json();

        if (!question) {
            return NextResponse.json({ error: 'Question is required' }, { status: 400 });
        }

        // 1. Retrieve Context (RAG)
        const context = await retrieveContext(question);

        // 2. Construct System Prompt
        const systemPrompt = `
You are Lumina, an expert AI Tutor.
Your goal is to answer the student's question clearly and concisely.
Use the provided Context if relevant, but rely on your general knowledge if the context is insufficient.
Keep answers short (under 3 sentences) unless asked for more detail.

Context:
${context ? context : "No specific context available."}

Student Question: ${question}
`;

        // 3. Call Gemini Flash
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(systemPrompt);
        const response = result.response;
        const answer = response.text();

        return NextResponse.json({ answer });

    } catch (error) {
        console.error('AI Tutor API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
