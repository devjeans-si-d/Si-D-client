import { createStore } from "vuex";
import techStack from "./techStack";
import projectManagement from "./projectManagement";

const store = createStore({
    modules:{
        techStack,
        projectManagement
    }
})

export default store