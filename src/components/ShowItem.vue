<template>
    <div class="item" @click="open">
        <article class="art-item">
            <header>
                {{item.title}}
            </header>
            <div class="cover">
                <img :src="item.cover" alt="">
            </div>
            <footer>
                <span class="author">
                    {{item.author}}
                </span>
                &nbsp;&nbsp;
                <span>
                   阅读量 {{item.reading}}
                </span>
            </footer>
        </article>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormItem from './Item';

@Component
export default class ShowItem extends Vue {
    @Prop()
    private item?: FormItem;

    public open(): void {
        window.open((this.item as FormItem).art_url);
    }
}
</script>

<style scoped lang='less'>
.item {
    font-size: 40px;
}
.art-item {
    width: 100%;
    padding-bottom: 0.2em;
    border-bottom: 1px solid #eee;
    header {
        width: 100%;
        padding: 0.25em;
        box-sizing: border-box;
        font-family: PingFangFC-Regular;
        color: #333;
        font-size: 0.32em;
    }
    .cover {
        margin: 0 0.25em;
        height: 2.66em;
        border-radius: 0.15em;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background: #d8d8d8;
        img {
            width: 100%;
        }
    }
    footer {
        padding-left: 0.25em;
        margin-top: 0.25em;
        font-size: 0.24em;
        color: #999;
        font-family: PingFangFC-Regular;
    }
}
</style>