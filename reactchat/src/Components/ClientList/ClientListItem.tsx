import { useEffect, useState, useRef } from 'react';

interface ClientInfo {
    clientInfo: string;
    type: string;
}

export default function ClientListItem({clientInfo, type}: ClientInfo) {
    const [clientState, updateState] = useState(<></>);
    const container = useRef<HTMLInputElement>(null);

    useEffect(() => {
        updateState(<p>{clientInfo.username || 'New User'}</p>);

    }, [clientInfo]);

    useEffect(() => {
        if (typeof type !== 'string') return;

        if (type === 'me') container?.current?.classList.add('me')

    }, [type]);

    return (
        <div className='clientItem' ref={container}>
            {clientState}
        </div>
    )
}
