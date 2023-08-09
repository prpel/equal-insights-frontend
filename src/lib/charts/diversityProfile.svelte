<script lang="ts">
    import { quantize, interpolatePlasma, pie, arc } from 'd3';
    export let data;
    
    const width = 670 // the outer width of the chart, in pixels
    const height = width // the outer height of the chart, in pixels
    const percent = true // format values as percentages (true/false)
    const fontSize = 26; // the font size of the x and y values
    const strokeWidth = 4; // the width of stroke separating wedges
    const strokeLinejoin = 'round'; // line join style of stroke separating wedges
    const outerRadius = Math.min(width, height) * 0.5 - 60; // the outer radius of the circle, in pixels
    const innerRadius = 153; // the inner radius of the chart, in pixels
    const labelPosition = 0.3; // the position of the label offset from center
    const labelRadius = (innerRadius * labelPosition + outerRadius * 0.6); // center radius of labels
    const strokeColorWOR = 'white'; //stroke color when inner radius is greater than 0
    const strokeColorWIR = 'none'; //stroke color when inner radius is 0
    const stroke = innerRadius > 0 ? strokeColorWIR : strokeColorWOR; // stroke separating widths
    const padAngle = stroke === 'none' ? 1 / outerRadius : 0; // angular separation between wedges
  
    const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
    const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
    const xVals = data.map((el: any) => el[x]);
    let yVals = data.map((el: any) => Number(el[y]));
    if (percent) {
      const total = yVals.reduce((a: any, b: any) => a + b, 0);
      yVals = yVals.map((el: any) => el / total);
    }
    const iVals = data.map((el: any, i: any) => i);
  
    // colors can be adjusted manually by creating a color array which length matches length of data set.
    let colors: any;
    if (!colors) colors = quantize((t: any) => interpolatePlasma(t * 0.7 + 0.3), xVals.length);
  
    const wedges = pie().
      padAngle(padAngle).
      sort(null).
      value((i: any) => yVals[i])(iVals);
  
    const arcPath = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
  
    const arcLabel = arc()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);
</script>
    
<svg {width} {height} viewBox="{-width / 2} {-height / 2} {width} {height}">
{#each wedges as wedge, i}
    <path fill={colors[i]} d={arcPath(wedge)} stroke={stroke} stroke-width={strokeWidth} stroke-linejoin={strokeLinejoin} />
    <g text-anchor='middle' transform='translate({arcLabel.centroid(wedge)})'>
    <text font-size={fontSize}>
        <tspan font-weight='bold'>{xVals[i]}</tspan>
        <tspan x = '0' dy='1.1em'>{percent ? `${(yVals[i] * 100).toFixed(2)}%` : yVals[i].toLocaleString('en-US')}</tspan>
    </text>
    </g>
{/each}
</svg>
      