<template>
    <div>
        <div class="mavonEditor">
            <mavon-editor v-model="handbook" @save="saveContent" @imgAdd="$imgAdd" />
        </div>
        <el-upload class="upload-demo" :data="pictureData" drag
            :action="pictureData.host || 'https://blog-lh.oss-cn-chengdu.aliyuncs.com'" :before-upload="beforeUpload"
            :on-success="handleUploadSuccess" list-type="picture" :on-error="handleUploadError">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>
<script>
    import { updateArticle, policy, postImg } from 'network/article.js'
    import { getUuid } from 'common/utils.js'
    export default {
        name: '',
        data() {
            return {
                handbook: '',
                pictureData: {}
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
            // 上传文件之前的钩子
            beforeUpload(file) {
                let _self = this
                return new Promise((resolve, reject) => {
                    // 获取签名
                    policy().then(res => {
                        _self.pictureData = res.data
                        const uuid = getUuid()
                        _self.pictureData.key = uuid
                        resolve(true)
                    }).catch(err => {
                        reject(false)
                    })
                })
            },
            // upload上传成功时的钩子
            handleUploadSuccess(response, file, fileList) {
            },
            // upload上传失败时的钩子
            handleUploadError(err, file) {
            },
            // 保存内容
            saveContent(str1, str2) {
                this.handbook = str1

                const postData =
                {
                    "articleId": 64, //文章id
                    "title": "Java基础", //标题
                    "content": this.handbook, //内容
                    "labelIds": [
                        9
                    ] //文章标签id  
                }

                updateArticle(postData).then(res => {
                    console.log(res.data);
                })
            },
            // 绑定@imgAdd event
            $imgAdd(pos, $file) {
                let host = ''
                policy().then(res => {
                    console.log(res.data.data);
                    // 获取签名
                    const { dir, policy, accessid, signature} = res.data.data
                    const key = dir + getUuid()
                    host = res.data.data.host || 'https://blog-lh.oss-cn-chengdu.aliyuncs.com'
                    const formData = {
                        key,
                        policy,
                        OSSAccessKeyId: accessid,
                        signature,
                        'success_action_status': 200
                    }
                    console.log('测试图片访问路径：https://blog-lh.oss-cn-chengdu.aliyuncs.com/' + key);
                    return new Promise((resolve) => {
                        resolve(formData)
                    })
                }).then(res => {
                    // 整理要发送的数据
                    let formData = new FormData()
                    for (let item in res) {
                        formData.append(item, res[item])
                    }
                    formData.append('file', $file);
                    return postImg(host, formData)
                }).then(res => {
                    console.log(res);
                })
            }
        },
    }
</script>
<style scoped>

</style>