import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Box, Typography, Modal, TextField } from '@mui/material'
import { ADD_CLIENT } from '../Mutations/clients-mutations';
import { GET_CLIENTS } from '../Queries/client-queries';
import { FaUser } from 'react-icons/fa';

export const AddClientModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [ addClient ] = useMutation(ADD_CLIENT, {
        refetchQueries: [{ query: GET_CLIENTS }]
    })

    const openModalHandler = () => {
        setOpenModal(true)
    }

    const closeModalHandler  = () => {
        setOpenModal(false)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(!name || !email || !phone) {
            return alert("Please provide all the required info")
        }
        addClient({ variables: { name, email, phone }} );
        setOpenModal(false)
        setName("");
        setEmail("");
        setPhone("");
    }

    return (
        <div className='add-client-div'>
            <Button variant='contained' onClick={openModalHandler} startIcon={<FaUser/>}> Add Client</Button>
            <div>
            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box className="modal-div">
                    <div className='modal-row'>
                        <Typography variant="h5" component="h2">
                            Add Client
                        </Typography>
                        <Button onClick={closeModalHandler}>x</Button>
                    </div>
                    <form
                        onSubmit={submitHandler}
                        noValidate
                        autoComplete="off"
                        className="test"
                        >
                        <TextField label="Name" variant="outlined"  margin='normal' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField label="Email" variant="outlined" margin='normal' fullWidth value={email} 
                        onChange={(e) => setEmail(e.target.value)} />
                        <TextField label="Phone" variant="outlined" margin='normal' fullWidth value={phone} 
                        onChange={(e) => setPhone(e.target.value)} />
                        <Button type="submit" variant='contained'>Submit</Button>
                        </form>
                    </Box>
            </Modal>
    </div>
        </div>
    )
}