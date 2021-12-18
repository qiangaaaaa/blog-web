import { debounce } from "./utils";

// 混入

// 查询按钮
export const searchInputDebounceMixin = {
    data(){
        // 初始化
        searchInputChange: null
    },
    mounted() {
        // 防抖函数
        this.searchInputChange = debounce(()=>{
            this.searchClick()
        })
    },
    methods: {
        // 搜索框input发生变化时触发
        searchInput() {
            this.searchInputChange()
        }
    }
}