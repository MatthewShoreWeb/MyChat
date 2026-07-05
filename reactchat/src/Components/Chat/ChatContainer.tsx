import { useEffect, useState } from 'react';
import './Chat.css';

interface EndUser {
    endUser: string
}

export default function ChatContainer({ endUser }: EndUser) {
    return (
        <div id='chatContainer'>
            <div id='chatView'>

            </div>
            <div id='chatInput'>
                <textarea />
                <div id='sendButton'>
                    Send Message
                </div>
            </div>
        </div>
    )
}