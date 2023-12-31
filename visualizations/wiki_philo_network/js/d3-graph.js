// if both d3v3 and d3v4 are loaded, we'll assume
// that d3v4 is called d3v4, otherwise we'll assume
// that d3v4 is the default (d3)
if (typeof d3v4 == 'undefined')
    d3v4 = d3;

var links = null;
var nodes = null;
var yAxisG = null;
var simulation = null;
var selectedNode = null;
var clippingToTimeline = false; // it is the status of checkbox
var showingGender = true;
// var shiftView = false;


// Shift Views 

// =================================================================
// 
// function clipNodesToTimeline(checkboxStatus) {
//     if(checkboxStatus) {
//         shiftView = true;
//         graph = graph
//     } else {
//         shiftView = false;
//         graph = graph_
//     }
// }

// function onClickShiftView() {
//     var checkBox = document.getElementById("shiftViewCheckbox");
//     clipNodesToTimeline(checkBox.checked);
// }




function createD3Graph(graph, parentWidth, parentHeight) {

    var svg = d3v4.select('svg')
    .attr('width', '100%')
    .attr('height', '100%')

    // remove any previous graphs
    svg.selectAll('.g-main').remove();

    var gMain = svg.append('g')
    .classed('g-main', true)

    // add background
    var rect = gMain.append('rect')
    .classed('graph-background', true)
    .attr('width', '100%')
    .attr('height', '100%')

    // add graph
    // give graph a reasonable size and position for different screen sizes / aspect ratios using shallow trickery
    var reasonableScreenSizeScaleMultiple = 11600 * 1.2
    var initScale = Math.max(parentWidth, parentHeight) / (reasonableScreenSizeScaleMultiple);
    var initXTransform = parentWidth / 2 - initScale * 800;
    var initYTransform = parentHeight / 3;
    var gDraw = gMain.append('g')
    .attr("transform","translate("+ initXTransform + ", " + initYTransform + ") scale(" + initScale + ")");

    // add Y axis
    // map domain to range
    var yScale = d3v4.scaleLinear()
    .domain([parentHeight - 96, 96]) // unit:
    .range([parentHeight - 96, 96]); // unit:

    var yAxis = createYAxis(yScale)
    
    yAxisG = gMain.append("g")
    .classed('y-axis', true)
    .call(yAxis)
    .attr("opacity", 0)
    .attr("transform", "translate(" + (parentWidth * 0.08 + 38) + "," + 0 + ")");

    // Add zoom callback
    var zoom = d3v4.zoom()
    .on('zoom', zoomed);

    gMain.call(zoom).call(zoom.transform, d3v4.zoomIdentity.translate(initXTransform, initYTransform).scale(initScale));

    function zoomed() {
        gDraw.attr('transform', d3v4.event.transform);
        var newYScale = d3v4.event.transform.rescaleY(yScale);
        yAxisG.call(createYAxis(newYScale))
    }

    // Add resize callback
    window.addEventListener('resize', function() {
        var graphContainer = document.getElementById("d3_selectable_force_directed_graph")
        yAxisG.attr("transform", "translate(" + (graphContainer.clientWidth * 0.08 + 38) + "," + 0 + ")");
    });

    // add links
    links = gDraw.append("g")
        .attr("class", "link")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); })
        .attr("stroke", function(d){ return "rgba(176, 176, 191, 0.841)";});

    // add nodes
    nodes = gDraw.append("g")
        .attr("class", "node")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", function(d) { 
                // return Math.sqrt(d.score * 50000 * 3.14);
                return Math.sqrt(d.score * 70000 * 3.14);

        })
        
        .attr("fill", function(d) { return "rgba(48, 87, 186, 0.959)";})
        .call(d3v4.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
      


    //Display node name when mouse on a node
    nodes.append("title").text(function(d) { return d.name });

    

    // create simulation

    // https://stackoverflow.com/questions/47510853/how-to-disable-animation-in-a-force-directed-graph
    simulation = d3v4.forceSimulation()
        .force("link", d3v4.forceLink()
                .id(function(d) { return d.id; })
                .distance(function(d) { return 100;}))
        .force("charge", d3v4.forceManyBody().distanceMin(100).strength(-2000))
        .force("center", d3v4.forceCenter(parentWidth / 2, parentHeight / 2))
        .force("x", d3v4.forceX(parentWidth/2))
        .force("y", d3v4.forceY(parentHeight/2));

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

        // .nodes(graph.nodes)
        // .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    // for (var i = 0; i < 300; ++i) simulation.tick();

    function ticked() {
        // https://observablehq.com/@d3/simulation-tick
        // simulation.tick(n) runs n iterations of a force simulation layout.
        // update node and line positions at every step of the force simulation
        links.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        nodes.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }

//------------------------------------------
// interactions
//------------------------------------------

    // click
    rect.on('click', () => {
        resetSelectedNode(nodes, links);
    });

    // drag
    function dragstarted(d) {
        if (!d3v4.event.active) simulation.alphaTarget(0.9).restart();

        setSelectedNode(d, nodes, links);

        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx += d3v4.event.dx;
        d.fy += d3v4.event.dy;
    }

    function dragended(d) {
        if (!d3v4.event.active) simulation.alphaTarget(0);

        d.fx = null;

        if(clippingToTimeline) {
            d.fy = d.savedFy;
        } else {
            d.fy = null;
        }
    }
};

// y axis
function createYAxis(scale) {
    return d3v4.axisLeft(scale)
    .ticks(10)
    .tickFormat(function(d) {
        var yearsAd = Math.floor(2000 - d);
        if(yearsAd >= 0) {
            return yearsAd + "";
        } else {
            return Math.abs(yearsAd) + " BC"
        }
    })
}

// select node
// input the clicked node and the graph
function setSelectedNode(node, allNodes, allLinks) {
    // do nothings if no new click
    if(selectedNode === node) return;
    if(selectedNode != null) {
        allLinks.classed("influences", false);
        allLinks.classed("influenced-by", false);
    }
    // select node that is clicked
    allNodes.classed("selected", function(n){ return n.id == node.id});
    // select link about influence
    // define source and target
    allLinks.classed("influenced-by", function(l){ return l.source.id == node.id})
    allLinks.classed("influences", function(l){ return l.target.id == node.id})


    showPhilosopherInfo(node);
    selectedNode = node;
}

function resetSelectedNode(allNodes, allLinks) {
    selectedNode = null;
    allNodes.classed("selected", false);
    allLinks.classed("influences", false);
    allLinks.classed("influenced-by", false);
}

// info board
function showPhilosopherInfo(node) {
    
    $('.modal').modal('open');
    // $('#philosopherImg').attr("src", node.img); 
    $('#philosopherName').attr("href", "https://en.wikipedia.org/?curid=" + node.id);
    $('#philosopherName').text(node.name);
    $('#philosopherDescription').text("");
    // fetch data from js; up to date
    var summaryUrl = "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=" + node.id;
    fetch(summaryUrl)
    .then(response => response.json())
    //  injects HTML directly into the element
    .then(json => $('#philosopherDescription')
        .html(
                // "Known as: " + node.referred_name + 
                // "<br/>"+ "Included/Excluded in the list(s): " + node.inclusion + 
                // "<br/>"+ "Birth year recorded by DBpedia: " + node.db_birthYear +
                // ", listed in wiki list: " + node.listed_birthYear +  
                // "<br/> "+ node.asLink + 
                // "<br/>"+
                "<br/>"+ "Wiki Abstract: "+  json.query.pages[node.id].extract));
}

// =================================================================
// click to shift timeline view

function clipNodesToTimeline(checkboxStatus) {
    if(checkboxStatus) {
        clippingToTimeline = true;
        yAxisG.attr("opacity", 1)
        // yAxisG.attr("opacity", 0)
        simulation.stop();
        nodes.each(function(d) {
            // d.fy = null;
            d.fy = d.savedFy;
        })
        simulation.alpha(1).restart();
    } else {
        clippingToTimeline = false;
        yAxisG.attr("opacity", 0)
        simulation.stop();
        nodes.each(function(d) { 
            d.fy = null;
        })
        simulation.alpha(1).restart();
    }
}

function onClickShiftView() {
    var checkBox = document.getElementById("shiftViewCheckbox");
    clipNodesToTimeline(checkBox.checked);
}

// =================================================================
// highlight women philosopher


function highlightWomenPhilosopher(checkboxStatus) {
    var color = ["rgb(255, 188, 43)", "rgba(48, 87, 186, 0.959)"];
    // is just a bool
    if(checkboxStatus ) {
        
        nodes.attr("fill", function(d) { return color[d.gender]; });
        showingGender = true;
    } else {
        
        nodes.attr("fill", function(d) { return color[1];});
        showingGender = false;
    }
}

function onClickHighlightWomen() {
    var checkBox = document.getElementById("onClickHighlightWomen");
    // checkBox.checked == true => checked
    // checkBox.checked == false => unchecked
    highlightWomenPhilosopher(checkBox.checked);
}




// =================================================================
// search 

function searchByName() {
    var searchTerm = document.getElementById("search").value;
    nodes.classed("search-match", function(n){
        if(searchTerm.length == 0) {
            return false;
        } else {
            return n.referred_name.toLowerCase().includes(searchTerm.toLowerCase());
        } 
    });
}



