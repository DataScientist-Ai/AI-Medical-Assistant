# 🏥 AI-Powered ENT Medical Chatbot

 An intelligent medical assistant powered by multiple AI providers (Gemini, Groq, Grok, OpenRouter) providing comprehensive health information.

## ✨ Features

- 🤖 **Universal AI Support**: Integrated with Google Gemini 2.0, Groq, xAI Grok, and OpenRouter.
- 🎨 **Model Selector**: Easily switch between different AI models in real-time.
- 🔒 **Strict Privacy**: All API keys are stored in your browser's local storage—never on the server.
- 💬 **Conversational Memory**: Maintains context across multiple turns.
- 🎯 **Specialized Knowledge**: Expert-level medical information with professional citations.
- 💅 **Modern UI**: Beautiful, responsive design with smooth animations.
- ⚡ **Real-time Responses**: High-speed inference using optimized providers.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key (free tier available)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API Keys**
   - **Google Gemini**: [Google AI Studio](https://aistudio.google.com/app/apikey)
   - **Groq**: [Groq Console](https://console.groq.com/keys)
   - **xAI Grok**: [xAI Console](https://console.x.ai/)
   - **OpenRouter**: [OpenRouter](https://openrouter.ai/keys)

4. **Configure environment (Optional)**
   The backend no longer requires API keys in `.env` for security. All keys should be added directly in the application's settings (⚙️).

5. **Start the server**
   ```bash
   npm start
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
chatbot/
├── index.html          # Frontend HTML
├── styles.css          # Styling and animations
├── script.js           # Frontend JavaScript (AI integration)
├── server.js           # Express backend server
├── knowledge-base.js   # ENT medical knowledge base
├── package.json        # Dependencies
├── .env                # Environment variables (create this)
├── .env.example        # Environment template
└── README.md           # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Google Gemini API Key (Required)
GEMINI_API_KEY=your_api_key_here

# Server Port (Optional, default: 3000)
PORT=3000
```

### API Endpoints

- **POST** `/api/chat` - Send messages to the AI chatbot
  ```json
  {
    "message": "Tell me about otitis media",
    "history": [...]
  }
  ```

- **GET** `/api/health` - Check server health and configuration
  ```json
  {
    "status": "ok",
    "message": "ENT AI Chatbot Server is running",
    "geminiConfigured": true
  }
  ```

## 📚 Knowledge Base

The chatbot includes comprehensive information about:

### Ear Conditions (8)
- Otitis Media
- Otitis Externa (Swimmer's Ear)
- Tinnitus
- Hearing Loss
- Vertigo
- Meniere's Disease
- Eustachian Tube Dysfunction
- Perforated Eardrum

### Nose Conditions (5)
- Sinusitis
- Allergic Rhinitis (Hay Fever)
- Nasal Polyps
- Deviated Septum
- Epistaxis (Nosebleeds)

### Throat Conditions (7)
- Tonsillitis
- Strep Throat
- Laryngitis
- Sleep Apnea
- GERD/Laryngopharyngeal Reflux
- Voice Disorders
- Pharyngitis

### Medications (20+)
- Antibiotics (Amoxicillin, Penicillin, etc.)
- Decongestants (Oral & Topical)
- Nasal Corticosteroids
- Antihistamines
- Ear Drops

### Diagnostic Procedures (12)
- Otoscopy
- Laryngoscopy
- Audiometry
- Tympanometry
- Nasal Endoscopy
- CT/MRI Scans
- Allergy Testing
- Balance Testing
- And more...

## 💡 Usage Examples

Ask the chatbot questions like:

- "Tell me about otitis media"
- "What is amoxicillin used for?"
- "How does audiometry work?"
- "Show me ear conditions"
- "What are the symptoms of sinusitis?"
- "Explain tympanometry procedure"

## 🛠️ Development

### Run in Development Mode

```bash
npm run dev
```

This uses `nodemon` for auto-restart on file changes.

### Testing the API

```bash
# Check server health
curl http://localhost:3000/api/health

# Send a chat message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about tinnitus"}'
```

## 🔒 Security Notes

- **Never commit your `.env` file** to version control
- Keep your API key confidential
- The `.gitignore` file is configured to exclude sensitive files
- Google Gemini free tier has rate limits - monitor usage

## 🎨 Customization

### Modify AI Behavior

Edit the `SYSTEM_PROMPT` in `server.js` to customize the AI's personality and response style.

### Update Knowledge Base

Edit `knowledge-base.js` to add or modify medical information.

### Styling

Modify `styles.css` to customize the appearance. The design uses:
- CSS Custom Properties for easy theming
- Modern gradients and animations
- Responsive design for mobile devices

## 📊 API Rate Limits

**Google Gemini Free Tier:**
- 60 requests per minute
- 1,500 requests per day
- Sufficient for development and small-scale use

For production use, consider upgrading to a paid plan.

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is available
- Verify Node.js is installed: `node --version`
- Ensure dependencies are installed: `npm install`

### AI responses not working
- Verify your API key in `.env` file
- Check server logs for errors
- Test API health: `http://localhost:3000/api/health`
- Ensure you have internet connection

### Fallback mode activated
- This means the AI API is unavailable
- Check your API key and internet connection
- The chatbot will use static knowledge base as fallback

## 📝 License

MIT License - Feel free to use and modify for your projects.

## 🤝 Contributing

This is a medical reference tool for educational purposes. Always consult qualified healthcare professionals for medical advice.

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs
3. Verify API key configuration

---

**⚠️ Medical Disclaimer**: This chatbot is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with questions regarding medical conditions.

**Built with ❤️ using Google Gemini AI**
