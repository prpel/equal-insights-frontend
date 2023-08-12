<script>
    /**
     * Represents employment data for a specific grade category.
     * @typedef {Object} GradeEmploymentData
     * @property {string} category - The employment grade category (e.g., "2", "3/4", "Senior", etc.).
     * @property {number} partTimeWomen - Employment count for part-time women in the grade.
     * @property {number} partTimeMen - Employment count for part-time men in the grade.
     * @property {number} fullTimeWomen - Employment count for full-time women in the grade.
     * @property {number} [fullTimeMen] - Employment count for full-time men in the grade (optional, as it's not present in all categories).
     */

    import { onMount } from "svelte";
    // @ts-ignore
    import * as am5 from "@amcharts/amcharts5?client";
    // @ts-ignore
    import am5themes_Animated from "@amcharts/amcharts5/themes/Animated?client";
    // @ts-ignore
    import * as am5xy from "@amcharts/amcharts5/xy?client";

    /** @type {any} */
    let chartdiv;
    /** @type {GradeEmploymentData[]} */
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
        theme.rule("Label").set("fontSize", "0.8em");
        
        root.setThemes([theme]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        // wheelX: "panX",
        // wheelY: "zoomX",
        layout: root.verticalLayout
    }));

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set("scrollbarX", am5.Scrollbar.new(root, {
    //     orientation: "horizontal"
    // }));

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {});
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    xRenderer.grid.template.setAll({
        location: 1
    })

    xAxis.data.setAll(data.filter(d => d.category !== "All staff"));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })
    }));


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
    }));


    // Add series
    /**
     * Creates a series based on the provided name and field name.
     * 
     * @function
     * @param {string} name - The name of the series.
     * @param {string} fieldName - The name of the field.
     * @returns {void} // Assuming the function doesn't return anything. If it does, replace `void` with the appropriate type.
     */
    function makeSeries(name, fieldName) {
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "category"
        }));

        series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}: {valueY}",
            tooltipY: am5.percent(10)
        });
        series.data.setAll(data.filter(d => d.category !== "All staff"));

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function() {
            return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
                text: "{valueY}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: am5.p50,
                centerX: am5.p50,
                populateText: true
            })
            });
        });

        legend.data.push(series);
    }

    makeSeries("Part Time Women", "partTimeWomen");
    makeSeries("Part Time Men", "partTimeMen");
    makeSeries("Full Time Women", "fullTimeWomen");
    makeSeries("Full Time Men", "fullTimeMen");

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

        chart.appear();

        return () => {
            root.dispose();
        };
    });
</script>

<div class="w-2/3 mx-auto h-[500px]" bind:this={chartdiv}></div>
