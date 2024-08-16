import { createStore } from "vuex";
import techStack from "./techStack";

const store = createStore({
    modules:{
        techStack,
    }
})

export default store