import { useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa'
import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../Queries/project-queries";
import { DELETE_PROJECT } from "../Mutations/projects-mutations";
import Proptypes from 'prop-types'
import { Button } from "@mui/material";

export const DeleteProjectButton = ({ projectId }) => {
    const navigate = useNavigate();

    const [ deleteProject ] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        refetchQueries: [{ query: GET_PROJECTS }],
        onCompleted: () => navigate("/")
    })

    return (
        <div className="btn-delete">
            <Button variant="contained" size="medium" color="error" onClick={deleteProject}>
                <FaTrash className="icon"/> Delete Project
            </Button>
        </div>
    )
}

DeleteProjectButton.propTypes = {
    projectId : Proptypes.string
}