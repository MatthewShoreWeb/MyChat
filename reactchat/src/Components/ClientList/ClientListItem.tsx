import { useEffect, useState } from 'react';

interface ClientInfo {
    clientInfo: string;
}

export default function ClientListItem({clientInfo}: ClientInfo) {
    const [clientState, updateState] = useState(<></>)

    useEffect(() => {
        if (typeof clientInfo !== 'string') return;

        updateState(<p>{clientInfo}</p>);

    }, [clientInfo])

    return (
        <div className='clientItem'>
            {clientState}
        </div>
    )
}
