 <template>
  <div>
    <headerTop />

    <div class="tabCon">
      <div class="btnCon">

        <el-tabs v-model="tabPosition" @tab-click="handleClickRight">
           <el-tab-pane label="按客单价" name="avgCustomerPrice"></el-tab-pane>
          <el-tab-pane label="按总销售额" name="totalSales"></el-tab-pane>
          <el-tab-pane label="按总销量" name="totalSold"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="listBtn">
        <p style="color:#0c87ff; margin-bottom:10px;font-weight:bold">{{anchor_name}}</p>
         <p style="color:#0c87ff">品类：{{goodsName}}</p>
      </div>
             <div class="totalCon">
          <div>
            <p>品类总销售额</p>
            <span>{{totalData.total_sales}}</span>
          </div>
          <div>
            <p>品类总销量</p>
            <span>{{totalData.total_sold}}</span>
          </div>
          <div>
            <p>品类客单价</p>
            <span>{{totalData.avg_price}}</span>
          </div>
          <div>
            <p>品类转化率</p>
            <!-- <span>{{Number(totalData.con_rate*100).toFixed(1)}}%</span> -->
            <span>{{totalData.avg_con_rate}}</span>
          </div>
          <div>
            <p>品类GPM</p>
            <span>{{totalData.avg_gpm}}</span>
          </div>
        </div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="goodsName"
          width="300"
          label="商品名称">
        </el-table-column>
             <!-- <el-table-column
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
        </el-table-column> -->
        <el-table-column
          prop="source"
          align="center"
          label="带货平台">
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          width="150px"
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
      anchor_name:'',
        totalData:{
       total_sales:'13亿',
       total_sold: '2133',
       avg_price:'344',
       con_rate: '0.3',
       gpm: '355',
      },
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
        .get("http://43.254.55.231:8080/api/index/goods_list", {
          params: {
            goodsType: this.$route.query.goodsType,
             anchorId: this.$route.query.id,
             type: this.$route.query.name,
            current_page: this.pageSize,
            page_size: this.pageNum,
            type: this.activeName,
            sort_field: this.tabPosition,
          },
        })
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
       this.totalData = res.data.data
          this.goodsName = this.$route.query.goodsType
            this.tableData = res.data.data.list.list;
            this.total = res.data.data.list.total;
            this.anchor_name = res.data.data.anchor_name
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
    margin-bottom: 50px;
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
   .totalCon {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
     background-color: #323448;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
        padding: 8px 20px;
      > div {
        padding: 5px 20px;
        text-align: center;
        color: #6f717e;
        font-size: 12px;
        line-height: 28px;
        p {
          
        }
        span {
          color: #fff;
        }
      }
    }
}
</style>