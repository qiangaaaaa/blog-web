<template>
    <div>
        <div class="mavonEditor">
            <mavon-editor v-model="handbook" @save="saveContent" @imgAdd="$imgAdd" />
        </div>
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>
<script>
    import { updateArticle, policy } from 'network/article.js'
    export default {
        name: '',
        data() {
            return {
                handbook: ''
            }
        },
        created() {
            policy().then(res => {
                console.log(res);
            })
        },
        computed: {
        },
        methods: {
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
                // 第一步.将图片上传到服务器.
                let formdata = new FormData();
                formdata.append('image', $file);
                console.log($file);
                axios({
                    url: 'server url',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    // $vm.$img2Url 详情见本页末尾
                    $vm.$img2Url(pos, url);
                })
            }
        },
    }
</script>
<style scoped>

</style>