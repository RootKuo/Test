function KTest()
{
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var parseTime = d3.timeParse("%d-%b-%y");
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select(".content").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
d3.csv("https://rootkuo.github.io/Test/USDATA.csv", function(error, data) {
  if (error) throw error;
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
  }); 
    var ln = data.length;
    console.log(data);
    var maxy = d3.max(data, function(d){ return d.SOLD; });
    var miny = d3.min(data, function(d){ return d.BUY; });
    var lines = d3.line().x(function(d,i){return (ln-i)*(width/ln);}).y(function(d){return height-(d.SOLD-miny)*(height/(maxy-miny))});
    var lines2 = d3.line().x(function(d,i){return (ln-i)*(width/ln);}).y(function(d){return height-(d.BUY-miny)*(height/(maxy-miny))});
    ctrl.append("path").data([data]).attr("d", lines).attr("stroke", "red").attr("fill", "none");
    ctrl.append("path").data([data]).attr("d", lines2).attr("stroke", "blue").attr("fill", "none");
});
}