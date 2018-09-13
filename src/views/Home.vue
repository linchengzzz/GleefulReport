<template>
    <div class="layout">
        <Header class="header">喜报生成工具</Header>
        <Content class="content">
            <Row class="title">
                <Col span="12">
                    <Button @click="addItem">新增</Button>
                </Col>
                <Col span="12">
                    <Button>下载</Button>
                </Col>
            </Row>
            <Row style="margin-top: 10px">
                <Col span="12">
                    <Scroll :height="height">
                        <Item :itemID="item" @itemSave="itemSave" v-for="(item, index) in formItems"></Item>
                    </Scroll>
                </Col>
                <Col class="show" span="12">
                    <Row>
                        <Col span="4">
                            <Header class="show-header">效果预览</Header>
                        </Col>
                        <Col span="20">
                            <Content class="show-content">
                                <div class="phone">
                                    <div class="main">
                                        <div class="scroll-box">
                                            <ShowItem :item="item" v-for="(item, index) in data"></ShowItem>
                                        </div>
                                    </div>
                                </div>
                            </Content>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Content>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Item from '@/components/Item.vue';
import ShowItem from '@/components/ShowItem.vue';
import FormItem from '../components/Item';

@Component({
    components: {
        Item,
        ShowItem,
    },
})
export default class Home extends Vue {
    public data: FormItem[] = [];
    public formItems: any = [];
    private height: number = 0 ;
    public itemSave(item: FormItem): void {
        const index = this.data.findIndex((dataItem) => dataItem.formID === item.formID);
        if (index > -1) {
            this.data[index] = {...item};
            this.data = [...this.data];
        } else {
            const curItem = {...item}
            this.data.push(curItem);
        }
    }
    private addItem(): void {
        if(this.formItems.length < 10) {
            this.formItems.push(`formItem${this.formItems.length}`);
        } else {
            (this as any).$Message.error('最多十篇哦')
        }
    }
    private created() {
        this.height = document.body.clientHeight - 130;
    }

}
</script>
<style lang="less">
.layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.header {
    text-align: center;
    font-size: 48px;
    line-height: 64px;
    height: 64px;
    color: #fff;
}
.content {
    width: 100%;
    flex: 1;
    padding-top: 20px;
}
.title {
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.show {
    .show-header {
        background: #fff;
        line-height: 30px;
        font-size: 30px;
        text-align: center;
        margin-top: 10px;
    }
    .show-content {
        display: flex;
        justify-content: center;
        .phone {
            max-width: 400px;
            flex: 1;
            height: 700px;
            margin-left: -45px;
            margin-bottom: 30px;
            background: url('../assets/phone.png') no-repeat center;
            background-size: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }
        .main {
            font-size: 10px;
            width: 80%;
            height: 79%;
            overflow: hidden;
        }
        .scroll-box {
            width: 105%;
            height: 100%;
            padding: 5px;
            box-sizing: border-box;
            overflow-y: scroll;
        }
    }
}
</style>
