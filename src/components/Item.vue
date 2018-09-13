<template>
    <div class="item">
        <Header class="item-header">第{{~~formItem.formID.match(/\d+/)[0] + 1}}篇</Header>
        <Form ref="formdata" :model="formItem" :rules="rule" :label-width="100">
            <FormItem label="文章编号:" prop="id">
                <Input v-model="formItem.id" placeholder="请输入文章编号" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem label="文章标题:" prop="title">
                <Input v-model="formItem.title" placeholder="请输入文章标题" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem label="文章封面:" prop="cover">
                <Input v-model="formItem.cover" placeholder="请输入文章封面(19:7图片)URL" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem label="文章作者:" prop="author">
                <Input v-model="formItem.author" placeholder="请输入文章作者" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem label="文章阅读量:" prop="reading">
                <Input v-model="formItem.reading" placeholder="请输入文章阅读量" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem label="文章链接:" prop="art_url">
                <Input v-model="formItem.art_url" placeholder="请输入文章链接" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSave('formdata')">{{change ? "修改" : "保存" }}</Button>
                <Button @click="handleReset" style="margin-left: 8px" :disabled="change">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormItem from './Item';

@Component
export default class Item extends Vue {
    public formItem: FormItem = {
        formID: '',
        id: '',
        cover: '',
        title: '',
        author: '',
        reading: '',
        art_url: '',
    };
    public rule = {
        id: [{ required: true, message: '编号是必填的', trigger: 'blur' }],
        cover: [{ required: true, message: '图片是必填的', trigger: 'blur' }],
        title: [{ required: true, message: '标题是必填的', trigger: 'blur' }],
        author: [{ required: true, message: '作者是必填的', trigger: 'blur' }],
        reading: [
            { required: true, message: '阅读量是必填的', trigger: 'blur' },
        ],
        art_url: [{ required: true, message: '链接是必填的', trigger: 'blur' }],
    };
    @Prop()
    private itemID?: string;
    private change: boolean = false;

    public handleSave(name: string): void {
        (this.$refs.formdata as any).validate((val: boolean) => {
            if(val) {
                this.change = !this.change;
                if (this.change) {
                    this.$emit('itemSave', this.formItem);
                }
            }
        });
    }
    public handleReset(): void {
        this.formItem.id = '';
        this.formItem.title = '';
        this.formItem.author = '';
        this.formItem.reading = '';
        this.formItem.art_url = '';
    }
    private created() {
        this.formItem.formID = this.itemID || '0';
    }
}
</script>

<style scoped lang='less'>
.item-header {
    background: #fff;
    text-align: center;
    font-size: 24px;
    line-height: 24px;
    height: 36px;
}
</style>