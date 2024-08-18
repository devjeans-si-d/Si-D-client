import { createStore } from "vuex";
import techStack from "./techStack";
import projectManagement from "./projectManagement";
import alert from "./alert";

const store = createStore({
    modules:{
        techStack,
        projectManagement,
        alert
    }
})

export default store