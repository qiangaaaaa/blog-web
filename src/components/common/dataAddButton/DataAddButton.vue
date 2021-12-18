<template>
    <div>
        <el-button type="success" icon="el-icon-plus" round>添加</el-button>
    </div>
</template>
<script>
export default {
   name: 'DataAddButton',
   data() {
      return {
      }
   },
   created(){
   },
   computed:{
   },
   methods:{
   },
   props: {
       keys: {
           type:Array,
           default: []
       }
   }
}
</script>
<style scoped>

</style>
