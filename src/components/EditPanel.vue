<template>
    <aside class="edit-panel">
        <h1>{{task.id ? '编辑' : '新建'}}任务</h1>
        <!-- 任务名称 -->
        <label for="task_name" data-required>名称</label>
        <input type="text" name="name" id="task_name" v-model="task.name">
        <!-- 任务描述 -->
        <label for="task_description">描述</label>
        <textarea name="description" id="task_description" cols="30" rows="10" v-model="task.description"></textarea>
        <!-- 是否重要 -->
        <label for="task_important">重要</label>
        <input type="checkbox" name="important" id="task_important" v-model="task.import">
        <!-- 是否紧急 -->
        <label for="task_urgent">紧急</label>
        <input type="checkbox" name="urgent" id="task_urgent" v-model="task.urgent">
        <footer v-if="task.id">
            <button @click="updateTask">添加</button>
            <button @click="resetTask">取消</button>
        </footer>
        <footer v-else>
            <button @click="addTask">添加</button>
        </footer>
    </aside>
</template>

<script>
    const bus = require('../utils/bus');

    class Task {
        constructor() {
            this.name = '';
            this.description = '';
            this.import = false;
            this.urgent = false;
            this.done = false;
        }
    }

    module.exports = {
        name: 'edit-panel',
        data: () => ({
            task: new Task()
        }),
        methods: {
            addTask() {
                if (!this.task.name) {
                    alert('任务名称不能为空');
                    return;
                }

                this.$store.commit('addTask', this.task);

                this.resetTask();
            },

            updateTask() {
                this.$store.commit('updateTask', this.task);

                this.resetTask();
            },

            resetTask() {
                this.task = new Task();
            }
        },
        created() {
            bus.$on('edit', id => {
                this.task = {...this.$store.state.tasks[id]};
            });
        }
    };
</script>

<style lang="stylus">
    $input-box {
        display: block;
        width: 100%;
        line-height: 18px;
        padding: 0.5em;

        border: 1px solid #E0E0E0;
        border-radius: 4px;
        outline: 0;

        font-family: inherit;

        box-sizing: border-box;
    }

    .edit-panel {
        width: 320px;
        padding: 10px;
        box-sizing: border-box;

        label[data-required] {
            &:after {
                content: " *";
                color: #f8162f;
            }
        }

        input[type="text"] {
            @extends $input-box;
        }

        textarea {
        @extends $input-box;
            resize: none;
        }

        button {
            width: 100%;
            height: 36px;

            border: 0;
            border-radius: 4px;
            outline: 0;

            color: #FFF;
            background: #2EB9FD;

            cursor pointer;

            &:active {
                opacity: 0.8;
            }
        }
    }
</style>