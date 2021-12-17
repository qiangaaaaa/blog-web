<template>
   <div class="data-edit-button">
      <el-button type="primary" icon="el-icon-edit" circle @click="show"></el-button>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
         <el-form :model="form">
            <el-form-item :label="key" :label-width="formLabelWidth" v-for="(value,key,index) in data"
               :key='index'>
               <el-input v-model="changedData[key]" autocomplete="off"></el-input>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">立即修改</el-button>
         </div>
      </el-dialog>
   </div>
</template>
<script>
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
            changedData: {}
         }
      },
      mounted() {
         // 保存data
         this.changedData = this.data
      },
      computed: {
      },
      methods: {
         show() {
            this.dialogFormVisible = true
         },
         cancelEdit() {
            this.dialogFormVisible = false 
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