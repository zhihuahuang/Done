const fs = require('fs');

const Vue = require('vue/dist/vue');
const Vuex = require('vuex');
Vue.use(Vuex);

const FILE_PATH = 'data.json';

module.exports = new Vuex.Store({
    state: {
        id: 0,
        tasks: {}
    },
    mutations: {
        restoreTasks(state, payload) {
            state.tasks = payload;
            state.id = Object.keys(payload).length;
        },

        addTask(state, payload) {
            let id = ++state.id;
            Vue.set(state.tasks, id, {
                done: false,
                ...payload,
                id
            });
        },

        updateTask(state, payload) {
            let id = payload.id;
            Vue.set(state.tasks, id, {
                ...state.tasks[id],
                ...payload
            });
        },

        finishTask(state, payload) {
            state.tasks[payload.id].done = true;
        }
    },
    getters: {
        taskList: state => {
            return Object.values(state.tasks)
        }
    },
    actions: {
        /**
         * 恢复任务
         * @return {Promise<any>}
         */
        restore({commit}) {
            return new Promise((resolve, reject) => {
                fs.access(FILE_PATH, err => {
                    if (err) {
                        resolve();
                    }
                    else {
                        fs.readFile(FILE_PATH, 'utf8', (err, data) => {
                            if (err) {
                                reject(err)
                            }
                            else {
                                let taskList = JSON.parse(data);
                                let taskMap = {};
                                taskList.forEach((task, index) => {
                                    taskMap[index] = task;
                                });
                                commit('restoreTasks', taskMap);
                                resolve();
                            }
                        });
                    }
                });
            });
        },

        /**
         * 保存任务
         * @param state
         * @param commit
         * @return {Promise<any>}
         */
        save({state, commit}) {
            return new Promise((resolve, reject) => {
                fs.writeFile(FILE_PATH, JSON.stringify(Object.values(state.tasks)), 'utf8', err => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve();
                    }
                });
            });
        },

        add({commit, dispatch}, task) {
            commit('addTask', task);
            return dispatch('save');
        },

        update({commit, dispatch}, task) {
            commit('updateTask', task);
            return dispatch('save');
        },

        finish({commit, dispatch}, task) {
            commit('finishTask', task);
            return dispatch('save');
        }
    }
});