/**
 * Gemini Chat Integration
 */

// API URL pointing to our Django backend
const API_URL = '/api/chat/';

// Helper to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

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
            const csrftoken = getCookie('csrftoken');
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    message: message
                })
            });

            const data = await response.json();
            console.log('API Response:', data); // Debug log
            
            // Remove Typing Indicator
            typingIndicator.remove();

            // Check for API errors
            if (data.error) {
                console.error('API Error:', data.error);
                appendMessage('bot', `Error: ${data.error}`);
                return;
            }

            // Display Bot Response
            if (data.response) {
                appendMessage('bot', data.response);
            } else {
                console.error('Unexpected response structure:', data);
                appendMessage('bot', "I'm sorry, I received an unexpected response format.");
            }
        } catch (error) {
            console.error('API Request Error:', error);
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
        
        messageDiv.style.opacity = '0';
        chatMessages.appendChild(messageDiv);
        
        // Fade in animation
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'opacity 0.3s ease';
            messageDiv.style.opacity = '1';
        });

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
