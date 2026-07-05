import { useEffect, useState, useRef } from 'react';

interface ClientInfo {
    clientInfo: string;
    type: string;
    selectUser: Function;
}

export default function ClientListItem({ clientInfo, type, selectUser }: ClientInfo) {
    const [clientState, updateState] = useState(<></>);
    const container = useRef<HTMLInputElement>(null);

    useEffect(() => {
        updateState(<p>{clientInfo.username}</p>);

    }, [clientInfo]);

    useEffect(() => {
        if (typeof type !== 'string') return;

        if (type === 'me') container?.current?.classList.add('me')

    }, [type]);

    function selectUserWrapper() {
        if (typeof selectUser !== 'function') return;
        selectUser(clientInfo);
    }

    return (
        <div className='clientItem' ref={container} onClick={selectUserWrapper}>
            {clientState}
        </div>
    )
}
