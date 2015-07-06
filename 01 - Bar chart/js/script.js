var barData = [];

for (var i=0; i<20; i++) {
  barData.push(Math.round(Math.random()*30)+5);
}

var height = 400;
var width = 600;
var barOffset = 5;
var padding = 0.2;

var tempColor;

var colors = d3.scale.linear()
            .domain([0, d3.max(barData)])
            .range(["#FFB832", "#C61C6F"]);

var yScale = d3.scale.linear()
            .domain([0, d3.max(barData)])
            .range([0, height]);

var xScale = d3.scale.ordinal()
            .domain(d3.range(0, barData.length))
            .rangeBands([0, width], [padding]);

var myChart = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .selectAll("rect").data(barData)
    .enter().append("rect")
      .style("fill", colors)
      .attr("width", xScale.rangeBand())
      .attr("x", function(d, i) {
        return xScale(i);
      })
      .attr("height", 0)
      .attr("y", height);


// Animations

  myChart.transition()
    .attr("height", function(d) {
      return yScale(d);
    })
    .attr("y", function(d) {
      return height - yScale(d);
    })
    .delay(function(d, i) {
      return i * 10;
    })
    .duration(1000)
    .ease();



