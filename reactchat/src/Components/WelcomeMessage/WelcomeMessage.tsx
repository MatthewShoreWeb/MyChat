import './Welcome.css';

interface WelcomeMessage {
    confirmClicked: Function;
}

export default function WelcomeMessage({ confirmClicked }: WelcomeMessage) {

    return (
        <div id='welcomeContainer'>
            <div id='welcomeTitle'>Welcome to MyChat!</div>
            <div id='welcomeBody'>
                <input id='welcomeInput' placeholder='Please enter your name' />
                <div id='welcomeConfirm' onClick={confirmClicked}>Confirm</div>
            </div>
        </div>
    )
}