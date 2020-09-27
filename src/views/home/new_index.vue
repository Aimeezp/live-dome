 <template>
  <div>
    <headerTop />

    <div class="tabCon">
      <div class="btnCon">
        <div class="option">
          <el-select v-model="value" placeholder="品类筛选" @change="goodChang">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-tabs v-model="tabPosition" @tab-click="handleClickRight">
          <el-tab-pane label="按客单价" name="avgCustomerPrice"></el-tab-pane>
          <el-tab-pane label="按总销售额" name="totalSales"></el-tab-pane>
          <el-tab-pane label="按总销量" name="totalSold"></el-tab-pane>
          <el-tab-pane label="按转化率" name="conRate"></el-tab-pane>
          <el-tab-pane label="按GPM" name="gpm"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="listBtn">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="all"></el-tab-pane>
          <el-tab-pane label="淘宝" name="tb"></el-tab-pane>
          <el-tab-pane label="抖音" name="dy"></el-tab-pane>
        </el-tabs>
      </div>
      <tableCon
        @handleCurrentChange="handleCurrentChange"
        :total="total"
        :pageSize="pageNum"
        :tableData="tableData"
        :cellStyle="cellStyle"
        @cellClick="cellClick"
      ></tableCon>
    </div>
  </div>
</template>

<script>
import headerTop from "../../components/header";
import tableCon from "../../components/table";
import cookie from "js-cookie";
import axios from "axios";
export default {
  components: {
    headerTop,
    tableCon,
  },
  data() {
    return {
      value: "",
      options: [
        {
          value: "食品",
          label: "食品",
        },
        {
          value: "化妆品",
          label: "化妆品",
        },
        {
          value: "快消品",
          label: "快消品",
        },
        {
          value: "汽车",
          label: "汽车",
        },
      ],
      activeName: "all",
      tabPosition: "avgCustomerPrice",
      total: 0,
      pageSize: 1,
      pageNum: 10,
      tableData: [],
    };
  },
  watch: {},
  mounted() {
    this.getList(this.activeName, 1, this.value);
  },
  computed: {},
  created() {},
  methods: {
    cellStyle({ column }) {
      if (column.label === "带货主播") {
        return "cursor:pointer";
      }
      return false;
    },
    cellClick(column, cell) {

      if (cell.label == "带货主播") {
     if(column.source === "淘宝"){
          this.$router.push({path: '/detailtb', query: {id: column.anchorId}})
        }  else{
           this.$router.push({path: '/detaildy', query: {id: column.anchorId}})
        } 
      }
    },
    // 全部/淘宝/抖音tab切换
    handleClick(tab) {
      console.log(tab);
      this.activeName = tab.name;
      this.getList(this.activeName, 1, this.value, this.tabPosition);
    },
    //右边切换
    handleClickRight(tab) {
      this.tabPosition = tab.name;
      this.getList(this.activeName, this.pageNum, this.value, this.tabPosition);
      console.log(tab);
    },
    goodChang(v) {
      this.getList(this.activeName, this.pageNum, v, this.tabPosition);
    },
    //列表方法
    getList(name, pageNum, goodType, tabPosition) {
      axios
        .get("http://43.254.55.231:8080/api/index/list", {
          params: {
            current_page: this.pageSize,
            page_size: this.pageNum,
            type: this.activeName,
            goodsType: this.value,
            sort_field: this.tabPosition,
          },
        })
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
        .catch((e) => {
          console.log("获取数据失败");
        });
    },
    //翻页
    handleCurrentChange(v) {
      this.pageSize = v;
      this.getList(this.activeName, v, this.value, this.tabPosition);
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