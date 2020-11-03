 <template>
  <div>
    <headerTop />
    <div class="details">
      <el-row :gutter="20" class="lineOne">
        <el-col :span="6">
          <div class="hostCon">
            <p class="host" style="text-align: left">淘宝主播名称</p>
            <p class="nam">{{ anchor_detail.name }}</p>
            <!-- <p class="hostid">id:{{hostId}}</p> -->
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <ul class="topNum">
              <li>
                <p>客单价</p>
                <p class="num">{{ anchor_detail.avgCustomerPrice }}</p>
              </li>
              <li>
                <p>总销售额</p>
                <p class="num">{{ anchor_detail.totalSales }}</p>
              </li>
              <li>
                <p>总销量</p>
                <p class="num">{{ anchor_detail.totalSold }}</p>
              </li>
            </ul>
            <ul class="bottomNum">
              <li>
                <p>直播次数</p>
                <p class="num">{{ anchor_detail.numLives }}</p>
              </li>
              <li>
                <p>场均同时最高在线</p>
                <p class="num">{{ anchor_detail.avgLiveOnlineViews }}</p>
              </li>
              <li>
                <p>场均观看次数</p>
                <p class="num">{{ anchor_detail.avgLiveViews }}</p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div id="J_chartLineBox" class="chart-box"></div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="lineTwo">
        <el-col :span="8">
          <div id="J_chartLineBox1" class="chart-box"></div>
        </el-col>
        <el-col :span="8">
          <div id="J_chartLineBox2" class="chart-box"></div>
        </el-col>
        <el-col :span="8">
          <div id="J_chartLineBox3" class="chart-box"></div>
        </el-col>
      </el-row>
      <div class="lineThree">
        <div class="btnCon">
          <div class="option">
            <el-select
              v-model="value"
              placeholder="品类筛选"
              @change="goodChang"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <el-tabs v-model="tabPosition" @tab-click="handleClickRight">
           <el-tab-pane label="按品类单价" name="avgCustomerPrice"></el-tab-pane>
          <el-tab-pane label="按品类销售额" name="totalSales"></el-tab-pane>
          <el-tab-pane label="按品类销量" name="totalSold"></el-tab-pane>
          <el-tab-pane label="按转化率" name="conRate"></el-tab-pane>
          <el-tab-pane label="按GPM" name="gpm"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="listBtn" style="margin-bottom: 60px">
          <p style="color: #fff">主播带货品类</p>
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
            <span>{{totalData.con_rate}}</span>
          </div>
          <div>
            <p>品类GPM</p>
            <span>{{totalData.gpm}}</span>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%">
         <el-table-column
          prop="goodsType"
          label="品类">
        </el-table-column>
        <el-table-column
          prop="total_sales"
          align="center"
          show-overflow-tooltip
          label="品类销售额（元）">
        </el-table-column>
        <el-table-column
          prop="total_sold"
          align="center"
          label="品类销量（件）">
        </el-table-column>
        <el-table-column
          prop="avg_price"
          align="center"
          width="150px"
          label="品类单价（元/件）">
        </el-table-column>
        <el-table-column
          prop="avg_rate"
          align="center"
          label="转化率">
        </el-table-column>
        <el-table-column
          prop="avg_pm"
          align="center"
          label="GPM">
        </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import headerTop from "../../components/header";
import cookie from "js-cookie";
import axios from "axios";
export default {
  components: {
    headerTop,
  },
  data() {
    return {
      allData: null,
      totalData:{
       total_sales:'13亿',
       total_sold: '2133',
       avg_price:'344',
       con_rate: '0.3',
       gpm: '355',
      },
      anchor_detail: {
        name: "",
        avgCustomerPrice: "",
        totalSales: "",
        totalSold: "",
        numLives: "",
        avgLiveOnlineViews: "",
        avgLiveViews: "",
      },
      value: "",
      options: [],
      hostName: "韩饭饭（中午12点30直播）",
      hostId: "12345",
      chartLine: null,
      chartLine1: null,
      chartLine2: null,
      chartLine3: null,

      tabPosition: "conRate",
      tableData: [
        // {
        //   name: "网红方便面网红方便面网红方便面",
        //   zhubo: "王小虎",
        //   ptai: "淘宝",
        //   date: "2016-05-02",
        //   price: "2093",
        //   xiaoliang: "10000",
        //   danjia: "18.69",
        //   zhuanhua: "1.9872%",
        //   GPM: "19.56",
        // },
        // {
        //   name: "网红方便面网红方便面网红方便面",
        //   zhubo: "王小虎",
        //   ptai: "淘宝",
        //   date: "2016-05-02",
        //   price: "2093",
        //   xiaoliang: "10000",
        //   danjia: "18.69",
        //   zhuanhua: "1.9872%",
        //   GPM: "19.56",
        // },
        // {
        //   name: "网红方便面网红方便面网红方便面",
        //   zhubo: "王小虎",
        //   ptai: "淘宝",
        //   date: "2016-05-02",
        //   price: "2093",
        //   xiaoliang: "10000",
        //   danjia: "18.69",
        //   zhuanhua: "1.9872%",
        //   GPM: "19.56",
        // },
        // {
        //   name: "网红方便面网红方便面网红方便面",
        //   zhubo: "王小虎",
        //   ptai: "淘宝",
        //   date: "2016-05-02",
        //   price: "2093",
        //   xiaoliang: "10000",
        //   danjia: "18.69",
        //   zhuanhua: "1.9872%",
        //   GPM: "19.56",
        // },
      ],
    };
  },
  watch: {},
  mounted() {
    this.goodTypeFun();
    this.getTbDetails(this.value, this.tabPosition);
    setTimeout(() => {
      this.initChartLine();
      this.initChartLine1();
      this.initChartLine2();
      this.initChartLine3();
    }, 1000);
  },
  activated() {
    if (this.chartLine) {
      this.chartLine.resize();
    }
    if (this.chartLine1) {
      this.chartLine1.resize();
    }
    if (this.chartLine2) {
      this.chartLine2.resize();
    }
    if (this.chartLine3) {
      this.chartLine3.resize();
    }
  },
  computed: {},
  created() {},
  methods: {
    goodTypeFun() {
      console.log(this.$route.query.name)
      axios
        .get("http://43.254.55.231:8080/api/index/goods_type_list", {
          params: {
anchorId: this.$route.query.id,
type: this.$route.query.name,
          },
        })
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            this.options = res.data.data;
          }
        });
    },
    //获取详情
    getTbDetails(value, tabPosition) {
      axios
        .get("http://43.254.55.231:8080/api/tb/detail", {
          params: {
            anchorId: this.$route.query.id,
            sort_field: this.tabPosition,
            goodsType: this.value,
            page_size: 500,
          },
        })
        .then((res) => {
          this.totalData = res.data.data.type_total;
          if (res.data.code && res.data.code == 200) {
            this.allData = res.data.data;
            this.anchor_detail = res.data.data.anchor_detail;
            this.tableData = res.data.data.list.list;
            this.total = res.data.list.total;
          }
        })
        .catch((e) => {
          console.log("获取数据失败");
        });
    },
    goodChang(v) {
      this.getTbDetails(v, this.tabPosition);
    },
    //右边切换
    handleClickRight(tab) {
      this.tabPosition = tab.name;
      this.getTbDetails(this.value, this.tabPosition);
    },
    initChartLine1() {
      const data = this.allData.customer_price;
      let dataNum = [];
      data.forEach((item) => {
        dataNum.push(item.value);
      });
      let dataDate = [];
      data.forEach((item) => {
        dataDate.push(item.date);
      });
      let option = {
        title: {
          text: "单场直播客单价变化",
          textStyle: {
            fontSize: 16,
            color: "#fff",
          },
        },
        tooltip: {
          formatter(params) {
            let result = "";
            params.forEach((item) => {
              result += item.axisValue + "</br>" + item.data;
            });
            return result;
          },
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "0",
          bottom: "0",
          right: "18",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            textStyle: {
              // fontSize: "6",
            },
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
          boundaryGap: false,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
          data: dataDate,
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#9A9FAC",
            },
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        series: [
          {
            data: dataNum,
            type: "line",
            // smooth: true, //曲线平滑
            symbol: "none", //去掉小圆点
            itemStyle: {
              normal: {
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [
                      {
                        offset: 0,
                        color: "#409eff",
                      },
                      {
                        offset: 0.5,
                        color: "#409eff",
                      },
                      {
                        offset: 1,
                        color: "transparent",
                      },
                    ]
                  ),
                },
                lineStyle: {
                  color: "#3F96FF",
                },
              },
            },
          },
        ],
      };
      this.chartLine1 = echarts.init(
        document.getElementById("J_chartLineBox1")
      );
      this.chartLine1.setOption(option);
      window.addEventListener("resize", () => {
        this.chartLine1.resize();
      });
    },
    initChartLine2() {
      const data = this.allData.live_sold;
      let dataNum = [];
      data.forEach((item) => {
        dataNum.push(item.value);
      });
      let dataDate = [];
      data.forEach((item) => {
        dataDate.push(item.date);
      });
      let option = {
        title: {
          text: "单场直播销量变化",
          left: "center",
          textStyle: {
            fontSize: 16,
            color: "#fff",
          },
        },
        tooltip: {
          formatter(params) {
            let result = "";
            params.forEach((item) => {
              result += item.axisValue + "</br>" + item.data;
            });
            return result;
          },
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "0",
          bottom: "0",
          right: "0",
          containLabel: true,
        },
        xAxis: {
          axisTick: {
            show: false, //不显示坐标轴线
          },
          type: "category",
          axisLabel: {
            interval: 0,
            textStyle: {
              // fontSize: "6",
            },
          },
          splitLine: {
            show: false,
          },
          boundaryGap: true,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
          data: dataDate,
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#9A9FAC",
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        series: [
          {
            data: dataNum,
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, //变化度
                  //三种由深及浅的颜色
                  [
                    {
                      offset: 0,
                      color: "#409eff",
                    },
                    {
                      offset: 0.5,
                      color: "#409eff",
                    },
                    {
                      offset: 1,
                      color: "transparent",
                    },
                  ]
                ),

                lineStyle: {
                  color: "#3F96FF",
                },
              },
            },
          },
        ],
      };
      this.chartLine2 = echarts.init(
        document.getElementById("J_chartLineBox2")
      );
      this.chartLine2.setOption(option);
      window.addEventListener("resize", () => {
        this.chartLine2.resize();
      });
    },
    initChartLine3() {
      const data = this.allData.live_online_views;
      let dataNum = [];
      data.forEach((item) => {
        dataNum.push(item.value);
      });
      let dataDate = [];
      data.forEach((item) => {
        dataDate.push(item.date);
      });
      let option = {
        title: {
          text: "单场直播同时最高在线人数变化",
          textStyle: {
            fontSize: 16,
            color: "#fff",
          },
        },
        tooltip: {
          formatter(params) {
            let result = "";
            params.forEach((item) => {
              result += item.axisValue + "</br>" + item.data;
            });
            return result;
          },
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "0",
          bottom: "0",
          right: "18",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            textStyle: {
              // fontSize: "6",
            },
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
          boundaryGap: false,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
          data: dataDate,
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#9A9FAC",
            },
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        series: [
          {
            data: dataNum,
            type: "line",
            // smooth: true, //曲线平滑
            symbol: "none", //去掉小圆点
            itemStyle: {
              normal: {
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [
                      {
                        offset: 0,
                        color: "#409eff",
                      },
                      {
                        offset: 0.5,
                        color: "#409eff",
                      },
                      {
                        offset: 1,
                        color: "transparent",
                      },
                    ]
                  ),
                },
                lineStyle: {
                  color: "#3F96FF",
                },
              },
            },
          },
        ],
      };
      this.chartLine3 = echarts.init(
        document.getElementById("J_chartLineBox3")
      );
      this.chartLine3.setOption(option);
      window.addEventListener("resize", () => {
        this.chartLine3.resize();
      });
    },
    initChartLine() {
      const data = this.allData.live_views;
      let dataNum = [];
      data.forEach((item) => {
        dataNum.push(item.value);
      });
      let dataDate = [];
      data.forEach((item) => {
        dataDate.push(item.date);
      });
      let option = {
        title: {
          text: "场观看次数",
          textStyle: {
            fontSize: 16,
            color: "#fff",
          },
        },
        tooltip: {
          formatter(params) {
            let result = "";
            params.forEach((item) => {
              result += item.axisValue + "</br>" + item.data;
            });
            return result;
          },
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "0",
          bottom: "0",
          right: "18",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            textStyle: {
              // fontSize: "6",
            },
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
          boundaryGap: false,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
          data: dataDate,
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#9A9FAC",
            },
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        series: [
          {
            data: dataNum,
            type: "line",
            // smooth: true, //曲线平滑
            symbol: "none", //去掉小圆点
            itemStyle: {
              normal: {
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [
                      {
                        offset: 0,
                        color: "#409eff",
                      },
                      {
                        offset: 0.5,
                        color: "#409eff",
                      },
                      {
                        offset: 1,
                        color: "transparent",
                      },
                    ]
                  ),
                },
                lineStyle: {
                  color: "#3F96FF",
                },
              },
            },
          },
        ],
      };
      this.chartLine = echarts.init(document.getElementById("J_chartLineBox"));
      this.chartLine.setOption(option);
      window.addEventListener("resize", () => {
        this.chartLine.resize();
      });
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
.details {
  color: #fff;
  .chart-box {
    min-height: 250px;
    background: #262837;
    padding: 20px;
    border-radius: 10px;
  }
  .lineOne {
    margin-top: 10px;
    padding: 10px;
    .hostCon {
      padding: 20px;
      background: #262837;
      border-radius: 10px;
      text-align: center;
      height: 250px;
      .nam {
        padding: 82px 0 40px;
        font-size: 18px;
      }
      .hostid {
        font-size: 12px;
      }
    }
    .topNum {
      margin-bottom: 14px;
      padding: 20px;
      background: #262837;
      border-radius: 10px;
      line-height: 48px;
      display: flex;
      justify-content: space-around;
      p {
        color: #6f717e;
        text-align: center;
        font-size: 12px;
      }
      .num {
        color: #409eff;
        font-size: 24px;
      }
    }
    .bottomNum {
      padding: 20px;
      background: #262837;
      border-radius: 10px;
      line-height: 30px;
      display: flex;
      justify-content: space-around;
      p {
        color: #6f717e;
        text-align: center;
        font-size: 12px;
      }
      .num {
        color: #fff;
      }
    }
  }
  .lineTwo {
    margin: 0 10px;
    padding: 10px;
  }
  .lineThree {
    position: relative;
    margin: 0 10px;
    padding: 10px;
    background: #262837;
    border-radius: 10px;
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

    .el-tabs__item {
      color: #6f717e;
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
    .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
      width: 0 !important;
    }
  }
}
</style>