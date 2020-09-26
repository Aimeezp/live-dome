<template>
  <div class="tableCon">
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-style="cellStyle"
        @cell-click="cellClick"
      >
        <el-table-column
          prop="goodsName"
          show-overflow-tooltip
          label="商品名称">
        </el-table-column>
             <el-table-column
          prop="goodsType"
          align="center"
          show-overflow-tooltip
          label="品类">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          show-overflow-tooltip
          label="带货主播">
        </el-table-column>
        <el-table-column
          prop="source"
          align="center"
          label="带货平台">
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          label="直播日期">
        </el-table-column>
        <el-table-column
          prop="numSales"
          align="center"
          label="单品销售额（元）">
        </el-table-column>
        <el-table-column
          prop="numSold"
          align="center"
          label="单品销量（件）">
        </el-table-column>
        <el-table-column
          prop="price"
          align="center"
          label="单品价格（元/件）">
        </el-table-column>
        <el-table-column
          prop="conRate"
          align="center"
          label="转化率">
        </el-table-column>
        <el-table-column
          prop="gpm"
          align="center"
          label="GMP">
        </el-table-column>
    </el-table>
    <el-pagination
      background
      prev-text="上一页"
      next-text="下一页"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  props: ['total', 'tableData', 'pageSize', 'cellStyle'],
  methods: {
    // 获取当前页
    handleCurrentChange(val){
      this.$emit('handleCurrentChange', val)
    },
    cellClick(column, cell){
      this.$emit('cellClick',column, cell)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less'>
.el-table th, .el-table tr {
  background-color: #262837;
  color:#fff;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #262837;
  color:#fff;
}
.el-table td, .el-table th.is-leaf {
  border-bottom: 1px solid #7a7b7d;
}
.el-tabs__nav-wrap:after {
  background-color: transparent;
}
.el-pagination{
  text-align: right;
  margin-top:20px
}
.el-table thead{
  font-size: 13px;
}
.tableCon .el-table th{
  color: #98999d;
}
</style>
