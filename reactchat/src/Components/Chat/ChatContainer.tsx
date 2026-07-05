import { useEffect, useRef, useState } from 'react';
import './Chat.css';

interface EndUser {
    id: String;
    username: String;
}

interface types {
    endUser: EndUser;
    sendMessage: Function;
}



export default function ChatContainer({ endUser, sendMessage }: types) {
    const messageBox = useRef<HTMLTextAreaElement>(null);
    const [headerMessage, updateHeader] = useState('');

    useEffect(() => {
        console.log('a')
        try {
            const setMessage = endUser?.username ? `You are talking to ${endUser.username}` : 'Please select a user to chat with';
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