function initState() {
    return {
        alertCnt: 0,
        chatCnt: 0,
        teamBuildCnt: 0,
    }
}

const projectManagement = {
    state: initState,
    mutations: {
        mutateAlertCnt(state, num) {
            state.alertCnt = num;
        },
        mutateChatCnt(state, num) {
            state.chatCnt = num;
        },

    },
    actions: {
        updateChatCnt(context, num) {
            context.commit('mutateChatCnt', num);
        },
        updateAlertCnt(context, num) {
            context.commit('mutateAlertCnt', num);
        },
    },
    getters: {
        getChatCnt: state => state.chatCnt,
        getAlertCnt: state => state.alertCnt,
    },
}

export default projectManagement