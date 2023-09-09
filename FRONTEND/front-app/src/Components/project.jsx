import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom"
import { GET_PROJECT, GET_PROJECTS } from "../Queries/project-queries";
import { Card, CardContent, Box, Typography, CardActions, Button } from "@mui/material";
import { ClientInformation } from "./client-information";
import { UpdateProjectInfo } from "./update-project-info";
import { DeleteProjectButton } from "./delete-project-button";


export const Project = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_PROJECT, {
        variables: { id }
    })

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>Something went wrong</h1>
    
    return (
        <div>
            {
                !loading && !error && (
                    <Card raised>
                        <CardContent>
                            <Box className="project-row">
                                <Typography variant="h4">{data.findProject.name}</Typography>
                                <Typography><Link to="/">BACK</Link></Typography>
                            </Box>
                            <Typography variant="body1">{data.findProject.description}</Typography>
                            <Typography variant="h5" marginTop={3}>Project Status</Typography>
                            <Typography variant="body1">{data.findProject.status}</Typography>
                            <ClientInformation client={data.findProject.client} />
                            <UpdateProjectInfo project={data.findProject} />
                            <DeleteProjectButton projectId={data.findProject.id}/>
                        </CardContent>
                    </Card>
                )
            }
        </div>
    )
}