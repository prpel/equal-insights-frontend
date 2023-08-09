<script lang="ts">
  import { Chart } from 'chart.js/auto';

  import { onMount } from 'svelte';

  const DATA_COUNT = 5;
  const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

  const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true
    }
  };

  onMount(()  => {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    new Chart(ctx, config);
  });
</script>
<div>
<canvas id="chart"></canvas>
</div>