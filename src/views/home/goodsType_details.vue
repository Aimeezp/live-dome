 <template>
  <div>
    <headerTop />

    <div class="tabCon">
      <div class="btnCon">

        <el-tabs v-model="tabPosition" @tab-click="handleClickRight">
          <el-tab-pane label="按客单价" name="avgCustomerPrice"></el-tab-pane>
          <el-tab-pane label="按总销售额" name="totalSales"></el-tab-pane>
          <el-tab-pane label="按总销量" name="totalSold"></el-tab-pane>
          <el-tab-pane label="按转化率" name="conRate"></el-tab-pane>
          <el-tab-pane label="按GPM" name="gpm"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="listBtn">
         <p style="color:#0c87ff">品类：{{goodsName}}</p>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="totalSales"
          align="center"
          show-overflow-tooltip
          label="品类销售额（元）">
        </el-table-column>
        <el-table-column
          prop="totalSold"
          align="center"
          label="品类销量（件）">
        </el-table-column>
        <el-table-column
          prop="price"
          align="center"
          width="150px"
          label="品类单价（元/件）">
        </el-table-column>
        <el-table-column
          prop="conRate"
          align="center"
          label="转化率">
        </el-table-column>
        <el-table-column
          prop="gpm"
          align="center"
          label="GPM">
        </el-table-column>
    </el-table>
    <el-pagination
      background
      prev-text="上一页"
      next-text="下一页"
      @current-change="handleCurrentChange"
      :page-size="pageNum"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import headerTop from "../../components/header";
import cookie from "js-cookie";
import axios from "axios";
export default {
  components: {
    headerTop,
  },
  data() {
    return {
      goodsName:'食品',
      activeName: "tb",
      tabPosition: "avgCustomerPrice",
      total: 0,
      pageSize: 1,
      pageNum: 10,
      tableData: [],
    };
  },
  watch: {},
  mounted() {
    this.getList(this.activeName, 1);
  },
  computed: {},
  created() {},
  methods: {

    // 全部/淘宝/抖音tab切换
    handleClick(tab) {
      console.log(tab);
      this.activeName = tab.name;
      this.getList(this.activeName, 1,this.tabPosition);
    },
    //右边切换
    handleClickRight(tab) {
      this.tabPosition = tab.name;
      this.getList(this.activeName, this.pageNum,this.tabPosition);
    },
    goodChang(v) {
      this.getList(this.activeName, this.pageNum, v, this.tabPosition);
    },
    //列表方法
    getList(name, pageNum, goodType, tabPosition) {
      axios
        .get("http://43.254.55.231:8080/api/cate/detail", {
          params: {
             goodsType: this.$route.query.goodsType,
            current_page: this.pageSize,
            page_size: this.pageNum,
            type: this.activeName,
            sort_field: this.tabPosition,
          },
        })
        .then((res) => {
          console.log(res)
               this.goodsName = res.data.data.goods_type
            this.tableData = res.data.data.list.list;
            this.total = res.data.data.list.total;
          if (res.data.code && res.data.code == 200) {
       
          }
        })
        .catch((e) => {
          console.log("获取数据失败");
        });
    },
    //翻页
    handleCurrentChange(v) {
      this.pageSize = v;
      this.getList(this.activeName, v, this.tabPosition);
    },
  },
};
</script>

<style lang="less">
.el-select-dropdown {
  background: #262837;
  color: #fff;
  border: none;
  .popper__arrow {
    display: none;
  }
}
.el-select-dropdown__item {
  color: #fff;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #409eff;
  color: #fff;
}
.tabCon {
  position: relative;
  margin: 30px;
  padding: 20px;
  background: #262837;
  border-radius: 10px;
  .el-tabs__header {
    margin: 0;
  }
  .btnCon {
    position: absolute;
    right: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    > div {
      display: inline-block;
    }
    .option {
      width: 150px;
      margin-right: 30px;
      .el-input__inner {
        background: #262837;
        color: #fff;
        height: 32px;
        line-height: 32px;
      }
      .el-input__icon {
        line-height: 32px;
      }
    }

    .el-tabs--top .el-tabs__item.is-top:last-child {
      padding-right: 10px;
    }
    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 10px;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__item {
      color: #fff;
      padding: 0 10px;
      border-radius: 5px;
      border: 1px solid #fff;
      margin: 5px;
      font-size: 12px;
      line-height: 30px;
      height: 30px;
    }
    .el-tabs__item.is-active,
    .el-tabs__item:hover {
      background-color: #409eff;
      border: 1px solid #409eff;
    }
  }
  .listBtn {
    margin-bottom: 30px;
    .el-tabs__item {
      color: #6f717e;
      padding: 0 15px;
    }
    .el-tabs__item.is-active,
    .el-tabs__item:hover {
      color: #409eff;
    }
    .el-tabs__item {
      height: 30px;
      line-height: 30px;
    }
    .el-tabs__active-bar {
      width: 14px !important;
      left: 7px !important;
    }
  }
  .el-table,
  .el-table__expanded-cell {
    background-color: transparent;
  }
  .el-table:before {
    height: 0;
  }
  .el-pagination.is-background .el-pager li {
    background-color: #404040;
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    background-color: #409eff;
    color: #fff;
  }
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .btn-prev:disabled {
    background-color: #404040;
    color: #fff;
    min-width: 57px;
  }
  .el-pagination__total {
    color: #fff;
  }
}
</style>