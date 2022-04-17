<template>
   <div id="article-add-edit">
      <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
      <el-dialog title="文章编辑" :visible.sync="dialogFormVisible" fullscreen>
         <el-form :model="form" class="form">
            <!-- 标题 -->
            <el-form-item label="标题" :label-width="formLabelWidth" class="item">
               <el-input v-model="form1.title" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 封面 -->
            <el-form-item label="封面" :label-width="formLabelWidth" class="item" id="upload">
               <div class="cover">
                  <el-image :src="form1.imageUrl">
                     <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline-round"></i>
                     </div>
                  </el-image>
               </div>
               <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
               </el-upload>
            </el-form-item>
            <!-- 分类 -->
            <el-form-item label="分类" :label-width="formLabelWidth" class="item">
               <el-cascader clearable v-model="form1.categoryId" :options="category" :props="optionProps" :show-all-levels="false"></el-cascader>
            </el-form-item>
            <!-- 标签 -->
            <el-form-item label="标签" :label-width="formLabelWidth" class="item">
               <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
               </el-tag>
               <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                  @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
               </el-input>
               <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>
            <!-- Markdown编辑器 -->
            <el-form-item :label-width="formLabelWidth" class="item">
               <mavon-editor class="editor" v-model="form1.content" :scrollStyle="true" />
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
         </div>
      </el-dialog>
   </div>
</template>
<script>
   import { getArticleInfo, saveArticle } from 'network/article.js'
   import { getCategory } from 'network/category.js'
   export default {
      name: 'ArticleAddAndEditButton',
      data() {
         return {
            // 级联选择器 分类数据
            category: [],
            // 级联选择器 更改键名
            optionProps: {
               value: 'categoryId',
               label: 'categoryName',
               children: 'subCategory'
            },
            form1: {
               title: '',
               imageUrl: '',
               categoryId: '',
               labelIds: [],
               content: ''
            },
            dynamicTags: ['标签一', '标签二', '标签三'], // 标签名
            handbook: '',
            dialogFormVisible: false,
            form: {
               name: '',
               region: '',
               date1: '',
               date2: '',
               delivery: false,
               type: [],
               resource: '',
               desc: ''
            },
            formLabelWidth: '70px',
            options: [{
               value: 'zhinan',
               label: '指南',
               parentCategoryId: 0,
               iconUrl: null,
               sort: 1,
               children: [{
                  value: 'shejiyuanze',
                  label: '设计原则',
                  parentCategoryId: 5,
                  iconUrl: null,
                  sort: 1,
               }, {
                  value: 'daohang',
                  label: '导航',
                  children: [{
                     value: 'cexiangdaohang',
                     label: '侧向导航'
                  }, {
                     value: 'dingbudaohang',
                     label: '顶部导航'
                  }]
               }]
            }, {
               value: 'zujian',
               label: '组件',
               children: [{
                  value: 'basic',
                  label: 'Basic',
               }, {
                  value: 'form',
                  label: 'Form',
               }, {
                  value: 'notice',
                  label: 'Notice',
               }, {
                  value: 'navigation',
                  label: 'Navigation',
               }, {
                  value: 'others',
                  label: 'Others',
               }]
            }, {
               value: 'ziyuan',
               label: '资源',
               children: [{
                  value: 'axure',
                  label: 'Axure Components'
               }, {
                  value: 'sketch',
                  label: 'Sketch Templates'
               }, {
                  value: 'jiaohu',
                  label: '组件交互文档'
               }]
            }],
            inputVisible: false,
            inputValue: '',
         }
      },
      created() {
      },
      computed: {
      },
      methods: {
         handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
         },

         showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
               this.$refs.saveTagInput.$refs.input.focus();
            });
         },

         handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
               this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
         }
      },
      watch: {
         dialogFormVisible(newValue, oldValue) {
            // dialog显示
            if (newValue) {
               // 更新分类数据
               getCategory().then(res => {
                  // 分类数据清洗-删除subCategory长度为0时的category的subCategory
                  const categoryCleaning = function (categoryData) {
                     for(let category of categoryData) {
                        if(category.subCategory.length === 0) {
                           Reflect.deleteProperty(category, 'subCategory')
                        }else {
                           categoryCleaning(category.subCategory)
                        }
                     }
                  }
                  categoryCleaning(res.data.data)
                  this.category = res.data.data
               })
               // 判断当前是编辑还是添加，更新data
            }
         }
      },
      props: {
      }
   }
</script>
<style scoped>
   /* 封面图片大小 */
   .cover {
      float: left;
      margin-right: 20px;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 25px;
      height: 60px;
      width: 60px;

   }

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