 // API Configuration
 const API_KEY = "AIzaSyCNFAIOooAzyqtQgq4YJd2J5LcW_Gf08DQ";
 const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
 
 document.addEventListener('DOMContentLoaded', function() {
     const chatMessages = document.getElementById('chatMessages');
     const userInput = document.getElementById('userInput');
     const sendButton = document.getElementById('sendButton');
     const deleteChatBtn = document.getElementById('deleteChatBtn');
     
     // Initialize chat history from localStorage
     let chatHistory = JSON.parse(localStorage.getItem('nutrivibeChat')) || [];
     
     // Load chat history if exists
     if (chatHistory.length > 0) {
         chatMessages.innerHTML = '';
         chatHistory.forEach(msg => {
             addMessage(msg.content, msg.role, false, true);
         });
     }
     
     // Add message to chat
     function addMessage(text, sender, isHTML = false, noAnimation = false) {
         const messageDiv = document.createElement('div');
         messageDiv.className = `message ${sender}-message ${noAnimation ? '' : 'animate__animated animate__fadeInUp'}`;
         
         const avatar = sender === 'bot' 
             ? '<div class="message-avatar"><i class="fas fa-robot"></i></div>'
             : '<div class="message-avatar"><i class="fas fa-user"></i></div>';
         
         const now = new Date();
         const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
         
         messageDiv.innerHTML = `
             ${avatar}
             <div class="message-content">
                 ${isHTML ? text : `<p>${text}</p>`}
                 <div class="message-footer">
                     <small class="text-muted">${timeString}</small>
                 </div>
             </div>
         `;
         
         chatMessages.appendChild(messageDiv);
         chatMessages.scrollTop = chatMessages.scrollHeight;
         
         // Add to chat history
         if (!noAnimation) {
             chatHistory.push({
                 role: sender,
                 content: text,
                 timestamp: now.getTime()
             });
             localStorage.setItem('nutrivibeChat', JSON.stringify(chatHistory));
         }
         
         return messageDiv;
     }
     
     // Show typing indicator
     function showTyping() {
         const typingDiv = document.createElement('div');
         typingDiv.className = 'message bot-message typing-indicator';
         typingDiv.innerHTML = `
             <div class="message-avatar">
                 <i class="fas fa-robot"></i>
             </div>
             <div class="message-content">
                 <div class="typing-dots">
                     <span></span>
                     <span></span>
                     <span></span>
                 </div>
             </div>
         `;
         chatMessages.appendChild(typingDiv);
         chatMessages.scrollTop = chatMessages.scrollHeight;
         return typingDiv;
     }
     
     // Remove typing indicator
     function hideTyping(typingElement) {
         typingElement.classList.add('animate__animated', 'animate__fadeOut');
         setTimeout(() => {
             typingElement.remove();
         }, 300);
     }
     
     // Call Gemini API
     async function callGeminiAPI(prompt) {
         try {
             const response = await fetch(GEMINI_URL, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                     contents: [{
                         parts: [{
                             text: `You are a professional health and nutrition assistant named NUTRiViBE. 
                             Provide detailed, accurate advice in clear, formatted markdown. 
                             The user asked: ${prompt}. 
                             Respond with helpful information about nutrition, exercise, or general health.`
                         }]
                     }]
                 })
             });
             
             const data = await response.json();
             return data.candidates[0].content.parts[0].text;
         } catch (error) {
             console.error('Error calling Gemini API:', error);
             return "I'm having trouble connecting to the AI service. Please try again later.";
         }
     }
     
     // Format markdown response to HTML
     function formatResponse(text) {
         // Simple markdown to HTML conversion
         let html = text
             .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
             .replace(/\*(.*?)\*/g, '<em>$1</em>') // italic
             .replace(/^-\s(.*$)/gm, '<li>$1</li>') // lists
             .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>') // wrap lists
             .replace(/\n/g, '<br>'); // line breaks
         
         // If we created any lists, fix the nested UL tags
         html = html.replace(/<\/ul><br><ul>/g, '');
         
         return html;
     }
     
     // Delete all chat messages
     function deleteChat() {
         if (confirm('Are you sure you want to clear this conversation?')) {
             chatMessages.innerHTML = `
                 <div class="message bot-message animate__animated animate__fadeInUp">
                     <div class="message-avatar">
                         <i class="fas fa-robot"></i>
                     </div>
                     <div class="message-content">
                         <p>Hello! I'm your NUTRiViBE health assistant. How can I help you today?</p>
                         <div class="message-footer">
                             <small class="text-muted">Just now</small>
                         </div>
                     </div>
                 </div>
             `;
             chatHistory = [];
             localStorage.removeItem('nutrivibeChat');
         }
     }
     
     // Send message function
     async function sendMessage() {
         const message = userInput.value.trim();
         if (message === '') return;
         
         // Add user message
         addMessage(message, 'user');
         userInput.value = '';
         
         // Show typing indicator
         const typingElement = showTyping();
         
         try {
             // Get response from Gemini
             const response = await callGeminiAPI(message);
             const formattedResponse = formatResponse(response);
             
             // Remove typing indicator
             hideTyping(typingElement);
             
             // Add bot response
             addMessage(formattedResponse, 'bot', true);
         } catch (error) {
             hideTyping(typingElement);
             addMessage("Sorry, I encountered an error processing your request.", 'bot');
         }
     }
     
     // Event listeners
     sendButton.addEventListener('click', sendMessage);
     userInput.addEventListener('keypress', function(e) {
         if (e.key === 'Enter') sendMessage();
     });
     
     deleteChatBtn.addEventListener('click', deleteChat);
 });