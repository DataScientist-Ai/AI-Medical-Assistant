# 🚀 Quick Start Guide - AI ENT Chatbot

## ✅ Setup Complete!

Your AI-powered ENT Medical Chatbot is almost ready to use!

---

## 📋 Next Steps

### 1️⃣ Get Your FREE Google Gemini API Key

1. **Visit**: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. **Sign in** with your Google account
3. **Click** "Create API Key" button
4. **Copy** your API key (starts with `AIza...`)

### 2️⃣ Configure the API Key

The `.env` file should now be open in Notepad. If not, open it manually.

**Edit this line:**
```env
GEMINI_API_KEY=
```

**Replace with your actual key:**
```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Save the file** (Ctrl + S)

### 3️⃣ Start the Server

Open a terminal in the chatbot folder and run:

```bash
npm start
```

You should see:
```
🏥 ENT AI Chatbot Server running on http://localhost:3000
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

- "Tell me about otitis media"
- "What is amoxicillin used for?"
- "How does audiometry work?"
- "Show me all ear conditions"
- "Explain the symptoms of sinusitis"
- "What are the side effects of fluticasone?"

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
  "message": "ENT AI Chatbot Server is running",
  "geminiConfigured": true
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

## 📚 Knowledge Base Includes

### 👂 Ear Conditions
Otitis Media, Tinnitus, Hearing Loss, Vertigo, Meniere's Disease, and more

### 👃 Nose Conditions
Sinusitis, Allergic Rhinitis, Nasal Polyps, Deviated Septum, and more

### 🗣️ Throat Conditions
Tonsillitis, Strep Throat, Laryngitis, Sleep Apnea, GERD, and more

### 💊 Medications
Antibiotics, Decongestants, Corticosteroids, Antihistamines, Ear Drops

### 🔬 Diagnostics
Otoscopy, Audiometry, Laryngoscopy, CT/MRI Scans, Allergy Testing, and more

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
