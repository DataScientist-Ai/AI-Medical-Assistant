const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ENT Knowledge Base (imported from your existing data)
const entKnowledgeBase = require('./knowledge-base.js');

// System prompt for ENT specialization
const SYSTEM_PROMPT = `You are an expert ENT (Ear, Nose, and Throat) Medical Assistant AI. Your role is to provide accurate, evidence-based information about ENT conditions, medications, and diagnostic procedures.

IMPORTANT GUIDELINES:
1. You have access to a comprehensive ENT knowledge base covering diseases, medications, and diagnostics
2. Always provide accurate medical information based on the knowledge base
3. Be professional, clear, and concise
4. Use medical terminology appropriately but explain complex terms
5. For conditions: discuss symptoms, causes, risk factors, treatments, and prevention
6. For medications: explain usage, dosage, side effects, contraindications, and interactions
7. For diagnostics: describe purpose, preparation, procedure, interpretation, and risks
8. Always remind users to consult healthcare professionals for diagnosis and treatment
9. If asked about something outside ENT scope, politely redirect to ENT topics
10. Maintain a helpful, empathetic tone suitable for medical professionals

You are designed to assist medical professionals with quick reference information about ENT conditions.`;

// Function to search knowledge base
function searchKnowledgeBase(query) {
    const lowerQuery = query.toLowerCase();
    const results = {
        diseases: [],
        medications: [],
        diagnostics: []
    };

    // Search diseases
    for (const [key, disease] of Object.entries(entKnowledgeBase.diseases)) {
        if (lowerQuery.includes(disease.name.toLowerCase()) ||
            lowerQuery.includes(key.toLowerCase())) {
            results.diseases.push(disease);
        }
    }

    // Search medications
    for (const [key, med] of Object.entries(entKnowledgeBase.medications)) {
        if (lowerQuery.includes(med.name.toLowerCase()) ||
            lowerQuery.includes(key.toLowerCase())) {
            results.medications.push(med);
        }
    }

    // Search diagnostics
    for (const [key, diagnostic] of Object.entries(entKnowledgeBase.diagnostics)) {
        if (lowerQuery.includes(diagnostic.name.toLowerCase()) ||
            lowerQuery.includes(key.toLowerCase())) {
            results.diagnostics.push(diagnostic);
        }
    }

    return results;
}

// Function to create context from knowledge base
function createContext(searchResults) {
    let context = "RELEVANT ENT KNOWLEDGE BASE INFORMATION:\n\n";

    if (searchResults.diseases.length > 0) {
        context += "DISEASES/CONDITIONS:\n";
        searchResults.diseases.forEach(disease => {
            context += `\n${disease.name} (${disease.category}):\n`;
            context += `- Symptoms: ${disease.symptoms.join(', ')}\n`;
            context += `- Causes: ${disease.causes.join(', ')}\n`;
            context += `- Risk Factors: ${disease.riskFactors.join(', ')}\n`;
            context += `- Treatment: ${disease.treatment.join(', ')}\n`;
            context += `- Prevention: ${disease.prevention.join(', ')}\n`;
        });
    }

    if (searchResults.medications.length > 0) {
        context += "\nMEDICATIONS:\n";
        searchResults.medications.forEach(med => {
            context += `\n${med.name} (${med.category}):\n`;
            context += `- Usage: ${med.usage}\n`;
            context += `- Dosage: ${med.dosage}\n`;
            context += `- Side Effects: ${med.sideEffects.join(', ')}\n`;
            context += `- Contraindications: ${med.contraindications.join(', ')}\n`;
            context += `- Interactions: ${med.interactions.join(', ')}\n`;
        });
    }

    if (searchResults.diagnostics.length > 0) {
        context += "\nDIAGNOSTIC PROCEDURES:\n";
        searchResults.diagnostics.forEach(diagnostic => {
            context += `\n${diagnostic.name} (${diagnostic.category}):\n`;
            context += `- Purpose: ${diagnostic.purpose}\n`;
            context += `- Preparation: ${diagnostic.preparation}\n`;
            context += `- Procedure: ${diagnostic.procedure}\n`;
            context += `- Interpretation: ${diagnostic.interpretation}\n`;
            context += `- Risks: ${diagnostic.risks}\n`;
        });
    }

    return context;
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Search knowledge base for relevant information
        const searchResults = searchKnowledgeBase(message);
        const context = createContext(searchResults);

        // Initialize the model (using gemini-2.0-flash-lite-preview-02-05 for potential quota availability)
        // If this fails, we catch it below.
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" });

        // Build conversation history
        let rawHistory = history.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Robust Sanitization:
        // 1. Must start with 'user'
        // 2. Must alternate user/model
        const sanitizedHistory = [];
        let expectingRole = 'user';

        for (const msg of rawHistory) {
            if (msg.role === expectingRole) {
                sanitizedHistory.push(msg);
                expectingRole = expectingRole === 'user' ? 'model' : 'user';
            } else if (msg.role === 'user' && expectingRole === 'model') {
                // We expected model but got user. 
                // This means two users in a row. We drop the previous user or just skip this one?
                // Better strategy: If we have multiple users in a row, only keep the last one before a model.
                // But simpler safety: Reset if sequence breaks, or just ignore invalid ones.
                // Let's go with: precise alternation required. If we see User-User, we likely missed a Model response.
                // We'll just reset the chain if we find a User when expecting Model, effectively clearing bad history.
                // OR simpler: Just take the last valid sequence.
                // Safest for now: If structure is bad, default to empty history context to prevent crashes.
            }
        }

        // Ensure we end with 'model' (so the next one is 'user' which is the current message we are about to allow?)
        // Wait, the history passed to startChat should NOT include the *current* new message.
        // The current new message is passed via sendMessage(enhancedMessage).
        // So history must end with 'model' if it's not empty.

        // Let's refine: The history sent to startChat must trigger the next turn being User.
        // So the last item in history MUST be 'model'.

        // Simpler approach: Just filter for alternating starting with User.
        const validHistory = [];
        let nextRole = 'user';

        for (const msg of rawHistory) {
            if (msg.role === nextRole) {
                validHistory.push(msg);
                nextRole = nextRole === 'user' ? 'model' : 'user';
            }
        }

        // If the last message in history is 'user', we must remove it because the NEXT message (the new query) will be 'user'
        // and we can't have User -> User.
        if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === 'user') {
            validHistory.pop();
        }

        // Final check: if empty after cleaning, that's fine. 
        // If not empty, it must start with User.
        const chatHistory = validHistory;

        // Create chat session
        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
            },
        });

        // Combine system prompt, context, and user message
        const enhancedMessage = `${SYSTEM_PROMPT}\n\n${context}\n\nUser Question: ${message}\n\nProvide a comprehensive, professional response based on the knowledge base information above. If the information is not in the knowledge base, provide general ENT medical knowledge while noting that specific details should be verified with current medical resources.`;

        // Get AI response
        const result = await chat.sendMessage(enhancedMessage);
        const response = await result.response;
        const text = response.text();

        res.json({
            response: text,
            hasKnowledgeBaseData: searchResults.diseases.length > 0 ||
                searchResults.medications.length > 0 ||
                searchResults.diagnostics.length > 0
        });

    } catch (error) {
        console.error('Error:', error);

        // Check for Rate Limit (429) or Overloaded (503)
        if (error.message.includes('429') || error.message.includes('Too Many Requests') || error.message.includes('Quota exceeded')) {
            return res.json({
                response: "⚠️ **AI Rate Limit Reached**\n\nI'm receiving too many requests right now. Please wait about 30 seconds and try again.\n\n(This is a limitation of the free AI tier)",
                hasKnowledgeBaseData: false
            });
        }

        if (error.message.includes('503') || error.message.includes('Overloaded')) {
            return res.json({
                response: "⚠️ **AI Service Overloaded**\n\nThe AI service is currently busy. Please try again in a moment.",
                hasKnowledgeBaseData: false
            });
        }

        res.status(500).json({
            error: 'Failed to process request',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'ENT AI Chatbot Server is running',
        geminiConfigured: !!process.env.GEMINI_API_KEY
    });
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🏥 ENT AI Chatbot Server running on http://localhost:${PORT}`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);

    if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠️  WARNING: GEMINI_API_KEY not set in .env file');
        console.log('📝 Get your free API key from: https://makersuite.google.com/app/apikey');
    }
});
