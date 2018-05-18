<template>
    <div class="calendar" style="height: 800px"></div>
</template>

<script>
    const Calendar = require('tui-calendar');

    module.exports = {
        name: "calendar",
        mounted() {
            console.log(this.$el);

            new Calendar(this.$el, {
                defaultView: 'month', // 月视图
                month: {
                    daynames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                },
                taskView: true,
                template: {
                    monthGridHeader: function(model) {
                        var date = new Date(model.date);
                        var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
                        return template;
                    }
                }
            });
        }
    }
</script>

<style lang="stylus">
    .calendar {
        height: 800px;
    }
</style>