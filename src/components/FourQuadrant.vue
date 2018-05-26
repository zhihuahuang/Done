<template>
    <div class="four-quadrant">
        <quadrant-list class="quadrant quadrant-import-urgent" :value="importUrgentTaskList"></quadrant-list>
        <quadrant-list class="quadrant quadrant-urgent" :value="urgentTaskList"></quadrant-list>
        <quadrant-list class="quadrant quadrant-import" :value="importTaskList"></quadrant-list>
        <quadrant-list class="quadrant quadrant-other" :value="otherTaskList"></quadrant-list>
    </div>
</template>

<script>
    const QuadrantList = require('./QuadrantList.vue');

    module.exports = {
        name: 'four-quadrant',
        components: {
            [QuadrantList.name]: QuadrantList
        },
        computed: {
            // 重要紧急任务
            importUrgentTaskList() {
                return this.$store.getters.taskList.filter(item => {
                    return item.import && item.urgent;
                });
            },

            // 紧急任务
            urgentTaskList() {
                return this.$store.getters.taskList.filter(item => {
                    return !item.import && item.urgent;
                });
            },

            // 重要任务
            importTaskList() {
                return this.$store.getters.taskList.filter(item => {
                    return item.import && !item.urgent;
                });
            },

            // 其他任务
            otherTaskList() {
                return this.$store.getters.taskList.filter(item => {
                    return !item.import && !item.urgent;
                });
            }
        }
    };
</script>

<style lang="stylus">
    .four-quadrant {
        display: flex;
        flex-wrap: wrap;
        height: 100%;
    }

    .quadrant {
        width: 50%;
        height: 50%;

        list-style: none;
    }

    .quadrant-import-urgent {
        background: #F38181;
    }

    .quadrant-urgent {
        background: #FCE38A;
    }

    .quadrant-import {
        background: #50C1E9;
    }

    .quadrant-other {
        background: #95E1D3;
    }
</style>