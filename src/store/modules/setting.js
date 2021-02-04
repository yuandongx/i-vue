const setting = {
    namespaced: true,
    state: ()=>{
        return {
                    data: [], // crendentials
                    selectedCrend: null, // crendentials
                }
    },
    getters: {
        become_methods(state){
            let methods = []
            state.data.forEach(element => {
                if (!methods.includes(element.become_method)){
                    methods.push(element.become_method);
                }
            });
            return methods;
        }
    },
    mutations: {
        saveCredent(state, data) {
            state.data = data;
        },
        selectedCrendentials(state, data) {
            state.selectedCrend = data;
        }
    }

}
export default setting;