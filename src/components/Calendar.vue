<template>
    <div class="calendar"></div>
</template>

<script>
    const Calendar = require('tui-calendar');

    module.exports = {
        name: "calendar",
        data: () => ({
            calendar: null
        }),
        methods: {
            render() {
                if (!this.calendar) {
                    this.calendar = new Calendar(this.$el, {
                        defaultView: 'month', // 月视图
                        month: {
                            daynames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                        },
                        // taskView: true,
                        // template: {
                        //     monthGridHeader: function(model) {
                        //         var date = new Date(model.date);
                        //         var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
                        //         return template;
                        //     }
                        // }
                    });
                }

                this.calendar.render();
            }
        },
        mounted() {
            this.render();
            window.addEventListener('resize', () => {
                this.render();
            });
        },
        beforeDestroy () {
            this.calendar.destroy();
        }
    }
</script>

<style lang="stylus">
    @import "../../node_modules/tui-calendar/src/css/main.styl";

    .calendar {
        position: relative;
        height: 100%;
    }
</style>