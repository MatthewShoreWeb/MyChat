import ClientListItem from './ClientListItem.tsx';
import './Clients.css'

interface ClientListProps {
    clients: string[];
    me: string;
    selectUser: Function;
}

export default function ClientList({ clients, me, selectUser }: ClientListProps) {
    return (
        <div id='clientListContainer'>
            <div id='clientListHeader'>
                <p>Connected Clients</p>
            </div>
            <div id='clientListBody'>
                <ClientListItem key={me.id} clientInfo={me} type='me' />
                {clients.map((client) => (
                    <ClientListItem key={client.id} clientInfo={client} selectUser={selectUser} type='client' />
                ))}
            </div>
        </div>
    )
}