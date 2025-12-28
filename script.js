// Medical AI Assistant - Frontend Logic

// Chat message history
let chatHistory = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
  loadChatHistory();
  loadSettings();
  adjustTextareaHeight();
});

// Handle sending messages
function handleSendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();

  if (message) {
    sendMessage(message);
    input.value = '';
    adjustTextareaHeight();
  }
}

// Send message function
async function sendMessage(message) {
  // Hide welcome message
  const welcomeMsg = document.getElementById('welcomeMessage');
  if (welcomeMsg) {
    welcomeMsg.classList.add('hidden');
  }

  // Add user message
  addMessage(message, 'user');

  // Show typing indicator
  const typingId = addTypingIndicator();

  try {
    // Process and respond using AI
    const response = await processQuery(message);
    removeTypingIndicator(typingId);
    addMessage(response, 'bot');
    saveChatHistory();
  } catch (error) {
    removeTypingIndicator(typingId);
    addMessage('Sorry, I encountered an error processing your request. Please try again.', 'bot');
  }
}

// Add message to chat
function addMessage(content, sender) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `flex gap-4 ${sender === 'user' ? 'flex-row-reverse animate-slide-in-right' : 'animate-slide-in-left'}`;

  const avatar = document.createElement('div');
  avatar.className = `w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm shrink-0 ${sender === 'user' ? 'bg-medical-600 text-white' : 'bg-medical-100 text-medical-700 font-bold'
    }`;
  avatar.textContent = sender === 'user' ? '👤' : '🤖';

  const contentDiv = document.createElement('div');
  contentDiv.className = `max-w-[85%] p-4 rounded-2xl shadow-sm ${sender === 'user'
    ? 'bg-medical-700 text-white rounded-tr-none'
    : 'bg-white border border-gray-100 rounded-tl-none prose prose-medical max-w-none'
    }`;
  contentDiv.innerHTML = formatMessage(content);

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Save to history (avoid duplicates if loading from history)
  if (!document.isRestoringHistory) {
    chatHistory.push({ content, sender, timestamp: new Date() });
  }
}

// Add typing indicator
function addTypingIndicator() {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'flex gap-4 animate-pulse bot';
  const typingId = 'typing-' + Date.now();
  messageDiv.id = typingId;

  const avatar = document.createElement('div');
  avatar.className = 'w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center text-xl shrink-0';
  avatar.textContent = '🤖';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none';
  contentDiv.innerHTML = '<div class="flex gap-2"><div class="w-2 h-2 bg-medical-400 rounded-full"></div><div class="w-2 h-2 bg-medical-400 rounded-full animation-delay-200"></div><div class="w-2 h-2 bg-medical-400 rounded-full animation-delay-400"></div></div>';

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  return typingId;
}

// Remove typing indicator
function removeTypingIndicator(typingId) {
  const indicator = document.getElementById(typingId);
  if (indicator) {
    indicator.remove();
  }
}

// Format message with HTML using marked.js
function formatMessage(text) {
  if (!text) return '';

  try {
    const renderer = new marked.Renderer();
    const linkRenderer = renderer.link.bind(renderer);
    renderer.link = (href, title, text) => {
      const html = linkRenderer(href, title, text);
      return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ');
    };

    // Configure marked for line breaks and safety
    marked.setOptions({
      renderer: renderer,
      breaks: true,
      gfm: true,
      headerIds: false,
      mangle: false
    });

    return marked.parse(text);
  } catch (e) {
    console.error('Markdown parsing error:', e);
    // Fallback to simple formatting if marked fails
    return text.replace(/\n/g, '<br>');
  }
}

// API Configuration
const API_URL = 'http://localhost:3000/api';

// Process user query using AI backend
async function processQuery(query) {
  try {
    const geminiKey = localStorage.getItem('gemini_api_key');
    const groqKey = localStorage.getItem('groq_api_key');
    const xaiKey = localStorage.getItem('xai_api_key');
    const openRouterKey = localStorage.getItem('openrouter_api_key');
    const { provider } = getSelectedModel();

    // Check if key for selected provider exists
    if (provider === 'gemini' && !geminiKey) {
      return `⚠️ **Missing Gemini API Key**\n\nPlease add your Gemini API key in the settings (⚙️) to use this model.`;
    }
    if (provider === 'groq' && !groqKey) {
      return `⚠️ **Missing Groq API Key**\n\nPlease add your Groq API key in the settings (⚙️) to use this model.`;
    }
    if (provider === 'xai' && !xaiKey) {
      return `⚠️ **Missing xAI API Key**\n\nPlease add your xAI API key in the settings (⚙️) to use this model.`;
    }
    if (provider === 'openrouter' && !openRouterKey) {
      return `⚠️ **Missing OpenRouter API Key**\n\nPlease add your OpenRouter API key in the settings (⚙️) to use this model.`;
    }
    if (!provider && !geminiKey && !groqKey && !xaiKey && !openRouterKey) {
      return `⚠️ **No API Keys Configured**\n\nPlease open settings (⚙️) and add at least one API key to start chatting.`;
    }

    console.log('Sending query to AI:', query);
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: query,
        history: chatHistory.slice(-10), // Send last 10 messages for context
        geminiKey: localStorage.getItem('gemini_api_key'),
        groqKey: localStorage.getItem('groq_api_key'),
        xaiKey: localStorage.getItem('xai_api_key'),
        openRouterKey: localStorage.getItem('openrouter_api_key'),
        ...getSelectedModel()
      })
    });

    const data = await response.json();

    if (data.response) {
      console.log(`Received response from ${data.providerUsed} (${data.modelUsed}). Length: ${data.response.length} chars.`);
    }

    if (!response.ok) {
      if (data.error) {
        let errorMsg = `⚠️ **${data.error}**\n\n${data.message || 'An error occurred.'}`;
        if (data.details && !data.message.includes(data.details)) {
          errorMsg += `\n\n*Details: ${data.details}*`;
        }
        return errorMsg;
      }
      throw new Error(data.message || `API error: ${response.status}`);
    }

    return data.response;

  } catch (error) {
    console.error('AI API Error:', error);
    return `⚠️ **Connection Error**\n\nI couldn't reach the AI service. Please check your internet connection or try again later.`;
  }
}

// Helper to get selected provider and model
function getSelectedModel() {
  const selector = document.getElementById('modelSelector');
  const value = selector.value;
  if (!value || value === 'fallback') return {};

  const [provider, model] = value.split(':');
  return { provider, model };
}

// UI Utility Functions
function adjustTextareaHeight() {
  const textarea = document.getElementById('chatInput');
  textarea.style.height = 'auto';
  textarea.style.height = (textarea.scrollHeight) + 'px';
}

function handleKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSendMessage();
  }
}

function clearChat() {
  if (confirm('Are you sure you want to clear the chat history?')) {
    chatHistory = [];
    document.getElementById('chatMessages').innerHTML = '';

    // Add back the welcome message if hidden
    const messagesContainer = document.getElementById('chatMessages');
    const welcomeMsg = `
      <div id="welcomeMessage" class="flex flex-col items-center justify-center py-12 text-center">
          <div class="text-6xl mb-6 opacity-20">🏥</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Welcome to Your AI Health Assistant</h2>
          <p class="text-gray-500 mb-8 max-w-md">Ask about any medical condition, medication, or diagnostic procedure. I provide detailed, referenced information.</p>
          <div class="flex flex-wrap justify-center gap-3">
              <div class="chip" onclick="sendMessage('Tell me about hypertension management')">Hypertension</div>
              <div class="chip" onclick="sendMessage('What are common diabetes symptoms?')">Diabetes</div>
              <div class="chip" onclick="sendMessage('Explain how an MRI scan works')">MRI Scan</div>
              <div class="chip" onclick="sendMessage('Tell me about Metformin side effects')">Metformin</div>
          </div>
      </div>`;
    messagesContainer.innerHTML = welcomeMsg;

    localStorage.removeItem('medical_chat_history');
  }
}

function saveChatHistory() {
  // Only save the last 50 messages to local storage
  const historyToSave = chatHistory.slice(-50);
  localStorage.setItem('medical_chat_history', JSON.stringify(historyToSave));
}

function loadChatHistory() {
  const savedHistory = localStorage.getItem('medical_chat_history');
  if (savedHistory) {
    try {
      chatHistory = JSON.parse(savedHistory);
      if (chatHistory.length > 0) {
        // Hide welcome message
        const welcomeMsg = document.getElementById('welcomeMessage');
        if (welcomeMsg) welcomeMsg.remove();

        document.isRestoringHistory = true;
        chatHistory.forEach(msg => {
          addMessage(msg.content, msg.sender);
        });
        document.isRestoringHistory = false;
      }
    } catch (e) {
      console.error('Error loading chat history:', e);
    }
  }
}

// Global functions for HTML event handlers
function handleQuickAccess(type) {
  let query = "";
  switch (type) {
    case 'general': query = "Tell me about common general health conditions."; break;
    case 'cardio': query = "What are some common cardiovascular conditions?"; break;
    case 'pediatrics': query = "Tell me about common pediatric health issues."; break;
    case 'diagnostics': query = "What are some common medical diagnostic procedures?"; break;
    case 'medications': query = "Tell me about common types of medications and their uses."; break;
    default: query = `Tell me about ${type} medical conditions.`;
  }
  sendMessage(query);
}

function handleSearchKeypress(event) {
  if (event.key === 'Enter') {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    if (query) {
      sendMessage(query);
      searchInput.value = '';
    }
  }
}

// Settings Management
function toggleSettings() {
  const modal = document.getElementById('settingsModal');
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
}

function saveSettings() {
  const geminiKey = document.getElementById('geminiKeyInput').value.trim();
  const groqKey = document.getElementById('groqKeyInput').value.trim();
  const xaiKey = document.getElementById('xaiKeyInput').value.trim();
  const openRouterKey = document.getElementById('openRouterKeyInput').value.trim();

  localStorage.setItem('gemini_api_key', geminiKey);
  localStorage.setItem('groq_api_key', groqKey);
  localStorage.setItem('xai_api_key', xaiKey);
  localStorage.setItem('openrouter_api_key', openRouterKey);

  toggleSettings();

  // Show a brief confirmation (optional but nice)
  alert('Settings saved successfully!');
}

function loadSettings() {
  const geminiKey = localStorage.getItem('gemini_api_key');
  const groqKey = localStorage.getItem('groq_api_key');
  const xaiKey = localStorage.getItem('xai_api_key');
  const openRouterKey = localStorage.getItem('openrouter_api_key');

  if (geminiKey) document.getElementById('geminiKeyInput').value = geminiKey;
  if (groqKey) document.getElementById('groqKeyInput').value = groqKey;
  if (xaiKey) document.getElementById('xaiKeyInput').value = xaiKey;
  if (openRouterKey) document.getElementById('openRouterKeyInput').value = openRouterKey;
}
