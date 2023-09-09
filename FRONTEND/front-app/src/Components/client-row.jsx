import { useMutation } from '@apollo/client'
import { Button } from '@mui/material'
import { FaTrash } from 'react-icons/fa'
import { DELETE_CLIENT } from '../Mutations/clients-mutations'
import { GET_CLIENTS } from '../Queries/client-queries'
import PropTypes from 'prop-types'

export const ClientRow = ({ client }) => {
    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        refetchQueries: [{query: GET_CLIENTS}]
    })
    
    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <Button variant="contained" color="primary" size='large'>
                    <FaTrash onClick={deleteClient} />
                </Button>
            </td>
        </tr>
    )
}

ClientRow.propTypes = {
    client: PropTypes.object
}