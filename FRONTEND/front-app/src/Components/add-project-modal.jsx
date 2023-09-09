import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Box, Typography, Modal, TextField, MenuItem } from '@mui/material'
import { ADD_PROJECT } from '../Mutations/projects-mutations';
import { GET_PROJECTS } from '../Queries/project-queries';
import { GET_CLIENTS } from '../Queries/client-queries';
import { FaList } from 'react-icons/fa';

export const AddProjectModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("Not Started")

    const [ addProject ] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        refetchQueries: [{ query: GET_PROJECTS }]
    })

    const openModalHandler = () => {
        setOpenModal(true)
    }

    const closeModalHandler  = () => {
        setOpenModal(false)
    }

    const {data, loading, error} = useQuery(GET_CLIENTS)

    const submitHandler = (e) => {
        e.preventDefault()
        if(!name || !description || !status) {
            return alert("Please provide all the required info")
        }
        addProject(name, description, status, clientId);

        setOpenModal(false)
        setName("");
        setDescription("");
        setClientId("")
        setStatus("Not Started");
    }

    if(loading) return null;
    if(error) return <h1>Something went wrong</h1>

    return (
        <div className='add-client-div'>
            <Button variant='contained' color="secondary" onClick={openModalHandler} startIcon={<FaList/>} style={{marginLeft:15}}> Add Project</Button>
            <div>
            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box className="modal-div"> 
                    <div className='modal-row'>
                        <Typography variant="h5" component="h2">
                            New Project
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
                        <TextField label="Description" variant="outlined" margin='normal' fullWidth value={description} 
                        onChange={(e) => setDescription(e.target.value)} />
                        <TextField label="Status" select variant="outlined" margin='normal' fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
                            <MenuItem value="Not Started">Not Started</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </TextField>
                        <div>
                            <TextField fullWidth label="Select Clients" select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                {
                                   data.clients.map((client) => (
                                    <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                                   ))     
                                }
                            </TextField>
                        </div>
                        <Button type="submit" variant='contained'>Submit</Button>

                    </form>
                    </Box>
            </Modal>
        </div>
        </div>
    )
}