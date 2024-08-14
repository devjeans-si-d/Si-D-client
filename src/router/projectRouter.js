
import editorComponent from "@/components/editor/editorComponent.vue"
import projectCreate from "@/views/project/ProjectCreate.vue"
export const projectRouter = [
    {
        path: '/editorComponent',
        name: 'editorComponent',
        component: editorComponent
    },
    {
        path: '/project-create',
        name: 'projectCreate',
        component: projectCreate
    },

]
