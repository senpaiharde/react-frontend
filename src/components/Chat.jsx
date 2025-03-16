import { useState } from "react";
import PropTypes from "prop-types";





export function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');


    const handleSendMessage = () => {
        if(!newMessage.trim()) return;

        const userMessage = {text: newMessage , sender: 'user'}
        setMessages([...messages, userMessage]);

        setNewMessage('');


        setTimeout(() => {
            const botRespone = {text: "bot says how is your day today?", sender:'botName' };
            setMessages((prevMessages) => [...prevMessages, botRespone]);
        }, 1000);
    };

    return(
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg,index) => (
                    <p key={index} className={msg.sender === 'user' ? 
                        'user-msg' : 'bot-msg'
                    }>{msg.text}</p>
                ))}
            </div>

            <div className="chat-input">
                <input type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."/>
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

Chat.PropTypes = {
    botName: PropTypes.string,

}

Chat.defaultProps = {
    botName: 'BOT'
}