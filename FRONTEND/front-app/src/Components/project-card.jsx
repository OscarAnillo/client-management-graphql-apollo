import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

export const ProjectCard = ({ project }) => {
    return (
        <Card sx={{ minWidth: 275 }} raised>
        <CardContent>
            <Box component="div" className='project-card-row'>
                <Typography variant="h6" component="div">
                    {project.name}
                </Typography>
                <Typography color="text.secondary">
                    <Link to={`/projects/${project.id}`}>View</Link>
                </Typography>
            </Box>
        <Typography variant='body2'>
            Status: {project.status}
        </Typography>
        </CardContent>
        </Card>
        
    )
}

ProjectCard.propTypes = {
    project: PropTypes.object
}

