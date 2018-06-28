<template>
    <ul class="quadrant-list">
        <li v-for="(task, index) in list" :key="index" @click="editTask(task)">
            <label @click="finishTask(task)">
                <input type="checkbox">
            </label>
            <p>{{task.name}}</p>
        </li>
    </ul>
</template>

<script>
    const eventHub = require('../utils/eventHub');

    module.exports = {
        name: 'quadrant-list',
        props: {
            value: {
                type: Array,
                required: true
            }
        },
        computed: {
            list() {
                return this.$props.value;
            }
        },
        methods: {
            editTask(task) {
                eventHub.$emit('edit', task.id);
            },

            finishTask(task) {
                this.$store.dispatch('finish', task);
            }
        }
    };
</script>

<style lang="stylus">
    .quadrant-list {
        list-style: none;
        color: #777;

        > * {
            display: flex;
            line-height: 36px;
            border-top: 1px dashed #F0F0F0;
            cursor: pointer;

            &:first-child {
                 border-top: none;
            }
        }
    }
</style>