import { useEffect, useRef, useState } from 'react';
import './Chat.css';

interface types {
    endUser: string
    sendMessage: Function;
}

export default function ChatContainer({ endUser, sendMessage }: types) {
    const messageBox = useRef<HTMLTextAreaElement>(null);
    const [headerMessage, updateHeader] = useState('');

    useEffect(() => {
        try {
            const setMessage = endUser ? `You are talking to ${endUser}` : 'Please select a user to chat with';
            updateHeader(setMessage);
        } catch (e) { console.log(e); }
    }, [endUser]);

    // Wrapper function to perform validation:
    function sendMessageWrapper() {
        const userMessage = messageBox?.current?.value;
        if (typeof userMessage !== 'string' || !userMessage.length || typeof sendMessage !== 'function') return;

        sendMessage();
    }

    return (
        <div id='chatContainer'>
            <div id='chatView'>
                <div id='chatViewHeader'>
                    <p>{headerMessage}</p>
                </div>
                <div id='chatLog'>

                </div>
            </div>
            <div id='chatInput'>
                <textarea ref={messageBox} placeholder='Enter a message' />
                <div id='sendButton' onClick={() => { }}>
                    Send Message
                </div>
            </div>
        </div>
    )
}