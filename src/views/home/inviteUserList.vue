 <template>
  <div>
    <headerTop />

    <div class="tabContaobao">
      <div class="btnCon">
        <div class="option">
                  <el-input placeholder="请输入搜索关键词"
            v-model="keyWords" >
    <el-button slot="append" icon="el-icon-search" @click="getList(1)"></el-button>
  </el-input>
        </div>
        <el-tabs
          v-model="tabPosition"
          @tab-click="handleClickRight"
        >
          <el-tab-pane
            label="按客单价"
            name="avgCustomerPrice"
          ></el-tab-pane>
          <el-tab-pane
            label="按总销售额"
            name="totalSales"
          ></el-tab-pane>
          <el-tab-pane
            label="按总销量"
            name="totalSold"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div
        class="listBtn"
        style="margin-bottom: 30px;"
      >
        <p style="color:#fff">淘宝主播带货排行榜</p>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-style="cellStyle"
        @cell-click="cellClick"
      >
        <el-table-column
          prop="name"
          label="淘宝主播名"
        >
        </el-table-column>
        <el-table-column
          prop="avgCustomerPrice"
          align="center"
          label="客单价（元/单）"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="avgLiveOnlineViews"
          label="厂均同时最高在线（人）"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="avgLiveViews"
          label="场均观看次数"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="numLives"
          label="直播次数"
        >
        </el-table-column>
        <el-table-column
          prop="totalSales"
          align="center"
          label="总销售额（元）"
        >
        </el-table-column>
        <el-table-column
          prop="totalSold"
          align="center"
          label="总销售量（件）"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        @current-change="handleCurrentChange"
        :page-size="pageNum"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
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
      keyWords: "",
      tabPosition: "avgCustomerPrice",
      total: 4,
      pageSize: 1,
      pageNum: 10,
      tableData: [
        // {
        //   name: "网红方便面网红方便面网红方便面",
        //   zhubo: "王小虎",
        //   ptai: "淘宝",
        //   date: "2016-05-02",
        //   price: "2093",
        //   xiaoliang: "10000",
        //   danjia: "18.69",
        // },
      ],
    };
  },
  watch: {},
  mounted() {
    this.getList(1);
  },
  computed: {},
  created() {},
  methods: {
    cellStyle({ column }) {
      if (column.label === "淘宝主播名") {
        return "cursor:pointer";
      }
      return false;
    },
    handleClickRight(tab) {
      this.tabPosition = tab.name;
      this.getList(this.tabPosition, 1);
    },
    cellClick(column, cell) {
      if (cell.label == "淘宝主播名") {
        this.$router.push({path: '/detailtb', query: {id: column.anchorId, name: 'tb'}})
      }
    },
    //列表方法
    getList(pageSize) {
      axios
        .get("http://43.254.55.231:8080/api/anchor/tb", {
          params: {
            current_page: this.pageSize,
            page_size: this.pageNum,
            sort_field: this.tabPosition,
            name: this.keyWords,
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
      this.getList(v);
    },
  },
};
</script>

<style lang="less">
.tabContaobao {
  position: relative;
  margin: 30px;
  padding: 20px;
  background: #262837;
  border-radius: 10px;
  .btnCon {
    position: absolute;
    right: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    > div {
      display: inline-block;
    }
    .el-tabs__header {
      margin: 0;
    }
    .option {
      width: 200px;
      margin-right: 30px;
      .el-input__inner {
        background: #262837;
        color: #fff;
        height: 32px;
        line-height: 32px;
        border-right: 0;
      }
      .el-input__suffix {
        right: 0;
      }
      .el-input-group__append {
    background-color: #409eff;
    color: #fff;
    border: 1px solid #409eff;
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

  .el-tabs__item {
    padding: 0 15px;
  }

  .el-tabs__item {
    height: 30px;
    line-height: 30px;
  }
  .el-tabs__active-bar {
    width: 14px !important;
    left: 7px !important;
  }
  .el-table th,
  .el-table tr {
    background-color: #262837;
    color: #fff;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #262837;
    color: #fff;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #7a7b7d;
  }
  .el-tabs__nav-wrap:after {
    background-color: transparent;
  }
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
  .el-table thead {
    font-size: 13px;
  }
  .el-table th {
    color: #98999d;
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