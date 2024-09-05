
function initState() {
    return {
        currentFilter: 1,
        totalPage: 0,
    }
}

const projectManagement = {
    state: initState,
    mutations: {
        update(state, filter) {
            state.currentFilter = filter;
        },
        updateTotalPageMutate(state, totalPage) {
            state.totalPage = totalPage;
        }
    },
    actions: {
        updateCurrentFilter(context, filter) {
            context.commit('update', filter)
        },
        updateTotalPage(context, totalPage) {
            context.commit('updateTotalPageMutate', totalPage)
        },
    },
    getters: {
        getCurrentFilter: state => state.currentFilter,
    },
}

export default projectManagement