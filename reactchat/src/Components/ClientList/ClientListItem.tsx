import { useEffect, useState } from 'react';

interface ClientInfo {
    clientInfo: 'string';
}

export default function ClientListItem({clientInfo}: ClientInfo) {
    const [clientState, updateState] = useState(<></>)

    useEffect(() => {

    }, [clientInfo])

    return (
        <div className='clientItem'>
            clientState(<></>);
        </div>
    )
}
