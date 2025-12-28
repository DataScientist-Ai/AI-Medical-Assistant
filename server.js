const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');
const OpenAI = require('openai'); // For xAI and OpenRouter
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.static(__dirname));

// Initialize AI Clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'fake-key');
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;
const xai = process.env.XAI_API_KEY ? new OpenAI({ apiKey: process.env.XAI_API_KEY, baseURL: "https://api.x.ai/v1" }) : null;
const openrouter = process.env.OPENROUTER_API_KEY ? new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Medical AI Assistant"
    }
}) : null;

const SYSTEM_PROMPT = `You are an expert General Medical Assistant AI. Your role is to provide detailed, comprehensive, and evidence-based information about various medical conditions, medications, and diagnostic procedures across all medical fields.

IMPORTANT GUIDELINES:
1. Provide IN-DEPTH, THOROUGH, and complete medical information. Never truncate your response; always provide a full, terminal conclusion.
2. CITATIONS REQUIRED: Always provide verifiable medical references or citations for the information provided (e.g., WHO, Mayo Clinic, NIH, PubMed). You MUST include clickable URLs/links for each reference. Include a "References" section at the end of your response with these links.
3. Be professional, clear, and structured in your responses, using headings and bullet points where appropriate for readability.
4. Use appropriate medical terminology but explain complex terms for clarity.
5. For conditions: discuss symptoms, causes, risk factors, potential treatments, and prevention in detail.
6. For medications: explain usage, common dosages, side effects, contraindications, and potential interactions comprehensively.
7. For diagnostics: describe the purpose, typical preparation, the procedure itself, interpretation of results, and risks thoroughly.
8. Maintain a helpful, empathetic, and professional tone at all times.

You are designed to assist medical professionals and the general public with high-quality, referenced medical information.`;

const MEDICAL_DISCLAIMER = `\n\n***DISCLAIMER: I am an AI assistant and provide information for educational purposes only. This is not medical advice. Always consult with a qualified healthcare professional for definitive diagnosis, treatment, and before making any medical decisions.***`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [], geminiKey, groqKey, xaiKey, openRouterKey, provider, model } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // No longer using hardcoded knowledge base search

        // Initialize Dynamic Clients
        const activeGeminiKey = geminiKey || process.env.GEMINI_API_KEY;
        const activeGroqKey = groqKey || process.env.GROQ_API_KEY;
        const activeXaiKey = xaiKey || process.env.XAI_API_KEY;
        const activeOpenRouterKey = openRouterKey || process.env.OPENROUTER_API_KEY;

        const dynamicGenAI = activeGeminiKey ? new GoogleGenerativeAI(activeGeminiKey) : null;
        const dynamicGroq = activeGroqKey ? new Groq({ apiKey: activeGroqKey }) : null;
        const dynamicXai = activeXaiKey ? new OpenAI({ apiKey: activeXaiKey, baseURL: "https://api.x.ai/v1" }) : null;
        const dynamicOpenRouter = activeOpenRouterKey ? new OpenAI({
            apiKey: activeOpenRouterKey,
            baseURL: "https://openrouter.ai/api/v1",
            defaultHeaders: {
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Medical AI Assistant"
            }
        }) : null;

        // Determine fallback or specific request
        const fallbackConfigs = [];

        if (provider && model) {
            // User requested a specific model
            fallbackConfigs.push({ provider, model });
        } else {
            // Default fallback sequence
            if (dynamicGenAI) {
                fallbackConfigs.push({ provider: 'gemini', model: 'gemini-2.0-flash' });
            }
            if (dynamicGroq) {
                fallbackConfigs.push({ provider: 'groq', model: 'llama-3.3-70b-versatile' });
            }
            if (dynamicXai) {
                fallbackConfigs.push({ provider: 'xai', model: 'grok-beta' });
            }
            if (dynamicOpenRouter) {
                fallbackConfigs.push({ provider: 'openrouter', model: 'openrouter/auto' });
            }
        }

        if (fallbackConfigs.length === 0) {
            return res.status(400).json({
                error: 'No API keys configured',
                message: 'Please provide a Gemini or Groq API key in settings or server environment.'
            });
        }

        let lastError = null;
        let successfulResponse = null;

        for (const config of fallbackConfigs) {
            try {
                console.log(`Attempting request with ${config.provider}: ${config.model}`);

                // Build conversation history (common logic)
                const rawHistory = history.map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }], // Gemini format
                    content: msg.content // Groq format
                }));

                const validHistory = [];
                let nextRole = 'user';
                for (const msg of rawHistory) {
                    if (msg.role === nextRole) {
                        validHistory.push(msg);
                        nextRole = nextRole === 'user' ? 'model' : 'user';
                    }
                }
                if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === 'user') {
                    validHistory.pop();
                }

                const isFirstMessage = history.length === 0;
                let currentSystemPrompt = SYSTEM_PROMPT;

                if (isFirstMessage) {
                    currentSystemPrompt += `\n\nREQUIRED: You MUST include the following medical disclaimer at the end of your response:\n${MEDICAL_DISCLAIMER}`;
                } else {
                    currentSystemPrompt += `\n\nIMPORTANT: Do NOT include a medical disclaimer in this response as it has already been provided in the conversation history.`;
                }

                let text = "";

                if (config.provider === 'gemini') {
                    if (!dynamicGenAI) throw new Error('Gemini API key not provided');
                    const model = dynamicGenAI.getGenerativeModel({ model: config.model });
                    const chat = model.startChat({
                        history: validHistory.map(h => ({ role: h.role, parts: h.parts })),
                        generationConfig: { maxOutputTokens: 4096, temperature: 0.7 }
                    });
                    const enhancedMessage = `${currentSystemPrompt}\n\nUser Question: ${message}\n\nProvide a high-quality, very detailed, and comprehensive professional response.`;
                    const result = await chat.sendMessage(enhancedMessage);
                    const response = await result.response;
                    text = response.text();
                } else if (config.provider === 'groq') {
                    if (!dynamicGroq) throw new Error('Groq API key not provided');
                    const chatCompletion = await dynamicGroq.chat.completions.create({
                        messages: [
                            { role: "system", content: currentSystemPrompt },
                            ...validHistory.map(h => ({ role: h.role === 'model' ? 'assistant' : 'user', content: h.content })),
                            { role: "user", content: message }
                        ],
                        model: config.model,
                        temperature: 0.7,
                        max_tokens: 4096,
                    });
                    text = chatCompletion.choices[0]?.message?.content || "";
                } else if (config.provider === 'xai' || config.provider === 'openrouter') {
                    const client = config.provider === 'xai' ? dynamicXai : dynamicOpenRouter;
                    if (!client) throw new Error(`${config.provider} API key not provided`);
                    const chatCompletion = await client.chat.completions.create({
                        messages: [
                            { role: "system", content: currentSystemPrompt },
                            ...validHistory.map(h => ({ role: h.role === 'model' ? 'assistant' : 'user', content: h.content })),
                            { role: "user", content: message }
                        ],
                        model: config.model,
                        temperature: 0.7,
                        max_tokens: 4096,
                    });
                    text = chatCompletion.choices[0]?.message?.content || "";
                }

                successfulResponse = {
                    text: text,
                    model: config.model,
                    provider: config.provider
                };
                break; // Success!
            } catch (err) {
                console.warn(`${config.provider} model ${config.model} failed:`, err.message);
                lastError = err;
                // Move to next if it's a quota/rate limit/transient error
                const errorStr = err.message.toLowerCase();
                if (errorStr.includes('429') || errorStr.includes('limit') || errorStr.includes('quota') || errorStr.includes('503') || errorStr.includes('404')) {
                    continue;
                }
                throw err;
            }
        }

        if (successfulResponse) {
            return res.json({
                response: successfulResponse.text,
                modelUsed: successfulResponse.model,
                providerUsed: successfulResponse.provider,
                hasKnowledgeBaseData: false // No longer using static KB
            });
        }

        throw lastError; // If all models failed

    } catch (error) {
        console.error('Final Error Handler:', error);

        const isQuota = error.message.includes('429') || error.message.includes('Too Many Requests') || error.message.includes('Quota exceeded');
        const isOverloaded = error.message.includes('503') || error.message.includes('Overloaded');

        if (isQuota) {
            return res.status(429).json({
                error: 'AI Rate Limit Reached',
                message: "I'm receiving too many requests or your API quota is exceeded. Please wait a moment or check your Google AI Studio quota.",
                details: error.message,
                isTransient: true
            });
        }

        if (isOverloaded) {
            return res.status(503).json({
                error: 'AI Service Overloaded',
                message: "The AI service is currently busy. Please try again in a moment.",
                details: error.message,
                isTransient: true
            });
        }

        res.status(500).json({
            error: 'Failed to process request',
            message: "An unexpected error occurred while communicating with the AI.",
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Medical AI Chatbot Server is running (Strict Frontend Key Mode)',
        providersConfigured: {
            gemini: !!process.env.GEMINI_API_KEY,
            groq: !!process.env.GROQ_API_KEY,
            xai: !!process.env.XAI_API_KEY,
            openrouter: !!process.env.OPENROUTER_API_KEY
        },
        note: "Server-side keys are for internal fallbacks only if enabled. Current policy is Frontend-Only."
    });
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🏥 Medical AI Chatbot Server running on http://localhost:${PORT}`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);

    if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠️  WARNING: GEMINI_API_KEY not set in .env file');
        console.log('📝 Get your free API key from: https://makersuite.google.com/app/apikey');
    }
});
