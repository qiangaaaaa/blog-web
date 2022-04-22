<template>
   <div id="article-add-edit">
      <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
      <el-dialog title="文章编辑" :visible.sync="dialogFormVisible" fullscreen>
         <el-form :model="form" class="form">
            <!-- 标题 -->
            <el-form-item label="标题：" :label-width="formLabelWidth" class="item">
               <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 封面 -->
            <el-form-item label="封面：" :label-width="formLabelWidth" class="item" id="upload">
               <el-upload class="upload-demo" drag :action="imgUploadHost" :before-upload="beforeUpload"
                  list-type="picture" :data="uploadData" :on-success="handleUploadSuccess" :limit="1"
                  :on-remove="handleRemove" :on-error="handleUploadError">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__tip" slot="tip">只能上传1张图片，大小不限制</div>
               </el-upload>
            </el-form-item>
            <!-- 分类 -->
            <el-form-item label="分类：" :label-width="formLabelWidth" class="item">
               <el-cascader clearable v-model="form.categoryId" :options="category" :props="optionProps"
                  :show-all-levels="false"></el-cascader>
            </el-form-item>
            <!-- 标签 -->
            <el-form-item label="标签：" :label-width="formLabelWidth" class="item">
               <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
               </el-tag>
               <el-input class="input-new-tag" v-if="inputVisible" v-model="inputLabel" ref="saveTagInput" size="small"
                  @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
               </el-input>
               <el-button v-else class="button-new-tag" size="small" @click="showLabelInput">+ New Tag</el-button>
            </el-form-item>
            <!-- Markdown编辑器 -->
            <el-form-item :label-width="formLabelWidth" class="item">
               <mavon-editor ref="md" class="editor" v-model="form.content" @imgAdd="$imgAdd" :scrollStyle="true" />
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCancel">取 消</el-button>
            <el-button type="primary" @click="dialogSubmit">确 定</el-button>
         </div>
      </el-dialog>
   </div>
</template>
<script>
   import { getArticleInfo, saveArticle, policy, postImg } from 'network/article.js'
   import { getCategory } from 'network/category.js'
   import { addUser } from 'network/common.js'
   import { getUuid, deepClone } from 'common/utils.js'

   export default {
      name: 'ArticleAddAndEditButton',
      data() {
         return {
            // upload 图片上传的服务器路径
            imgUploadHost: 'https://blog-lh.oss-cn-chengdu.aliyuncs.com',
            // upload 传输的数据
            uploadData: {},
            apiType: 'save',
            // 标签 添加标签临时存储
            inputLabel: '',
            // 级联选择器 分类数据
            category: [],
            // 级联选择器 props配置
            optionProps: {
               value: 'categoryId',
               label: 'categoryName',
               children: 'subCategory',
               emitPath: false
            },
            // 表单
            form: {
               title: '',
               imageUrl: '',
               categoryId: '',
               labelIds: [],
               content: ''
            },
            // 原始表单
            formOrigin: {
               title: '',
               imageUrl: '',
               categoryId: '',
               labelIds: [],
               content: ''
            },
            dynamicTagsObj: {}, // 标签
            dialogFormVisible: false, // dialog是否显示
            formLabelWidth: '70px',
            inputVisible: false,
         }
      },
      created() {
      },
      computed: {
         dynamicTags() {
            return Object.keys(this.dynamicTagsObj)
         }
      },
      methods: {
         // dialog 点击确认事件触发函数
         dialogSubmit() {
            // 上传保存文章
            saveArticle(this.form).then(res => {
               this.$message({
                  type: 'success',
                  message: '上传成功'
               });
               this.dialogFormVisible = false
            })
         },
         // dialog 点击取消事件触发函数
         dialogCancel() {
            this.$message({
               type: 'success',
               message: '取消成功'
            });
            this.dialogFormVisible = false
            this.form = deepClone(this.formOrigin) // 数据还原
         },
         // upload 在上传之前 获取签名
         beforeUpload() {
            return policy().then(res => {
               // 获取签名
               const { dir, policy, accessid, signature } = res.data.data
               const key = dir + getUuid()
               this.imgUploadHost = res.data.data.host || 'https://blog-lh.oss-cn-chengdu.aliyuncs.com'
               const formData = {
                  key,
                  policy,
                  OSSAccessKeyId: accessid,
                  signature,
                  'success_action_status': 200
               }
               console.log('upload测试图片访问路径：https://blog-lh.oss-cn-chengdu.aliyuncs.com/' + key);
               this.uploadData = formData // 更新上传数据
               this.form.imageUrl = 'https://blog-lh.oss-cn-chengdu.aliyuncs.com/' + key // 更新form表单img路径
               return new Promise((resolve) => {
                  resolve(true)
               })
            }).catch(err => {
               return new Promise((resolve, reject) => {
                  reject(false)
               })
            })
         },
         // upload 上传成功时的钩子
         handleUploadSuccess(response, file, fileList) {
            this.$message({
               type: 'success',
               message: '封面上传成功！'
            });
         },
         // upload 上传失败时的钩子
         handleUploadError(err, file) {
            this.$message({
               type: 'error',
               message: '未知错误，封面上传失败'
            });
         },
         // upload 文件列表移除文件时的钩子
         handleRemove(file, fileList) {
            this.form.imageUrl = '' // 图片路径置空
            this.$message({
               type: 'info',
               message: '文件移除成功'
            });
         },
         // label 删除选中label的事件处理函数
         handleClose(tag) {
            this.delLabel(tag)
            this.$message({
               type: 'success',
               message: '标签删除成功'
            });
         },
         // label 点击新增的事件处理函数
         showLabelInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
               this.$refs.saveTagInput.$refs.input.focus();
            });
         },
         // label 手动输入确认
         handleInputConfirm() {
            let labelName = this.inputLabel;
            if (labelName) {
               const postData = {
                  labelName
               }
               addUser('label/save', postData).then(res => {
                  if (res.data.status == 0) {
                     // 数据库添加成功
                     this.addLabel(labelName, res.data.data.labelId)
                  } else {
                     // 数据库添加失败
                  }
               })
            }
            this.$message({
               type: 'success',
               message: '新增标签成功'
            });
            this.inputVisible = false;
            this.inputLabel = '';
         },
         // label 添加新标签
         addLabel(labelName, labelId) {
            this.$set(this.dynamicTagsObj, labelName, labelId)
         },
         // label 删除标签
         delLabel(labelName) {
            this.$delete(this.dynamicTagsObj, labelName)
         },
         // mavon-editor 图片上传
         $imgAdd(pos, $file) {
            let host = ''
            let changeImgUrl = ''
            policy().then(res => {
               // 获取签名
               const { dir, policy, accessid, signature } = res.data.data
               const key = dir + getUuid()
               host = res.data.data.host || 'https://blog-lh.oss-cn-chengdu.aliyuncs.com'
               const formData = {
                  key,
                  policy,
                  OSSAccessKeyId: accessid,
                  signature,
                  'success_action_status': 200
               }
               console.log('mavon-editor测试图片访问路径：https://blog-lh.oss-cn-chengdu.aliyuncs.com/' + key);
               // 图片URL初始化
               changeImgUrl = 'https://blog-lh.oss-cn-chengdu.aliyuncs.com/' + key
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
               // mavon-editor切换图片路径
               this.$refs.md.$img2Url(pos, changeImgUrl)
               console.log('mavon-editor：上传图片成功');
            })
         },

         // category 刷新分类数据
         refreshCategory() {
            getCategory().then(res => {
               // 分类数据清洗-删除subCategory长度为0时的category的subCategory
               const categoryCleaning = function (categoryData) {
                  for (let category of categoryData) {
                     if (category.subCategory.length === 0) {
                        Reflect.deleteProperty(category, 'subCategory')
                     } else {
                        categoryCleaning(category.subCategory)
                     }
                  }
               }
               categoryCleaning(res.data.data)
               this.category = res.data.data
            })
         },
      },
      watch: {
         // dialog 显示监听
         dialogFormVisible(newValue, oldValue) {
            // dialog显示
            if (newValue) {
               // 更新分类数据
               this.refreshCategory()
               // 判断当前是编辑还是添加，更新data
            }
         },
         // dynamicTagsObj 监听
         dynamicTagsObj(newValue, oldValue) {
            this.form.labelIds = Object.values(newValue)
         }
      },
      props: {
      }
   }
</script>
<style scoped>
   /* 样式穿透，修改vue组件样式 */
   .item>>>.el-form-item_content {
      line-height: 20px !important;
   }

   .upload-demo>>>.el-upload-dragger {
      width: 120px !important;
      height: 60px !important;
   }

   .upload-demo>>>.el-upload-dragger .el-icon-upload {
      margin: 0 !important;
      font-size: 40px !important;
      line-height: 60px !important;
   }

   #upload>>>.el-form-item__content {
      line-height: 10px !important;
   }

   .item {
      /* 修改表单间距 */
      margin-bottom: 10px !important;
   }

   .el-tag+.el-tag {
      margin-left: 10px;
   }

   .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
   }

   .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
   }

   .upload-demo {
      width: 500px;
   }
</style>