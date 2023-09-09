import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {Box, Typography, TextField, FormControl, MenuItem, Button } from '@mui/material';
import { UPDATE_PROJECT } from '../Mutations/projects-mutations';
import { GET_PROJECT } from '../Queries/project-queries';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

export const UpdateProjectInfo = ({ project }) => {
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState(project.status);
    const navigate =  useNavigate()

    const [ updateProject ] = useMutation(UPDATE_PROJECT, {
        variables: {id: project.id, name, description, status},
        refetchQueries: [{ query: GET_PROJECT, variables: {id: project.id} }]
    })

    const submitHandler = e => {
        e.preventDefault();
        if(!name || !description || !status) {
            return alert("Please fill out the required fields");
        }
        updateProject(name, description, status)
        alert("Project has been updated")
        navigate("/");
    }

    return (
        <Box component="div" className='update-client-div'>
            <Typography variant='h5' marginBottom={2}>Update Project Details</Typography>
            <Box component="form" onSubmit={submitHandler}>
                <FormControl fullWidth>
                    <TextField variant="outlined" value={name} label="Project Name" margin="normal" onChange={(e)=> setName(e.target.value)} />
                    <TextField variant="outlined" value={description} label="Project Description" margin="normal" onChange={(e)=> setDescription(e.target.value)} />
                    <TextField select label="Project Status" margin="normal" value={status} onChange={(e) => setStatus(e.target.value)} >
                        <MenuItem value="Not Started">Not Started</MenuItem>
                        <MenuItem value="Progress">Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </TextField>
                    <Button type='submit' variant='contained' className='submit-btn'>Submit Changes</Button>   
                </FormControl>
            </Box>
        </Box>
    )
}

UpdateProjectInfo.propTypes = {
    project: PropTypes.object
}