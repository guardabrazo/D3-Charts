var data = [{x: 0, y: 100}, {x: 10, y: 110}, {x: 20, y: 140},
            {x: 30, y: 130}, {x: 40, y: 80}, {x: 50, y: 75},
            {x: 60, y: 120}, {x: 70, y: 130}, {x: 80, y: 100}];


var ax = [];
var ay = [];

data.forEach(function(d,i){
  ax[i] = d.x;
  ay[i] = d.y;
});

var xMax = d3.max(ax);
var yMax = d3.max(ay);   

var xLowLim = 0;
var xUpLim = d3.max(ax);

var yUpLim = 1.2 * d3.max(ay);
var yLowLim = 0.8 * d3.min(ay);         

width = 400;
height = 300;
marginX = 32;
marginY = 20;

xScale = d3.scale.linear()
  .domain([xLowLim, xUpLim])
  .range([0 + marginX, width - marginX]);

yScale = d3.scale.linear()
  .domain([yLowLim, yUpLim])
  .range([0 + marginY, height - marginY]);

var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var g = svg.append("g")
  .attr("transform", "translate(0," + height + ")");

var area = d3.svg.area()
  .x(function(d) {
    return xScale(d.x);
  })
  .y0(height - marginY)
  .y1(function(d) {
    return height - yScale(d.y);
  });
  
var initialArea = d3.svg.area()
  .x(function(d) {
    return xScale(d.x);
  })
  .y0(height - marginY)
  .y1(height - marginY);

var area = svg.append("g").append("path")
  .data([data]) //.datum(data)
  .attr("class", "area")
  .attr("d", initialArea)
  .transition().duration(1000).ease("cubic-in-out")
    .attr("d", area);

//draw the xLabels
g.selectAll(".xLabel")
  .data(xScale.ticks(5))
  .enter().append("text")
  .attr("class", "xLabel")
  .text(String)
  .attr("x", function(d) {
    return xScale(d);
  })
  .attr("y", 0)
  .attr("text-anchor", "middle");

// Draw the yLabels
g.selectAll(".yLabel")
  .data(yScale.ticks(5))
  .enter().append("text")
  .attr("class", "yLabel")
  .text(String)
  .attr("x", 25)
  .attr("y", function(d) {
  return -yScale(d);
  })
  .attr("text-anchor", "end");


