import './Welcome.css';
import { useRef } from 'react';

interface WelcomeMessage {
    confirmClicked: Function;
}

export default function WelcomeMessage({ confirmClicked }: WelcomeMessage) {
    const inputRef = useRef<HTMLInputElement>(null);

    // Add a wrapper function to do validation:
    function confirmClickWrapper() {
        if (!inputRef?.current?.value) {
            inputRef.current?.classList.add('error');
            return;
        };
        
        const name = inputRef?.current?.value;
        confirmClicked(name);
    }

    return (
        <div id='welcomeContainer' className='centered'>
            <div id='welcomeTitle' className='centered'>Welcome to MyChat!</div>
            
            <div id='welcomeBody' className='centered'>
                <input id='welcomeInput' ref={inputRef} placeholder='Please enter your name' />
                <div id='welcomeConfirm' className='centered' onClick={confirmClickWrapper}>Confirm</div>
            </div>
        </div>
    )
}