<template>
    <div class="layout">
        <Header class="header">
            货报生成工具
            <div class="version">
                <span>当前版本: v1.4.1</span>
                &nbsp;&nbsp;
                <ChangeLog></ChangeLog>
            </div>
        </Header>
        <Content class="content">
            <Row class="title">
                <Col span="8">
                <Button size="large" style="width: 80px" type="primary" @click="addItem">新增</Button>
                </Col>
                <Col span="8">
                <Button size="large" style="width: 80px" type="error" @click="showClearModal">清空</Button>
                </Col>
                <Col span="8">
                <Select v-model="select" placeholder="请选择要上传的项目" @on-change="selectChange" :label-in-value="true" style="width:200px">
                    <Option v-for="item in project" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button size="large" style="width: 80px; margin-left: 10px;" type="success" @click="showUploadModal">上传</Button>
                </Col>
            </Row>
            <Row style="margin-top: 10px">
                <Col span="12">
                <Scroll :height="height">
                    <Item :item="item" :itemIndex="index" v-for="(item, index) in controlItems" :key="index"></Item>
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
                                    <ShowItem :item="item" v-for="(item, index) in formItems" :key="index"></ShowItem>
                                </div>
                            </div>
                        </div>
                    </Content>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Content>
        <Modal v-model="clearModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>确认清空？</span>
            </p>
            <div style="text-align:center">
                <p>如果清空后，当前数据无法找回</p>
                <p>是否清空？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="clear">确认清空</Button>
            </div>
        </Modal>
        <Modal v-model="uploadModal" title="上传文章" @on-ok="upload">
            <p>确定要上传项目到 <b style="fontSize: 22px;">{{selectObj.label}}</b> 吗？</p>
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Item from '@/components/Item.vue';
import ShowItem from '@/components/ShowItem.vue';
import ChangeLog from '@/components/ChangeLog.vue';
import { mapGetters, Getter } from 'vuex';
import * as Types from '@/store/types';
import { Select } from './Home';
import { Updata } from '@/api';
import FormItem from '@/components/Item';

@Component({
    components: {
        Item,
        ShowItem,
        ChangeLog,
    },
    computed: {
        ...mapGetters(['formItems', 'controlItems']),
    },
})
export default class Home extends Vue {
    public items: any = [];
    public project: Select[] = [
        { label: '货圈全货报', value: 'hqq' },
        { label: '神批老板学院', value: 'merchant' },
    ];
    public select: string = '';
    public selectObj: Select = {
        label: '',
        value: '',
    };
    private height: number = 0;
    private clearModal: boolean = false;
    private uploadModal: boolean = false;
    private addItem(): void {
        if ((this as any).controlItems.length < 10) {
            this.$store.commit(Types.ADD_CONTROL_ITEM);
        } else {
            (this as any).$Message.error('最多十篇哦');
        }
    }
    private selectChange(event: Select) {
        this.selectObj = event;
    }
    private clear(): void {
        this.$store.commit(Types.CLEAR_REPORT_ITEMS);
        this.$store.commit(Types.CLEAR_CONTROL_ITEM);
        this.clearModal = false;
    }
    private showClearModal(): void {
        this.clearModal = true;
    }
    private showUploadModal(): void {
        if (!this.select) {
            (this as any).$Message.error('请选择要上传的项目');
        } else if ((this as any).formItems.length <= 0) {
            (this as any).$Message.error('至少有一篇文章才可上传');
        } else {
            this.uploadModal = true;
        }
    }
    private upload() {
        Updata.report({ type: this.select, data: (this as any).formItems as FormItem[] }).then(
            (data) => {
                const result = data.data;
                if (result.code.code === 2000) {
                    (this as any).$Message.success(
                        `成功上传到${this.selectObj.label}${result.data.result.newspaperNum}篇文章`,
                    );
                    this.$store.commit(Types.CLEAR_REPORT_ITEMS);
                    this.$store.commit(Types.CLEAR_CONTROL_ITEM);
                } else {
                    (this as any).$Message.error(`${result.code.message}`);
                }
            },
        );
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
    position: relative;
    &::after {
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
    }
    .version {
        font-size: 20px;
        position: absolute;
        height: 100%;
        top: 0;
        right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
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
