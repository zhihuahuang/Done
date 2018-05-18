const Vue = require('vue/dist/vue');
const Vuex = require('vuex');
Vue.use(Vuex);

module.exports = new Vuex.Store({
    state: {
        count: 0,
        tasks: {}
    },
    mutations: {
        addTask(state, payload) {
            let id = ++state.count;
            Vue.set(state.tasks, id, {
                ...payload,
                id
            });
        },

        updateTask(state, payload) {
            let id = payload.id;
            state.tasks[id] = {
                ...state.tasks[id],
                ...payload
            };
        },

        finishTask(state) {
            state.tasks[id].done = true;
        }
    },
    getters: {
        taskList: state => {
            console.log(state.tasks);
            return Object.values(state.tasks)
        }
    }
});