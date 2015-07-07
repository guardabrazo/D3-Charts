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

// Draw the x grid
g.selectAll(".xGrid")
  .data(xScale.ticks(5))
  .enter().append("line")
  .attr("class", "xGrid")
  .attr("x1", function(d) {
    return xScale(d);
  })
  .attr("y1", -yScale(yLowLim))
  .attr("x2", function(d) {
    return xScale(d);
  })
  .attr("y2", -yScale(yUpLim)-10);

// Draw the y grid
g.selectAll(".yGrid")
  .data(yScale.ticks(5))
  .enter().append("line")
  .attr("class", "yGrid")
  .attr("x1", xScale(xLowLim))
  .attr("y1", function(d) {
    return -yScale(d);
  })
  .attr("x2", xScale(xUpLim)+20)
  .attr("y2", function(d) {
    return -yScale(d);
  });
//Draw the x axis
g.append("line")
  .attr("x1", xScale(xLowLim))
  .attr("y1", -yScale(yLowLim))
  .attr("x2", 1.2*xScale(xUpLim))
  .attr("y2", -yScale(yLowLim));

//Draw the y axis
g.append("svg:line")
  .attr("x1", xScale(xLowLim))
  .attr("y1", -yScale(yLowLim))
  .attr("x2", xScale(xLowLim))
  .attr("y2", -1.2*yScale(yUpLim)-20);


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

// Draw the x ticks
g.selectAll(".xTicks")
  .data(xScale.ticks(5))
  .enter().append("line")
  .attr("class", "xTicks")
  .attr("x1", function(d) {
  return xScale(d); 
  })
  .attr("y1", -yScale(yLowLim))
  .attr("x2", function(d) { 
  return xScale(d); 
  })
  .attr("y2", -yScale(yLowLim)-5);    

// Draw the y ticks
g.selectAll(".yTicks")
  .data(yScale.ticks(5))
  .enter().append("line")
  .attr("class", "yTicks")
  .attr("x1", xScale(xLowLim))
  .attr("y1", function(d) {
    return -yScale(d);
  })
  .attr("x2", xScale(xLowLim)+5)
  .attr("y2", function(d) {
    return -yScale(d);
  });

//Draw the line
var line = d3.svg.line()
  .x(function(d) { return xScale(d.x); })
  .y(function(d) { return -yScale(d.y); });

var path = g.append("path")
  .attr("d", line(data));

var totalLength = path.node().getTotalLength();

  path.attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .duration(1000)
      .ease("cubic-in-out")
      .attr("stroke-dashoffset", 0);

svg.selectAll(".dot")
  .data(data)
  .enter().append("circle")
  .attr("opacity", 0)
  // .transition().delay(1000).duration(500)
  .attr("opacity", 1)
  .attr("class", "dot")
  .attr("r", 3.5)
  .attr("cx", function(d) {
    return xScale(d.x);
  })
  .attr("cy", height - marginY)
  .transition().duration(1000)
  .attr("cx", function(d) {
    return xScale(d.x);
  })
  .attr("cy", function(d) {
    return height - yScale(d.y);
  });


