<template>
   <div class="data-edit-button">
      <el-button type="primary" icon="el-icon-edit" circle @click="show"></el-button>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
         <el-form :model="form">
            <el-form-item :label="showKeys[0]" :label-width="formLabelWidth">
               <el-input :value="changedData[showKeys[0]]" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item :label="item" :label-width="formLabelWidth" v-for="(item,index) in showKeys.slice(1)"
               :key='index'>
               <el-input v-model="changedData[item]" autocomplete="off"></el-input>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit">取 消</el-button>
            <el-button type="primary" @click="modifyQuick">立即修改</el-button>
         </div>
      </el-dialog>
   </div>
</template>
<script>
   import { updateUser } from 'network/common'

   export default {
      name: 'DataEditButton',
      data() {
         return {
            dialogTableVisible: false,
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
            formLabelWidth: '120px',
            changedData: {}, // 已更改的数据，即将提交到服务器
            showKeys: [] // 要展示的数据（去除id）
         }
      },
      created() {
         // 初始化changedData
         this.changedData = this.data
         // 初始化showKeys
         this.showKeys = Object.keys(this.data)
      },
      watch: {
         data(newValue, oldValue) {
            // 保存data
            this.changedData = newValue
            // 更改showKeys的值
            this.showKeys = Object.keys(newValue)
         }
      },
      computed: {
      },
      methods: {
         show() {
            this.dialogFormVisible = true
         },
         // 取消编辑
         cancelEdit() {
            this.dialogFormVisible = false
         },
         // 立即修改
         modifyQuick() {
            // 有BUG
            const nowUrl = this.$parent.$parent.url
            updateUser(`${nowUrl}/save`, this.changedData).then(res => {
               this.dialogFormVisible = false
               console.log(res);
               // 刷新表格数据
               this.$parent.$parent.getUserManageData(1)
            })
         }
      },
      props: {
         // 需要修改的数据
         data: {
            type: Object,
            default: {}
         },
      }
   }
</script>
<style scoped>
   .data-edit-button {
      display: inline-block;
   }
</style>