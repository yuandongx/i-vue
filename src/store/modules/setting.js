const setting = {
    namespaced: true,
    state: ()=>{
        return {
                    data: [],
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
        saveCredent(state, data){
            state.data = data;
        },
    }

}
export default setting;