// Dataset mock
var dataset = [
  {label: "Abulia", count: 10},
  {label: "Betelguese", count: 20},
  {label: "Cantaloupe", count: 30},
  {label: "Dijkstra", count: 40},
];

// Dimensions of the chart
var width = 360;
var height = 360;
var radius = Math.min(width, height)*0.5;

// Color scale
// var color = d3.scale.category20b();

// Custom color scale
var color = d3.scale.ordinal()
  .range(["#808BFF", "#6995E8", "#73C9FF", "#8069E8", "#B373FF"]);

// Create SVG and g elements
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + (width*0.5) + "," + (height*0.5) + ")");

// Set the arc's radius
var arc = d3.svg.arc()
  .outerRadius(radius)
  .innerRadius(radius - 40);

// Pie layout
var pie = d3.layout.pie()
  .value(function(d) {
    return d.count;
  })
  .sort(null)
  .startAngle(1.1*Math.PI)
  .endAngle(3.1*Math.PI)
  .padAngle(0.01);

// Creating the chart
var chart = svg.selectAll("path")
  .data(pie(dataset))
  .enter()
  .append("path")
  .attr("d", arc)
  .attr("fill", function(d, i) {
    return color(d.data.label);
  })
  .transition()
    .duration(1000)
    .attrTween("d", tweenPie)
    .ease();


function tweenPie(b) {
  var i = d3.interpolate({startAngle: 1.1*Math.PI, endAngle: 1.1*Math.PI}, b);
  return function(t) { return arc(i(t)); };
}


// Text
  svg.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return "Awesome donut"; });



