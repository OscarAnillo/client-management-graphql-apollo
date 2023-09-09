import { AddClientModal } from "../Components/add-client-modal"
import { AddProjectModal } from "../Components/add-project-modal"
import { Projects } from "../Components/projects"
import { Clients } from "../Components/clients"

export const Home = () => {
    return (
        <>
        <div className="home-row">
            <AddClientModal />
            <AddProjectModal />
        </div>
            <Projects />
            <Clients />
        </>
    )
}