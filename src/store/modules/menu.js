const menu = {
    namespaced: true,
    state: ()=>{
        return {
            collapsed: true,
        }
    },
    getters: {
        collapsed: (state)=>{
            return state.collapsed;
        }
    },
    mutations: {
        onCollapsed(state, data){
            state.collapsed = data;
        },
    },
}

export default menu;