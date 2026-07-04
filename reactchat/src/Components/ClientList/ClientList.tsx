import ClientListItem from './ClientListItem.tsx';
import './Clients.css'

interface ClientListProps {
    clients: string[];
}

export default function ClientList({ clients = [] }: ClientListProps) {
    return (
        <div id='clientListContainer'>
            <div id='clientListHeader'>
                <p>Connected Clients</p>
            </div>
            <div id='clientListBody'>
                {clients.map((client) => (
                    <ClientListItem key={client} clientInfo={client} />
                ))}
            </div>
        </div>
    )
}