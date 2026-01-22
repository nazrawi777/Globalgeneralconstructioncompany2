/**
 * Gemini Chat Integration
 */

const GEMINI_API_KEY = 'AIzaSyCL0pOKSv0OZAaD6vUH7XYxX36K5ZDZ5fs';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;

// Company Context for AI Assistant
const COMPANY_CONTEXT = `You are a helpful AI assistant for GLOBAL GENERAL CONSTRUCTION, a Grade-1 general construction company in Ethiopia. 
Use the following information to answer user queries accurately and professionally.

IMPORTANT: Always provide clean, structured, and well-formatted responses. Use:
- Bold text for emphasis and headings.
- Bullet points or numbered lists for lists of services, projects, or features.
- Clear spacing between sections.
- Professional tone.

COMPANY OVERVIEW:
Global General Construction is a Grade-1 general construction company established to deliver high-quality infrastructure and building projects across Ethiopia. The company operates as a general contractor, specializing in road construction, water supply and sewerage systems, building works, and general civil infrastructure projects. Co-founded by Engineer Kedir Hassen, a senior civil engineer with extensive industry experience.

VISION: To be one of the leading and most trusted construction companies in Ethiopia, recognized for quality, innovation, and integrity.

MISSION: To provide efficient, safe, and sustainable construction services that meet our clients' needs and exceed their expectations through continuous improvement, skilled manpower, and modern technology.

CORE VALUES: Integrity, Quality, Safety, Customer Satisfaction, Teamwork.

MAJOR FIELDS OF EXPERTISE:
- Road construction and rehabilitation
- Building and structural works
- Water supply and sewerage systems
- Drainage and culvert structures
- Earthworks and site development
- General civil and infrastructure works

KEY PROJECTS:
- Restoration of the National Palace Phase I
- Construction of 2B+G+15 building
- Jimma corridor development
- Jimma–Agaro–Dedessa river road upgrading
- Shiromeda commercial center construction
- Health center, administrative and laboratory blocks

RESOURCES: Total Staff: 203 (98 Permanent, 105 Temporary). Extensive equipment fleet including excavators, loaders, bulldozers, graders, asphalt pavers, etc.

CONTACT:
Address: Bole Wello Sefer, Dire Dewa Building, 1st Floor, Addis Ababa, Ethiopia
Phone: +251-11-4-62-37-58
Mobile: 0911-29-00-37
Email: kedirhass7122@gmail.com
General Manager: Ato Kedir Hassan

Answer questions about the company professionally and helpfully. If asked about something not in this context, politely indicate you can help with company-related inquiries.`;

document.addEventListener('DOMContentLoaded', () => {
    const chatPopup = document.getElementById('chat-popup');
    const chatToggler = document.querySelector('.chat-toggler');
    const closeChat = document.querySelector('.close-chat');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // Toggle Chat
    console.log('Chatbot script initialized');
    
    if (chatToggler) {
        chatToggler.addEventListener('click', (e) => {
            console.log('Chat toggler clicked');
            e.preventDefault();
            chatPopup.classList.toggle('popup-visible');
            console.log('Popup classes:', chatPopup.className);
        });
    } else {
        console.error('Chat toggler not found');
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatPopup.classList.remove('popup-visible');
        });
    }

    // Handle Send Message
    const sendMessage = async () => {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add User Message
        appendMessage('user', message);
        chatInput.value = '';

        // Show Typing Indicator
        const typingIndicator = showTypingIndicator();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: COMPANY_CONTEXT }]
                    },
                    contents: [{
                        parts: [{ text: message }]
                    }]
                })
            });

            const data = await response.json();
            console.log('API Response:', data); // Debug log
            
            // Remove Typing Indicator
            typingIndicator.remove();

            // Check for API errors
            if (data.error) {
                console.error('API Error:', data.error);
                appendMessage('bot', `Error: ${data.error.message || 'API request failed'}`);
                return;
            }

            // Parse the response correctly
            if (data.candidates && data.candidates.length > 0) {
                const candidate = data.candidates[0];
                if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                    const botResponse = candidate.content.parts[0].text;
                    appendMessage('bot', botResponse);
                } else {
                    console.error('Unexpected response structure:', data);
                    appendMessage('bot', "I'm sorry, I received an unexpected response format.");
                }
            } else {
                console.error('No candidates in response:', data);
                appendMessage('bot', "I'm sorry, I couldn't generate a response.");
            }
        } catch (error) {
            console.error('Gemini API Error:', error);
            typingIndicator.remove();
            appendMessage('bot', "Sorry, something went wrong. Please check the console for details.");
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    const formatMessage = (text) => {
        // Basic Markdown-like formatting
        let formatted = text
            // Bold: **text** or __text__
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            // Headings: ### text
            .replace(/^### (.*)/gm, '<h4>$1</h4>')
            // Lists: * item or - item (handle multiple items)
            .replace(/^\s*[\*\-]\s+(.*)/gm, '<li>$1</li>')
            // Line breaks
            .replace(/\n/g, '<br>');
        
        // Wrap consecutive <li> elements in <ul>
        formatted = formatted.replace(/(<li>.*<\/li>)/s, (match) => {
            return `<ul>${match}</ul>`;
        });
        
        return formatted;
    };

    const appendMessage = (sender, text) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        if (sender === 'bot') {
            messageDiv.innerHTML = formatMessage(text);
        } else {
            messageDiv.textContent = text;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const showTypingIndicator = () => {
        const indicator = document.createElement('div');
        indicator.classList.add('typing-indicator');
        indicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    };
});
