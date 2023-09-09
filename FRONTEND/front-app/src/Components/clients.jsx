import { useQuery } from "@apollo/client"
import { GET_CLIENTS } from "../Queries/client-queries"
import { ClientRow } from "./client-row";


export const Clients = () => {
    const {data, loading, error} = useQuery(GET_CLIENTS);

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>Something went wrong</h1>

    return (
        <div>
            {
                !loading && !error && (
                    <table className="table">
                        <thead className="table-head">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.clients.map((client) => (
                                <ClientRow key={client.id} client={client}/>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}