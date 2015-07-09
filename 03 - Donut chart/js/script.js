// Dataset mock
var dataset = [
  {label: "Abulia", count: 10},
  {label: "Betelguese", count: 20},
  {label: "Cantaloupe", count: 30},
  {label: "Dijkstra", count: 40},
];

// Dimensions of the chart
var width = 500;
var height = 500;
var radius = Math.min(width, height)*0.5;

// Color scale
// var color = d3.scale.category20b();

// Custom color scale
var color = d3.scale.ordinal()
  .range(["#808BFF", "#6995E8", "#73C9FF", "#8069E8", "#B373FF"]);

var tempColor;

// Tooltip
var tooltip = d3.select("body").append("div")
            .style("position", "absolute")
            .style("padding", "0, 10px")
            .style("background", "white")
            .style("opacity", 0);



// Create SVG and g elements
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", "25%")
  .attr("height", "25%")

  // Making it responsive
  .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
  .attr('preserveAspectRatio','xMinYMin')

  .append("g")
  .attr("transform", "translate(" + (width*0.5) + "," + (height*0.5) + ")");


// Text
var text = svg.append("text")
  .attr("class", "text")
  .attr("dy", ".35em")
  .style("text-anchor", "middle")
  .text("");

// Set the arc's radius
var arc = d3.svg.arc()
  .outerRadius(radius)
  .innerRadius(radius*0.7);

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

  // Events 

  .on("mouseover", function(d) {

    tooltip.transition()
      .style("opacity", 0.9);

    text.text(d.value + "%");

    tempColor = this.style.fill;
    d3.select(this)
      .style("opacity", 0.5)
      .style("fill", "yellow");
  })

  .on("mouseout", function(d) {
    d3.select(this)
      .style("opacity", 1)
      .style("fill", tempColor);

    tooltip.transition()
      .style("opacity", 0);

    text.text("");
  })

// Animation
  .transition()
    .duration(1000)
    .attrTween("d", tweenPie)
    .ease();




function tweenPie(b) {
  var i = d3.interpolate({startAngle: 1.1*Math.PI, endAngle: 1.1*Math.PI}, b);
  return function(t) { return arc(i(t)); };
}












