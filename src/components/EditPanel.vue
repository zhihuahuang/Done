<template>
    <aside class="edit-panel">
        <h1>{{task.id ? '编辑' : '新建'}}任务</h1>
        <!-- 任务名称 -->
        <el-row>
            <label for="task_name" data-required>名称</label>
            <el-input id="task_name" v-model="task.name" label="名称" clearable></el-input>
        </el-row>
        <!-- 任务描述 -->
        <el-row>
            <label for="task_description">描述</label>
            <el-input id="task_description" :autosize="{minRows: 2}" v-model="task.description"></el-input>
        </el-row>
        <el-row gutter="20">
            <el-col :span="12">
                <el-checkbox v-model="task.import" label="重要" border></el-checkbox>
            </el-col>
            <el-col :span="12">
                <el-checkbox v-model="task.urgent" label="紧急" border></el-checkbox>
            </el-col>
        </el-row>
        <el-row>
            <el-date-picker type="datetimerange" align="right"
                            start-placeholder="开始日期" end-placeholder="结束日期"
                            v-model="task.time" :default-time="['9:00:00', '18:00:00']">
            </el-date-picker>
        </el-row>
        <el-row gutter="20" v-if="task.id">
            <el-col :span="12">
                <el-button type="primary" @click="updateTask">保存</el-button>
            </el-col>
            <el-col :span="12">
                <el-button type="danger" @click="resetTask">取消</el-button>
            </el-col>
        </el-row>
        <el-row v-else>
            <el-button type="primary" @click="addTask">添加</el-button>
        </el-row>
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
            this.time = [];
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
                    this.$message.error('任务名称不能为空');
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

<style lang="stylus" scoped>
    .edit-panel {
        width: 240px;
        padding: 10px;
        border-left: 1px solid #EEE;
        box-sizing: border-box;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-checkbox {
        width: 100%;
    }

    .el-button {
        width: 100%;
    }

    .el-range-editor {
        width: 100%;
    }
</style>