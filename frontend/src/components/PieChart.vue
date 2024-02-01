  <script>
  import { Pie } from 'vue-chartjs';
  
  export default {
    extends: Pie,
    props: {
      chartData: {
        type: Object,
        required: true
      },
      chartOptions: {
        type: Object,
        default: () => {}
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.chartOptions)
    }
  }
  </script>