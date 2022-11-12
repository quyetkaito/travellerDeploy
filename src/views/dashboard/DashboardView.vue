<template>
<div class="dashboard-view">
    <div class="chart-row w-full">
        <div class="chart-card">
            <BarChart :chartData="categoryData" :height="200"/>
            <div class="chart-description">Biểu đồ thống kê danh mục phổ biến hiện tại
            </div>
        </div>
    </div>
    <div class="w-full flex chart-row">    
        <div class="chart-card w-2/3">
            <LineChart :chartData="postData" :height="300" />
        </div>
        <div class="chart-card w-1/3">
            <PieChart :chartData="testData" :height="300" />
        </div>
    </div>
    <div class="chart-row">
        <div class="chart-card w-1/3">
            <DoughnutChart :chartData="testData" />
        </div>
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import { DoughnutChart, BarChart, LineChart, PieChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import CategoryAPI from "@/api/CategoryAPI"
import PostAPI from "@/api/PostAPI"
const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
Chart.register(...registerables);

export default defineComponent({
  name: 'DashboardView',
  /* eslint-disable */
  components: { DoughnutChart , BarChart, LineChart, PieChart},
  data() {
    return {
        categoryData: [],
        postData: [],
    }
  },
  setup() {
    const testData = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          label: "Biểu đồ test",
          data: [30, 40, 60, 70, 150],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };

    return { testData };
  },
  mounted(){
    this.getData();
  },
  methods:{
    async getData(){
        await this.getDataCategory();
        await this.getDataPost();
    },

    async getDataPost(fromDate, toDate){
        try {            
            if(!fromDate) fromDate = "2022-01-01";
            if(!toDate) toDate = '2022-12-31'
            let res = await PostAPI.request(PostAPI.urlName+`/get_data_chart?from_date=${fromDate}&to_date=${toDate}`, 'GET');
            if(res && res.data){
                debugger
                if(res.data.length > 0){
                    let t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12;
                    t1=t2=t3=t4=t5=t6=t7=t8=t9=t10=t11=t12 = 0;
                    res.data.forEach(element => {
                         if(element.posted_date){
                            switch (new Date(element.posted_date).getMonth()+1) {
                                case 1:
                                    t1++;
                                    break;
                                case 2:
                                    t2++;
                                    break;
                                    case 3:
                                    t3++;
                                    break;
                                    case 4:
                                    t4++;
                                    break;
                                    case 5:
                                    t5++;
                                    break;
                                    case 6:
                                    t6++;
                                    break;
                                    case 7:
                                    t7++;
                                    break;
                                    case 8:
                                    t8++;
                                    break;
                                    case 9:
                                    t9++;
                                    break;
                                    case 10:
                                    t10++;
                                    break;
                                    case 11:
                                    t11++;
                                    break;
                                    case 12:
                                    t12++;
                                    break;
                                default:
                                    break;
                            }
                         }                          
                    });                                        
                    this.postData = {                   
                        labels: [1,2,3,4,5,6,7,8,9,10,11,12], //theo tháng
                        datasets:[{
                            label: 'Dữ liệu bài viết được đăng theo tháng',
                            data: [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12]                        
                        }                        
                        ],
                        options: {
                            maintainAspectRatio: false,
                            scales: {x: { title: { display: true, text: 'seconds' }}}
                        }

                    }
                    debugger
                }
            }
        } catch (error) {
            console.error(error);
        }
    },

     async getDataCategory(){
        try {
            let res = await CategoryAPI.request(CategoryAPI.urlName+"/common_category", 'GET');
            if(res && res.data){
                this.categoryData = {
                    labels: res.data.map(x=>x.category_name),
                    datasets:[{
                        label: 'Dữ liệu danh mục được sử dụng',
                        data: res.data.map(x=>x.amount),
                        backgroundColor: [...Array(res.data.length)].map(x=>randomRGB())
                    }                        
                    ],
                    // options: {
                    //     maintainAspectRatio: false,
                    // }
                }
            }
        } catch (error) {
            console.error(error);
        }
     }
  }
});
</script>
<style lang="scss" scoped>
.dashboard-view{
    .chart-row{
        // height: 200px;
    }
    .chart-card{
        padding: 10px;
         @apply shadow-sm;
        border-radius: 5px;
        background-color: #ffffff;
        border: 2px solid #C7BFB7;    
        margin: 10px;          
        
        .chart-description{
            display: flex;
            align-items: center;
            justify-content: center;
            font-style: italic;
        }
    }
    
}
</style>