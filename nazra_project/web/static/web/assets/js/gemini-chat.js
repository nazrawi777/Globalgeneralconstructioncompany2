/**
 * Gemini Chat Integration
 */

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
        });
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
            const response = await fetch('/api/chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            
            // Remove Typing Indicator
            typingIndicator.remove();

            if (data.error) {
                appendMessage('bot', `Error: ${data.error}`);
                return;
            }

            if (data.response) {
                appendMessage('bot', data.response);
            } else {
                appendMessage('bot', "I'm sorry, I couldn't generate a response.");
            }
        } catch (error) {
            console.error('Chat Error:', error);
            typingIndicator.remove();
            appendMessage('bot', "Sorry, something went wrong. Please try again later.");
        }
    };

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
