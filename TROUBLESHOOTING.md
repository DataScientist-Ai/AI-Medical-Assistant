# 🔧 Troubleshooting Guide - AI Service Unavailable

## ⚠️ Issue: "AI service is currently unavailable"

This message appears when the **backend AI server is not running** or **not configured properly**.

---

## ✅ **Quick Fix - Follow These Steps**

### **Step 1: Get Your API Key** 🔑

1. **Visit**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click** "Create API Key" or "Get API Key"
4. **Copy** the entire key (starts with `AIza...`)

### **Step 2: Configure the API Key** ⚙️

1. **Open** the `.env` file in Notepad:
   ```bash
   notepad .env
   ```

2. **Find this line:**
   ```env
   GEMINI_API_KEY=
   ```

3. **Paste your API key:**
   ```env
   GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

4. **Save** the file (Ctrl + S)

### **Step 3: Stop Any Running Servers**

If you get "port already in use" error:

```bash
restart-server.bat
```

This will:
- Stop any existing server on port 3000
- Start a fresh server instance

### **Step 4: Start the Server**

**Option A - Restart Script (Recommended):**
```bash
restart-server.bat
```

**Option B - Fresh Start:**
```bash
start-server.bat
```

**Option C - Manual:**
```bash
node server.js
```

### **Step 5: Verify It's Working**

1. **Check server logs** - You should see:
   ```
   🏥 ENT AI Chatbot Server running on http://localhost:3000
   📊 API Health: http://localhost:3000/api/health
   ```

2. **Open browser** to: http://localhost:3000

3. **Test the chatbot** - Ask: "Tell me about otitis media"

---

## 🔍 **Common Issues & Solutions**

### ❌ **Issue: Port 3000 already in use**

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Option 1: Use restart script
restart-server.bat

# Option 2: Manually kill process
netstat -ano | findstr :3000
taskkill /F /PID [process_id]
```

### ❌ **Issue: API key not configured**

**Error:**
```
⚠️ WARNING: GEMINI_API_KEY not set in .env file
```

**Solution:**
1. Open `.env` file
2. Add your API key after `GEMINI_API_KEY=`
3. Save and restart server

### ❌ **Issue: Module not found**

**Error:**
```
Error: Cannot find module '@google/generative-ai'
```

**Solution:**
```bash
npm install
```

### ❌ **Issue: Invalid API key**

**Error in server logs:**
```
API error: 400
```

**Solution:**
1. Verify your API key is correct
2. Check for extra spaces in `.env` file
3. Get a new API key if needed

### ❌ **Issue: AI responses still not working**

**Checklist:**
- ✅ Server is running (check terminal)
- ✅ API key is in `.env` file
- ✅ No spaces around `=` in `.env`
- ✅ Internet connection is active
- ✅ Browser is pointing to http://localhost:3000
- ✅ No errors in server console

---

## 🧪 **Testing the Setup**

### **Test 1: Check Server Health**

Open in browser:
```
http://localhost:3000/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "ENT AI Chatbot Server is running",
  "geminiConfigured": true
}
```

If `geminiConfigured` is `false`, your API key is not set.

### **Test 2: Test AI Chat**

Use PowerShell or Command Prompt:

```powershell
curl -X POST http://localhost:3000/api/chat `
  -H "Content-Type: application/json" `
  -d '{\"message\": \"Tell me about tinnitus\"}'
```

**Expected:** You should get an AI-generated response.

### **Test 3: Browser Test**

1. Open http://localhost:3000
2. Type: "What is otitis media?"
3. You should see an AI-generated response (not the fallback message)

---

## 📝 **Step-by-Step Checklist**

Use this checklist to ensure everything is set up:

- [ ] Node.js is installed (`node --version`)
- [ ] Dependencies are installed (`npm install`)
- [ ] `.env` file exists
- [ ] API key is in `.env` file
- [ ] API key is valid (no extra spaces)
- [ ] Port 3000 is available
- [ ] Server is running (`node server.js`)
- [ ] No errors in server console
- [ ] Browser can access http://localhost:3000
- [ ] Health endpoint returns `geminiConfigured: true`

---

## 🎯 **Quick Commands Reference**

| Task | Command |
|------|---------|
| **Install dependencies** | `npm install` |
| **Edit API key** | `notepad .env` |
| **Check port usage** | `netstat -ano \| findstr :3000` |
| **Kill process** | `taskkill /F /PID [id]` |
| **Start server** | `start-server.bat` |
| **Restart server** | `restart-server.bat` |
| **Check health** | Open http://localhost:3000/api/health |
| **View logs** | Check terminal where server is running |

---

## 🌐 **Understanding the Architecture**

### **How It Works:**

1. **Frontend** (index.html) runs in your browser
2. **Backend** (server.js) runs on your computer (localhost:3000)
3. **AI requests** go: Browser → Backend → Google Gemini → Backend → Browser

### **Why You Need the Server:**

- The **frontend alone** can't call Google Gemini (security reasons)
- The **backend server** securely handles API calls
- Your **API key** stays private on your computer

### **Two Modes:**

1. **AI Mode** (when server is running with API key)
   - Intelligent, conversational responses
   - Uses Google Gemini AI
   - Context-aware

2. **Fallback Mode** (when server is unavailable)
   - Static knowledge base responses
   - Pre-defined information
   - Shows: "⚠️ AI service is currently unavailable"

---

## 🔄 **Complete Reset (If Nothing Works)**

If you're still having issues, try a complete reset:

```bash
# 1. Stop all servers
taskkill /F /IM node.exe

# 2. Delete node_modules
rmdir /s /q node_modules

# 3. Reinstall dependencies
npm install

# 4. Verify .env file
notepad .env

# 5. Start fresh
restart-server.bat
```

---

## 📞 **Still Need Help?**

### **Check Server Logs**

Look at the terminal where you ran `start-server.bat`. Common messages:

**✅ Good:**
```
🏥 ENT AI Chatbot Server running on http://localhost:3000
```

**❌ Bad:**
```
Error: listen EADDRINUSE
⚠️ WARNING: GEMINI_API_KEY not set
Error: Cannot find module
```

### **Check Browser Console**

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors (red text)

Common errors:
- `Failed to fetch` - Server not running
- `API error: 400` - Invalid API key
- `API error: 500` - Server error

---

## 💡 **Pro Tips**

1. **Keep server running** - Don't close the terminal
2. **One server only** - Don't start multiple instances
3. **Save .env changes** - Always save after editing
4. **Restart after changes** - Restart server after changing `.env`
5. **Check logs** - Server logs show what's happening

---

## ✅ **Success Indicators**

You'll know it's working when:

1. ✅ Server starts without errors
2. ✅ No "⚠️ AI service unavailable" message
3. ✅ Responses are detailed and conversational
4. ✅ Health endpoint shows `geminiConfigured: true`
5. ✅ Typing indicator appears before responses

---

## 🎉 **Once It's Working**

Try these advanced questions:

- "Compare otitis media and otitis externa"
- "What's the difference between viral and bacterial sinusitis?"
- "Explain the mechanism of action of fluticasone"
- "What are the contraindications for amoxicillin?"
- "How do I prepare for an audiometry test?"

The AI will provide intelligent, detailed responses!

---

**Need more help? Check:**
- README.md - Full documentation
- QUICKSTART.md - Setup guide
- Server console - Error messages
