<script>
    /**
   * Represents a diversity category and its percentage.
   * @typedef {Object} DiversityCategory
   * @property {string} category - The name of the diversity category.
   * @property {number} percent - The percentage of the category.
   */

    import { onMount } from "svelte";
    // @ts-ignore
    import * as am5 from "@amcharts/amcharts5?client";
    // @ts-ignore
    import am5themes_Animated from "@amcharts/amcharts5/themes/Animated?client";
    // @ts-ignore
    import * as am5percent from "@amcharts/amcharts5/percent?client";

    /** @type {any} */
    let chartdiv;
    /** @type {DiversityCategory[]} */
    export let data;

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

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout,
          innerRadius: am5.percent(50)
        })
      );

      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Diversity Profile",
          categoryField: "category",
          valueField: "percent",
          alignLabels: false
        })
      );

      series.data.setAll(data);
      series.labels.template.setAll({
        textType: "circular",
        radius: 20,
      });

      series.slices.template.setAll({
        cornerRadius: 5
      });

      series.ticks.template.setAll({
        forceHidden: true
      });

      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 5,
        marginBottom: 0,
      }));
      legend.data.setAll(series.dataItems);

      return () => {
        root.dispose();
      };
    });
</script>

<div class="w-full h-[650px]" bind:this={chartdiv}></div>
