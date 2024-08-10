
import MemberAddComponent from "@/components/modal/MemberAddComponent.vue"
import MemberSearchDialogueTest from "@/components/modal/MemberSearchDialogueTest.vue"
import editorComponent from "@/components/editor/editorComponent.vue"
export const projectRouter = [
    {
        path: '/MemberAddComponent',
        name: 'MemberAddComponent',
        component: MemberAddComponent
    },
    {
        path: '/MemberSearchDialogueTest',
        name: 'MemberSearchDialogueTest',
        component: MemberSearchDialogueTest
    },
    {
        path: '/editorComponent',
        name: 'editorComponent',
        component: editorComponent
    },
]
