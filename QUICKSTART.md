# 🚀 Quick Start Guide - Universal AI Medical Assistant

## ✅ Setup Complete!

Your AI-powered Universal Medical Chatbot is almost ready to use!

---

## 📋 Next Steps

### 1️⃣ Get Your API Keys (Free Tiers Available)

Select the providers you want to use and get your keys:
- **Google Gemini**: [aistudio.google.com](https://aistudio.google.com/app/apikey)
- **Groq (Fast)**: [console.groq.com](https://console.groq.com/keys)
- **xAI (Grok)**: [console.x.ai](https://console.x.ai/)
- **OpenRouter (DeepSeek/Mistral)**: [openrouter.ai](https://openrouter.ai/keys)

### 2️⃣ Configure the App (Strict Security Policy)

**No more `.env` editing required for AI keys!** 

1. **Start the server** (see step 3).
2. **Open the browser** (see step 4).
3. **Click the Settings icon (⚙️)** in the top right.
4. **Paste your API keys** into the corresponding fields.
5. **Save Settings**. Your keys are stored safely in your browser and never sent to the server's storage.


### 3️⃣ Start the Server

Open a terminal in the chatbot folder and run:

```bash
npm start
```

You should see:
```
🏥 AI Medical Assistant Server running on http://localhost:3000
📊 API Health: http://localhost:3000/api/health
```

### 4️⃣ Open the Chatbot

Open your browser and go to:
```
http://localhost:3000
```

---

## 🎯 Try These Questions

Once the chatbot is running, try asking:

- "Tell me about managing Type 2 Diabetes"
- "What are the common side effects of Metformin?"
- "Explain how an MRI works"
- "What are the symptoms of a sinus infection?"
- "Give me a summary of hypertension guidelines 2024"
- "How does the heart's conduction system work?"

---

## 🔧 Troubleshooting

### ❌ Server won't start
- Make sure you added your API key to `.env`
- Check if port 3000 is available
- Run `npm install` again if needed

### ❌ "API key not configured" error
- Open `.env` file
- Make sure `GEMINI_API_KEY=` has your actual key
- No spaces around the `=` sign
- Save the file and restart the server

### ❌ AI responses not working
- Check your internet connection
- Verify your API key is correct
- The chatbot will use fallback mode if AI is unavailable

---

## 📊 Check Server Health

Visit this URL to check if everything is configured:
```
http://localhost:3000/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "Medical AI Assistant Server is running",
  "providersConfigured": { ... }
}
```

---

## 🎨 Features You'll Love

✅ **AI-Powered**: Intelligent responses using Google Gemini  
✅ **Comprehensive**: 25+ conditions, 30+ medications, 12+ diagnostics  
✅ **Context-Aware**: Remembers conversation history  
✅ **Beautiful UI**: Modern, responsive design  
✅ **Fallback System**: Works even if AI is unavailable  

---

### 🏥 Medical Knowledge Coverage
The assistant provides comprehensive information across all major medical domains including Ear, Nose & Throat, Cardiology, Neurology, Pediatrics, Pharmacology, and Diagnostic Imaging.

---

## ⚠️ Important Notes

- **Free Tier Limits**: 60 requests/minute, 1,500/day
- **Medical Disclaimer**: For educational purposes only - not medical advice
- **Privacy**: Your API key is stored locally in `.env`
- **Security**: Never share your API key publicly

---

## 🆘 Need Help?

1. Check the main **README.md** for detailed documentation
2. Review server logs for error messages
3. Verify `.env` configuration
4. Ensure internet connection is active

---

## 🎉 You're All Set!

Your AI-powered ENT Medical Chatbot is ready to assist with comprehensive medical information!

**Happy Chatting! 🏥💬**
