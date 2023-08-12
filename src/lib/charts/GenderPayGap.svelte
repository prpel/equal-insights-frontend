<script>
    /**
   * Represents a diversity category and its percentage.
   * @typedef {Object} PayGap
   * @property {number} median - The median gross hourly pay gap
   * @property {number} mean - The mean gross hourly pay gap
   */

/* Imports */
import { onMount } from "svelte";
// @ts-ignore
import * as am5 from "@amcharts/amcharts5?client";
// @ts-ignore
import * as am5radar from "@amcharts/amcharts5/radar?client";
// @ts-ignore
import * as am5xy from "@amcharts/amcharts5/xy?client";
// @ts-ignore
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated?client";

/** @type {PayGap} */
  export let data;

/** @type {any} */
  let chartdiv;

/* Chart code */
onMount(() => {
  let root = am5.Root.new(chartdiv);
  let theme = am5themes_Animated.new(root);
  theme.rule("ColorSet").set("colors", [
            am5.color("#f47e20"),
            am5.color("#4ec2c2"),
            am5.color("#a679e0"),
            am5.color("#e53c7d")
        ]);
  root.setThemes([theme]);

  // Create chart
  let chart = root.container.children.push(am5radar.RadarChart.new(root, {
    panX: false,
    panY: false,
    innerRadius: am5.percent(40),
    startAngle: -180,
    endAngle: 0
  }));
  
  // Data
  let values = [{
    category: "Mean",
    value: (data.mean * 100),
    full: 100,
    columnSettings: {
      fill: chart.get("colors").getIndex(0)
    }
  }, {
    category: "Median",
    value: (data.median * 100),
    full: 100,
    columnSettings: {
      fill: chart.get("colors").getIndex(1)
    }
  }];

  // Add cursor
  let cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {}));

  cursor.lineY.set("visible", false);

  // Create axes and their renderers
  let xRenderer = am5radar.AxisRendererCircular.new(root, {
    //minGridDistance: 50
  });

  xRenderer.labels.template.setAll({
    radius: 0
  });

  xRenderer.grid.template.setAll({
    forceHidden: true
  });

  let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    renderer: xRenderer,
    min: 0,
    max: 25,
    strictMinMax: true,
    numberFormat: "#'%'",
    tooltip: am5.Tooltip.new(root, {})
  }));


  let yRenderer = am5radar.AxisRendererRadial.new(root, {
    minGridDistance: 20
  });

  yRenderer.labels.template.setAll({
    centerX: am5.percent(50),
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
    templateField: "columnSettings",
    textType: "circular",
    radius: 5
  });

  yRenderer.grid.template.setAll({
    forceHidden: true
  });

  let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: yRenderer
  }));

  yAxis.data.setAll(values);


  // Create series
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
  let series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    clustered: false,
    valueXField: "full",
    categoryYField: "category",
    fill: root.interfaceColors.get("alternativeBackground")
  }));

  series1.columns.template.setAll({
    width: am5.p100,
    fillOpacity: 0.04,
    strokeOpacity: 0,
    cornerRadius: 20
  });

  series1.data.setAll(values);

  let series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    clustered: false,
    valueXField: "value",
    categoryYField: "category"
  }));

  series2.columns.template.setAll({
    width: am5.p100,
    strokeOpacity: 0,
    tooltipText: "{category}: {valueX}%",
    cornerRadius: 20,
    templateField: "columnSettings"
  });

  series2.data.setAll(values);

  // Animate chart and series in
  // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
  series1.appear(1000);
  series2.appear(1000);
  chart.appear(1000, 100);
  });
</script>

<div class="w-full h-[500px]" bind:this={chartdiv}></div>