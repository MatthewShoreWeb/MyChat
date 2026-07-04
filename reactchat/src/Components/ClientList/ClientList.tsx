import ClientListItem from './ClientListItem.tsx';
import './Clients.css'

interface ClientListProps {
    clients: string[];
    me: string;
}

export default function ClientList({ clients = [], me }: ClientListProps) {
    return (
        <div id='clientListContainer'>
            <div id='clientListHeader'>
                <p>Connected Clients</p>
            </div>
            <div id='clientListBody'>
                <ClientListItem key='me' clientInfo={me} type='me' />
                {clients.map((client) => (
                    <ClientListItem key={client} clientInfo={client} type='client' />
                ))}
            </div>
        </div>
    )
}