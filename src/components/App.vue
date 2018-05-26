<template>
    <div class="app">
        <div class="container">
            <nav class="view-nav">
                <el-radio-group v-model="view">
                    <el-radio-button label="四象限"></el-radio-button>
                    <el-radio-button label="日历"></el-radio-button>
                </el-radio-group>
            </nav>
            <div class="view-wrapper">
                <four-quadrant  v-if="view === '四象限'"></four-quadrant>
                <calendar v-if="view === '日历'"></calendar>
            </div>
        </div>
        <edit-panel></edit-panel>
    </div>
</template>

<script>
    const FourQuadrant = require('./FourQuadrant.vue');
    const Calendar = require('./Calendar.vue');
    const EditPanel = require('./EditPanel.vue');

    module.exports = {
        name: "app",
        data: () => ({
            view: ''
        }),
        components: {
            [FourQuadrant.name]: FourQuadrant,
            [Calendar.name]: Calendar,
            [EditPanel.name]: EditPanel
        }
    }
</script>

<style lang="stylus">
    * {
        -webkit-tap-highlight-color: transparent;
        appearance: none;

        margin: 0;
        padding: 0;
    }

    html {
        height: 100%;
    }

    body {
        position: relative;
        height: 100%;
        font: 14px/1.5 PingFangSC-Regular,Arial,'Helvetica Neue','Microsoft YaHei',sans-serif;
        color: #333;
    }

    button {
        font-family: inherit;
    }

    .app {
        display: flex;
        height: 100%;
    }

    .container {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .view-wrapper {
        flex: 1;
        overflow: hidden;
    }
</style>