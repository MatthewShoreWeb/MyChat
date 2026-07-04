import { useEffect, useState } from 'react';
import './Clients.css'

interface ClientListProps {
     clients: [];
}

export default function ClientList({ clients = [] }: ClientListProps) {
    const [clientList, updateList] = useState([]);

    useEffect(() => {
        if (!clients || !clients.length) return;
    }, [clients]);

    return (
        <div id='clientListContainer'>
            <div id='clientListHeader'>
                <p>Connected Clients</p>
            </div>
            <div id='clientListBody'>
                {clientList}
            </div>
        </div>
    )
}