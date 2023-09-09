import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../Queries/project-queries"
import { ProjectCard } from "./project-card";


export const Projects = () => {
    const { data, loading, error } = useQuery(GET_PROJECTS);

    if(loading) return <h1>Loading...</h1>
    if(error) return <p>Something went wrong</p>

    return (
        <div className="projects-row">
            {
                data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))
            }
        </div>
    )
}