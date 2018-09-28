<template>
    <div>
        <Button @click="showChange = true" type="primary">更新日志</Button>
        <Drawer title="更新日志" :closable="false" v-model="showChange">
            <Timeline>
                <TimelineItem>
                    <p class="time">v1.4.0</p>
                    <p class="content">增加上传功能,选择响应项目即可上传。</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">v1.3.1</p>
                    <p class="content">增加提示、警告功能。</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">v1.3.0</p>
                    <p class="content">完成删除功能、清空功能。</p>
                    <p class="content">完成缓存功能。</p>
                    <p class="content">修改首页布局</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">v1.2.0</p>
                    <p class="content">采用图片上传，减少JSON体积</p>
                    <p class="content">预览界面根据更新时间倒序排序</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">v1.1.0</p>
                    <p class="content">更新了时间轴</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">v1.0.0</p>
                    <p class="content">货报生成器初步完成</p>
                </TimelineItem>
            </Timeline>
        </Drawer>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ChangeLog extends Vue {
    public showChange: boolean = false;
}
</script>

<style scoped lang='less'>
.time {
    font-size: 14px;
    font-weight: bold;
}
.content {
    padding-left: 5px;
}
</style>