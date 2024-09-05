function initState() {
    return {
        alertCnt: 0,
        chatCnt: 0,
        teamBuildCnt: 0,
        socket: null
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
        mutateSocket(state, socket) {
            state.socket = socket;
        }

    },
    actions: {
        updateChatCnt(context, num) {
            context.commit('mutateChatCnt', num);
        },
        updateAlertCnt(context, num) {
            context.commit('mutateAlertCnt', num);
        },
        updateSocket(context, socket) {
            context.commit('mutateSocket', socket);
        }
    },
    getters: {
        getChatCnt: state => state.chatCnt,
        getAlertCnt: state => state.alertCnt,
        getSocket: state => state.socket,
    },
}

export default projectManagement