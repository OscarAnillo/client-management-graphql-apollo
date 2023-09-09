import { Typography } from "@mui/material"
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import PropTypes from 'prop-types'

export const ClientInformation = ({ client }) => {
    
    return (
        <div className="client-info-div">
            <Typography variant="h5" marginBottom={2}>Client Information</Typography>
            <ul className="client-info-ul">
                <li>
                    <FaIdBadge className="icon" /> {client.name}
                </li>
                <li>
                    <FaEnvelope className="icon" /> {client.email}
                </li>
                <li>
                    <FaPhone className="icon" /> {client.phone}
                </li>
            </ul>
        </div>
    )
}

ClientInformation.propTypes = {
    client : PropTypes.object
}