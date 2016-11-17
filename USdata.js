function KTest()
{
    var ln = data.length;
    console.log(data);
    var maxy = d3.max(data, function(d){ return d.SOLD; });
    var miny = d3.min(data, function(d){ return d.BUY; });
    var lines = d3.line().x(function(d,i){return (ln-i)*(width/ln);}).y(function(d){return height-(d.SOLD-miny)*(height/(maxy-miny))});
    var lines2 = d3.line().x(function(d,i){return (ln-i)*(width/ln);}).y(function(d){return height-(d.BUY-miny)*(height/(maxy-miny))});
    ctrl.append("path").data([data]).attr("d", lines).attr("stroke", "red").attr("fill", "none");
    ctrl.append("path").data([data]).attr("d", lines2).attr("stroke", "blue").attr("fill", "none");

}