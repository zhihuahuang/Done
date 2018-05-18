<template>
    <div class="app">
        <div class="container">
            <nav>
                <span>四象限</span>
                <span>日历</span>
            </nav>
            <calendar></calendar>
            <!--<four-quadrant class="main"></four-quadrant>-->
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

    .main {
        flex: 1;
    }
</style>