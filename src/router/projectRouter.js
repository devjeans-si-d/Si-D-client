
import projectCreate from "@/views/project/ProjectCreate2.vue"
import ProjectEdit2 from "@/views/project/ProjectEdit2.vue"
import ProjectList from "@/views/project/ProjectList.vue"
import ProjectView from "@/views/project/ProjectView5.vue"
export const projectRouter = [

    {
        path: '/project-create',
        name: 'projectCreate',
        component: projectCreate
    },
    {
        path: '/project/list',
        name: 'ProjectList',
        component: ProjectList
    },
    {
        path: '/project-edit/:projectId',
        name: 'ProjectEdit',
        component: ProjectEdit2
    },
    {
        path: '/project/:projectId',
        name: 'ProjectView',
        component: ProjectView
    },

]
