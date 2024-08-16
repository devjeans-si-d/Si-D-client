function initState() {
    return {
        techStackIds: [],
        techRes:[],
    }
}

const techStack ={
    state: initState,
    mutations: {
        update(state, newIds) {
            state.techStackIds = newIds
        },
        updateRes(state, newIds){
            state.techRes = newIds
        }
    },
    actions: {
        updateTechStacks(context, newIds) {
            context.commit('update', newIds)
        },
        updateTechStacksRes(context, newIds) {
            context.commit('updateRes', newIds)
        },
    },
    getters: {
        getTechStackIds: state => state.techStackIds,
        getTechStackIdsRes: state => state.techRes,
    },
}

export default techStack