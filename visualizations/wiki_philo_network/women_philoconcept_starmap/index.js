function _1(md){return(
    md``
    )}
    
function _map(width,height,d3,path,graticule,outline,xAxis,yAxis,data,radius,projection,voronoi)
{
    const cx = width / 2;
    const cy = height / 2;

    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .style("margin", "0px 0px")
        .style("color", "white")
        .style("background", "radial-gradient(720px at 490px, #041821 50%, black 100%")
        .style("display", "block");

    svg.append("path")
        .attr("d", path(graticule))
        .attr("fill", "none")
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.2);

    svg.append("path")
        .attr("d", path(outline))
        .attr("fill", "none")
        .attr("stroke", "currentColor");

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);
    
// the circle selection
    const focusDeclination = svg.append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("fill", "none")
        .attr("stroke", "rgb(191, 194, 244)");

    const focusRightAscension = svg.append("line")
        .attr("x1", cx)
        .attr("y1", cy)
        .attr("x2", cx)
        .attr("y2", cy)
        .attr("stroke", "rgb(191, 194, 244)");
    
// radius
    svg.append("g")
        .attr("stroke", "rgb(8, 21, 113)")
        .attr("fill", "rgb(255, 224, 23)")
    .selectAll("circle")
    .data(data)
    .join("circle")
        .attr("r", function(d) { return radius(d.concept_count); })
        .attr("transform", d => `translate(${projection(d)})`);

    svg.append("g")
        .attr("pointer-events", "all")
        .attr("fill", "none")
    .selectAll("path")
    .data(data)
    .join("path")
        .on("mouseover", mouseovered)
        .on("mouseout", mouseouted)
        .attr("d", (d, i) => voronoi.renderCell(i)) //-----------------
        // .attr("d",path)
    .append("title")
        .text(function(d) { return d.concept+"\noccurrence: "+d.concept_count+"\nwomen philosopher(s): "+d.authors.toString(); });
        // .text(d.concept);

    function mouseovered(event, d) {
    const [px, py] = projection(d);
    const dx = px - cx;
    const dy = py - cy;
    const a = Math.atan2(dy, dx);
    focusDeclination.attr("r", Math.hypot(dx, dy));
    focusRightAscension.attr("x2", cx + 1e3 * Math.cos(a)).attr("y2", cy + 1e3 * Math.sin(a));
    }

    function mouseouted(event, d) {
    
    focusDeclination.attr("r", null);
    focusRightAscension.attr("x2", cx).attr("y2", cy);
    }

    return svg.node();
}


async function _data(d3,FileAttachment,width,height){return(
d3.csvParse(await FileAttachment("concept_starmap_data.csv").text(), d => {
    d3.autoType(d);
    // the larger the weighted distance, the closer the star is to the center
    d[0] = Math.sin(d.angle)*(d.weighted_distance)*25 + width/2
    d[1] = Math.cos(d.angle)*(d.weighted_distance)*25 + height/2
    return d;
})
)}

function _xAxis(d3,projection){return(
g => g
    .call(g => g.append("g")
        .attr("stroke", "currentColor")
    .selectAll("line")
    .data(d3.range(0, 1440, 5)) // every 5 minutes
    .join("line")
        .datum(d => [
        projection([d / 4, 0]),
        projection([d / 4, d % 60 ? -1 : -2])
        ])
        .attr("x1", ([[x1]]) => x1)
        .attr("x2", ([, [x2]]) => x2)
        .attr("y1", ([[, y1]]) => y1)
        .attr("y2", ([, [, y2]]) => y2))
    .call(g => g.append("g")
    .selectAll("text")
    .data(d3.range(0, 1440, 60)) // every hour
    .join("text")
        .attr("dy", "0.35em")
        .text(d => "")
        .attr("font-size", d => d % 360 ? null : 14)
        .attr("font-weight", d => d % 360 ? null : "bold")
        .datum(d => projection([d / 4, -4]))
        .attr("x", ([x]) => x)
        .attr("y", ([, y]) => y))
)}

function _yAxis(d3,projection){return(
g => g
    .call(g => g.append("g")
    .selectAll("text")
    .data(d3.range(10, 91, 10)) // every 10°
    .join("text")
        .attr("dy", "0.35em")
        .text(d => "")
        .datum(d => projection([0, d]))
        .attr("x", ([x]) => x)
        .attr("y", ([, y]) => y))
)}

function _voronoi(d3,data,projection,width,height){return(
d3.Delaunay.from(data.map(projection)).voronoi([0, 0, width, height])
)}

function _radius(d3){return(
d3.scaleLinear([1, 10], [3, 15])
)}

function _path(d3,projection){return(
d3.geoPath(projection)
)}

function _projection(d3,scale,width,height){return(
d3.geoStereographic()
    .reflectY(true)
    .scale(scale)
    .clipExtent([[0, 0], [width, height]])
    .rotate([0, -90])
    .translate([width / 2, height / 2])
    .precision(0.1)
)}

function _outline(d3){return(
d3.geoCircle().radius(90).center([0, 90])()
)}

function _graticule(d3){return(
d3.geoGraticule().stepMinor([15, 10])()
)}

function _scale(width){return(
(width - 120) * 0.5
)}

function _width(){return(
954 + 28
)}

function _height(width){return(
width
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
    const main = runtime.module();
    function toString() { return this.url; }
    const fileAttachments = new Map([
    ["concept_starmap_data.csv", {url: new URL("concept_starmap_data", import.meta.url), mimeType: "text/csv", toString}]
    ]);
    main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
    main.variable(observer()).define(["md"], _1);
    main.variable(observer("map")).define("map", ["width","height","d3","path","graticule","outline","xAxis","yAxis","data","radius","projection","voronoi"], _map);
    main.variable(observer("data")).define("data", ["d3","FileAttachment","width","height"], _data);
    main.variable(observer("xAxis")).define("xAxis", ["d3","projection"], _xAxis);
    main.variable(observer("yAxis")).define("yAxis", ["d3","projection"], _yAxis);
    main.variable(observer("voronoi")).define("voronoi", ["d3","data","projection","width","height"], _voronoi);
    main.variable(observer("radius")).define("radius", ["d3"], _radius);
    main.variable(observer("path")).define("path", ["d3","projection"], _path);
    main.variable(observer("projection")).define("projection", ["d3","scale","width","height"], _projection);
    main.variable(observer("outline")).define("outline", ["d3"], _outline);
    main.variable(observer("graticule")).define("graticule", ["d3"], _graticule);
    main.variable(observer("scale")).define("scale", ["width"], _scale);
    main.variable(observer("width")).define("width", _width);
    main.variable(observer("height")).define("height", ["width"], _height);
    main.variable(observer("d3")).define("d3", ["require"], _d3);
    return main;
}
