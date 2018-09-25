<template>
    <div class="item">
        <Header class="item-header">第{{formItem.formID.match(/\d+/)[0]}}篇</Header>
        <Form ref="formdata" :model="formItem" :rules="rule" :label-width="100">
            <FormItem label="文章编号:" prop="id">
                <Input v-model="formItem.id" placeholder="请输入文章编号" style="width: 500px" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem label="文章标题:" prop="title">
                <Input v-model="formItem.title" style="width: 500px" placeholder="请输入文章标题" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem label="文章封面:" prop="cover">
                <Row>
                    <Col>
                        <Upload :before-upload="handleUpload" action="/">
                            <Button icon="ios-cloud-upload-outline">Upload files</Button>
                        </Upload>
                    </Col>
                    <Col>
                        <Input v-model="formItem.cover" placeholder="请上传图片（19：7）完成裁剪" style="width: 500px" disabled readonly></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="封面预览:">
                <div span="20" class="cover">
                    <img :src="formItem.cover"></img>
                </div>
            </FormItem>
            <FormItem label="文章作者:" prop="author">
                <Input v-model="formItem.author" style="width: 500px" placeholder="请输入文章作者" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem label="文章阅读量:" prop="reading">
                <Input v-model="formItem.reading" style="width: 500px" placeholder="请输入文章阅读量" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem label="文章链接:" prop="art_url">
                <Input v-model="formItem.art_url" style="width: 500px" placeholder="请输入文章链接" :disabled="change" :readonly="change"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSave('formdata')">{{change ? "修改" : "保存" }}</Button>
                &nbsp;&nbsp;保存即可在右边预览效果
                <Button @click="handleReset" style="margin-left: 8px" :disabled="change">重置</Button>
                &nbsp;&nbsp;重置可清空当前项的数据
            </FormItem>
        </Form>
        <Modal title="编辑图片" v-model="modal" :closable="false" :mask-closable="false" @on-ok="setImage" @on-cancel="cancel" width="630">
            <div class="img-box">
                <canvas ref="canvas" id="canvas"></canvas>
            </div>
        </Modal>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormItem from './Item';
import Cropper from 'cropperjs';
import { UploadAPI } from '../api/index';

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
        reading: [{ required: true, message: '阅读量是必填的', trigger: 'blur' }],
        art_url: [{ required: true, message: '链接是必填的', trigger: 'blur' }],
    };
    @Prop()
    private itemID?: string;
    private extension: string = '';
    private group: string = 'report';
    private change: boolean = false;
    private modal: boolean = false;
    private cropper?: Cropper;

    public handleSave(name: string): void {
        (this.$refs.formdata as any).validate((val: boolean) => {
            if (val) {
                if (this.formItem.cover.search(/base64/) > 0) {
                    UploadAPI.upload({
                        file: this.formItem.cover.split(',')[1],
                        group: this.group,
                        ext: this.extension,
                    }).then((res) => {
                        if (res.data.err !== '0') {
                            (this as any).$Notice.error({
                                title: res.data.msg,
                                desc: '网络出错',
                            });
                        } else {
                            const { url } = res.data.ret;
                            this.formItem.cover = url;
                            this.change = !this.change;
                            if (this.change) {
                                this.$emit('itemSave', this.formItem);
                            }
                        }
                    });
                } else {
                    this.change = !this.change;
                    if (this.change) {
                        this.$emit('itemSave', this.formItem);
                    }
                }
            }
        });
    }
    public handleUpload(event: File) {
        const reader = new FileReader();
        this.extension = event.name.split('.').pop() as string;
        reader.readAsDataURL(event);
        reader.onload = (e) => {
            const { result } = e.target as FileReader;
            const image = new Image();
            const canvas = this.$refs.canvas as HTMLCanvasElement;
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            image.src = result as string;
            image.onload = () => {
                const cw = image.width;
                const ch = image.height;
                let w = image.width;
                let h = image.height;
                canvas.width = w;
                canvas.height = h;
                if (cw > 600 && cw > ch) {
                    w = 600;
                    h = (600 * ch) / cw;
                    canvas.width = w;
                    canvas.height = h;
                }
                if (ch > 600 && ch > cw) {
                    h = 600;
                    w = (600 * cw) / ch;
                    canvas.width = w;
                    canvas.height = h;
                }
                ctx.drawImage(image, 0, 0, w, h);
                image.src = '';
                this.modal = true;
                this.imgCropper(canvas);
            };
        };
        return false;
    }
    public imgCropper(element: HTMLImageElement | HTMLCanvasElement): void {
        this.cropper = new Cropper(element, {
            aspectRatio: 19 / 7,
            viewMode: 1,
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
    private setImage(): void {
        this.formItem.cover = (this.cropper as Cropper)
            .getCroppedCanvas()
            .toDataURL('image/jpeg', 0.7);
        (this.cropper as Cropper).destroy();
    }
    private cancel(): void {
        (this.cropper as Cropper).destroy();
    }
}
</script>

<style scoped lang='less'>
.item {
    margin-left: 20px;
}
.item-header {
    background: #fff;
    text-align: center;
    font-size: 24px;
    line-height: 24px;
    height: 36px;
}
.img-box {
    width: 600px;
    height: 600px;
    background: #cccc;
    img {
        width: 100%;
    }
}
.cover {
    width: 300px;
    margin-left: 40px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 100%;
    }
}
</style>