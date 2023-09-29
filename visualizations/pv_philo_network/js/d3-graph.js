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
var showingHighlight = true;
// var shiftView = false;


// Shift Views 

function createD3Graph(graph, parentWidth, parentHeight, pageType) {
    var x = document.getElementById("detail-area-container");
    var y = document.getElementById("d3_svg");
    var z = document.getElementById("d3_selectable_force_directed_graph");
    x.style.display = "none";
    x.style.zIndex = 1;
    
    y.style.display = "block";
    z.style.zIndex = 10;
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
    var reasonableScreenSizeScaleMultiple = 1;
    var initXTransform = 1;
    var initYTransform = 1;
    if (pageType == 'subtopic') {
        reasonableScreenSizeScaleMultiple = 16000;
        initXTransform = parentWidth / 2;
        initYTransform = parentHeight / 2;
    } else {
        reasonableScreenSizeScaleMultiple = 9000;
        initXTransform = parentWidth / 2.5;
        initYTransform = parentHeight / 3.6;
    }
    var initScale = Math.max(parentWidth, parentHeight) / (reasonableScreenSizeScaleMultiple);

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

    //------------------------------------------
    // Link and linkLabel
    //------------------------------------------

    // add links
    links = gDraw.append("g")
        .attr("class", "link")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")

        // link strength
        .attr("stroke-width", function(d) { 
            if(d.type == "people_connection") {
                return 3;
            }
            return Math.sqrt(d.value); 
        })
        .attr("stroke", function(d){
            if(d.type == "topic_subtopic") {
                return "rgba(50, 187, 225, 0.959)";
            }
            
            if(d.type == "corres_topic") {
                return "rgba(155, 175, 195, 0.9)";
            } 

            if(d.type == "people_connection") {
                return "rgba(155, 175, 195, 0.5)";
            }



            if(d.type == "parent_primary_major_center_to") {
                return "rgba(155, 175, 195, 0.5)";
            }
        }
        )

    // link labels 
    linkLabels = gDraw.append("g")
        .attr("class", "link-labels")
        .selectAll("text")
        .data(graph.links)
        .enter().append("text")
        .text(function(d) {
            if(d.type == "topic_subtopic") {
                return "";
            }
            if(d.type == "corres_topic") {
                return "";
            }
            if(d.type == "multi_relations") {
                return d.type;
            }
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("opacity", 0.8)
        .attr("font-size", 20)
        .attr("fill", function(d) {
            if(d.type == "topic_subtopic") {
                return "rgba(255, 255, 255, 0.96)";
            }
            if(d.type == "corres_topic") {
                return "rgba(255, 255, 255, 0.96)";
            }

            if(d.type == "people_connection") {
                return "rgba(255, 255, 255, 0.96)";
            }


            if(d.type == "parent_primary_major_center_to") {
                return "rgba(255, 255, 255, 0.96)";
            }
        })
        .attr("stroke", function(d) {
            if(d.type == "topic_subtopic") {
                return "rgba(255, 255, 255, 0.96)";
            }
            if(d.type == "corres_topic") {
                return "rgba(255, 255, 255, 0.96)";
            }

            if(d.type == "people_connection") {
                return "rgba(255, 255, 255, 0.96)";
            }


            if(d.type == "parent_primary_major_center_to") {
                return "rgba(255, 255, 255, 0.96)";
            }
        })
        .attr("stroke-width", 0.5)
        .attr("stroke-opacity", 0.8)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-miterlimit", 1)
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", 20)
        .attr("font-style", "italic")
        .attr("font-variant", "normal")
        .attr("text-decoration", "none")
        .attr("text-decoration-style", "solid")
        .attr("text-decoration-color", "#000")
        .attr("text-decoration-line", "none")
        .attr("text-decoration-thickness", "0.5")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("pointer-events", "none")
        .attr("x", function(d) { return (d.source.x+d.target.x)/2; })


    //------------------------------------------
    // nodes and nodeLabels
    //------------------------------------------

    // add nodes
    nodes = gDraw.append("g")
        .attr("class", "node")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        // size of node
        .attr("r", function(n) { 

                if(n.labels[0] == "correspondence") {
                    return 60;
                }
                if(n.labels[0] == "subtopic") {
                    return 10;
                }
                if(n.labels[0] == "topic") {
                    return 10+4*n.properties.count_mentioned;
                }


                if(n.labels[0] == "people") {
                    return 50+1*n.properties.value;
                }
                if(n.labels[0] == "connection") {
                    return 30;
                }


        })
        // color of node
        .attr("fill", function(n) { 

        
            if(n.labels[0] == "correspondence") {
                return "rgba(155, 175, 195, 0.4)";
            }
            if(n.labels[0] == "topic") {
                return "rgba(2, 187, 181, 0.5)";
            }


            if(n.labels[0] == "people") {
                if(n.properties.name == "Unknown"){
                    return "rgba(0, 0, 0, 1)";
                }
                return "rgba(2, 187, 181, 0.5)";
            }
            if(n.labels[0] == "connection") {
                if(n.type == "correspondence") {return "rgba(155, 175, 195, 0.4)";}

                if(n.type == "linked") {return "rgba(133, 64, 222, 0.96)";}
                if(n.type == "unsure") {return "rgba(0, 51, 204, 0.96)";}
                if(n.type == "friend") {return "rgba(0, 153, 255, 0.96)";}
                if(n.type == "marriage") {return "rgba(41, 202, 127, 0.99)";}
                if(n.type == "family") {return "rgba(14, 169, 3, 0.96)";}
                if(n.type == "influence") {return "rgba(0, 51, 204, 0.96)";}

                return "rgba(0, 153, 255, 0.96)";
            }

            // correspondence_shown
            if(n.labels[0] == "correspondence_shown") {
                return "rgba(20, 37, 53, 0.89)";
            }
        })

        .call(d3v4.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
      


    //Display node name when mouse on a node
    nodes.append("title").text(function(n) { return n.properties.name });


    // display node labels in different colors based on the node type

    nodeLabels = gDraw.append("g")
        .attr("class", "node-labels")
        .selectAll("text")
        .data(graph.nodes)
        .enter().append("text")
        .text(function(n) { 
            // only if subtopic
            // if(n.labels[0] == "subtopic" || n.labels[0] == "subtopic_notshown") {
            //     return n.properties.name;
            // }

            if(n.labels[0] == "correspondence_shown") {
                //return n.properties.name;
                return n.properties.name.split(" ").map(word => (typeof word[0] === 'string' ? word[0].toUpperCase() : '')).join("");
            }
            if(n.labels[0] == "topic") {
                return "「"+n.properties.name+"」";
            }

            if(n.labels[0] == "people") {
                return ""+n.properties.name+"";
            }
            if(n.labels[0] == "connection") {
                if(n.type == "correspondence") {
                    return "";
                    // "letter";
                }
                return n.type;
            }
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("opacity", 
            function(n) {
                if(n.labels[0] == "subtopic") {
                    return 0.8;
                }
                if(n.labels[0] == "correspondence_shown") {
                    return 0.8;
                }
                if(n.labels[0] == "topic") {
                    return 0.6+0.04*n.properties.count_mentioned;
                }

                if(n.labels[0] == "people") {
                    return 0.8;
                }
                if(n.labels[0] == "connection") {
                    if(n.type == "correspondence") {
                        return 0.5;
                    }
                    return 0.8;
                }


            }
        )
        .attr("style", function(n) {
            if(n.labels[0] == "connection") {
                if(n.type == "correspondence") {
                    return "font-style: italic;";
                    }
                    }
                    })
        .attr("font-family", "sans-serif")   
        .attr("font-size", function(n) {
            if(n.labels[0] == "subtopic") {
                return 80;
            }
            // correspondence not shown
            if(n.labels[0] == "correspondence_shown") {
                return 50;
            }
            if(n.labels[0] == "topic") {
                return 50+2.5*n.properties.count_mentioned;
            }

            if(n.labels[0] == "people") {
                return 70+0.5*n.properties.value;
            }
            if(n.labels[0] == "connection") {
                return 50;
            }

        })
        //color
        .attr("fill", function(n) {
            if(n.labels[0] == "subtopic") {
                return "rgba(255, 255, 255, 0.96)";
            }
            if(n.labels[0] == "correspondence_shown") {
                return "rgba(255, 255, 255, 0.96)";
            }
            if(n.labels[0] == "topic") {
                return "rgba(255, 255, 255, 0.96)";
            }

            if(n.labels[0] == "people") {
                return "rgba(255, 255, 255, 0.96)";
            }

        })
        

        .call(d3v4.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));


//------------------------------------------
// simulation
//------------------------------------------

    // https://stackoverflow.com/questions/47510853/how-to-disable-animation-in-a-force-directed-graph
    simulation = d3v4.forceSimulation()
        .force("link", d3v4.forceLink()
                .id(function(d) { return d.id; })
                .distance(function(d) { return 400;}))
        .force("charge", d3v4.forceManyBody().distanceMin(10).strength(-6500))
        //.force('charge', d3.forceManyBody().strength(-1900).theta(0.5).distanceMax(1500))
        .force("center", d3v4.forceCenter(parentWidth / 2, parentHeight / 2))
        .force("x", d3v4.forceX(parentWidth/2))
        .force("y", d3v4.forceY(parentHeight/2))
        .force("collide", d3.forceCollide().strength([0.3]));

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);
    
    simulation.force("node")
        .texts(graph.links);

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

        nodeLabels.attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y-10; });

        linkLabels.attr("x", function(d) { return (d.source.x+d.target.x)/2; })
            .attr("y", function(d) { return (d.source.y+d.target.y)/2; });
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
    allNodes.classed("not-selected", function(n){ return n.id != node.id});
    // select link about influence
    // define source and target
    allLinks.classed("influenced-by", function(l){ return l.source.id == node.id})
    allLinks.classed("influences", function(l){ return l.target.id == node.id})

    // if the node is subtopic, show info
    if(node.labels[0] == "people") {
        showPeopleInfo(node);
        selectedNode = node;
    }
    if(node.labels[0] == "correspondence") {
        showCorrInfo(node);
        selectedNode = node;
    }
    
    if(node.labels[0] == "topic") {
        showConceptInfo(node);
        selectedNode = node;
    }
    if(node.labels[0] == "connection" && node.type == "correspondence") {
        showConnInfo(node);
        selectedNode = node;
    }

       
}

function resetSelectedNode(allNodes, allLinks) {
    selectedNode = null;
    allNodes.classed("selected", false);
    allLinks.classed("influences", false);
    allLinks.classed("influenced-by", false);
}

// info board
function showPeopleInfo(node) {
    
    $('.modal').modal('open');
    // $('#PeopleImg').attr("src", node.img); 
    //$('#PeopleName').attr("href", "here is a link!" + node.id);
    $('#PeopleName').text(node.properties.name);
    $('#PeopleDescription')
        .html(
            "<br/><i><strong>"+ node.properties.name + "</i></strong>"+
            "<br/><i>Other reference (if any) <strong>"+ node.properties.sameAs + "</i></strong>" +
            "<br/><i>Roles: "+ node.properties.roles  +"</i>" +
            // "<br/><i>Weight: "+ node.properties.value  +"</i>" + 
            "<br>" +
            "<br/><strong>Connections recorded in the network</strong>: <i>"+ node.properties.connections + "</i>" +
            "<br/><strong>Number of connections recorded in the network</strong>: <i>"+ node.properties.value + "</i>" +
            "<br/>--------------"+
            // other information?
            "<br/><strong>Other info</strong>: <br/><i>" + "</i>"

            // + "<br/><strong>Advising</strong>: to be updated!<br/>"
        );
}

function showCorrInfo(node) {
    
    $('.modal').modal('open');
    // $('#PeopleImg').attr("src", node.img); 
    //$('#PeopleName').attr("href", "here is a link!" + node.id);
    $('#PeopleName').text("Letter: "+node.properties.name);
    $('#PeopleDescription')

    .html(
        "<br/>Written by <strong><i>"+ node.properties.from + "</i></strong>"+
        "<br/>To <strong><i>" + node.properties.to + "</i></strong>"+
        "<br/><i>On <strong>"+ node.properties.date + "</i></strong>" +
        "<br/><i>Location: <strong>"+ node.properties.location  +"</strong></i>" +
        // "<br/><i>Weight: "+ node.properties.value  +"</i>" + 

        "<br/><br/><strong><i>Content translated by Lisa Shapiro</strong>:<br/>"+ node.properties.translated_text + "</i>" +
        "<br/><br/>--------------"+
        "<br/><strong>Grouped topics counted</strong>: <i>"+ node.properties.grouped_themes_count + "</i>" +
        "<br/><strong>Grouped topics counted in detail</strong>: <i>"+ node.properties.grouped_themes_count_detailed + "</i>" +
        "<br/><strong>Grouped topics</strong>: <i><br>"+ node.properties.grouped_themes + "</i>" 
        // + "<br/><strong>Advising</strong>: to be updated!<br/>"
    );
}

function showConnInfo(node) {
    
    $('.modal').modal('open');
    // $('#PeopleImg').attr("src", node.img); 
    //$('#PeopleName').attr("href", "here is a link!" + node.id);
    $('#PeopleName').text("Letter: "+node.properties.name);
    $('#PeopleDescription')

    .html(
        "<br/>Written by <strong><i>"+ node.properties.from + "</i></strong>"+
        "<br/>To <strong><i>" + node.properties.to + "</i></strong>"+
        "<br/><i>On <strong>"+ node.properties.date + "</i></strong>" +
        "<br/><i>Location: <strong>"+ node.properties.location  +"</strong></i>"
    );
}

function showConceptInfo(node) {
    
    $('.modal').modal('open');
    // $('#PeopleImg').attr("src", node.img); 
    // $('#PeopleName').attr("href", "here is a link!" + node.id);
    $('#PeopleName').text("Topic: "+node.properties.name);
    $('#PeopleDescription')
        .html(
            // "<br/><strong>Letters addressing this topic:</strong><br>"+
            "<br/><strong>Mentioned by: </strong>" + node.properties.count_mentioned + " letters" +
            "<br/><strong>Count of subtopics (may include the topic itself): <i></strong>"+ node.properties.count_subtopic + "</i>" +
            "<br/><strong>Broken-down subtopics: </strong>" +
            "<br/><i>"+ node.properties.subtopics + "</i>"
            

        );
}


// =================================================================
// highlightt


function highlightNode(checkboxStatus) {

    var color = ["rgb(255, 188, 43)", "rgba(48, 87, 186, 0.959)"];

    // is just a bool
    if(checkboxStatus ) {
        
        nodes.attr("fill", function(d) { return color[d.gender]; });
        showingHighlight = true;
    } else {
        
        nodes.attr("fill", function(d) { return color[1];});
        showingHighlight = false;
    }
}

function onClickHighlightNode() {
    var checkBox = document.getElementById("onClickHighlightNode");
    // checkBox.checked == true => checked
    // checkBox.checked == false => unchecked
    highlightNode(checkBox.checked);
}


// =================================================================
// search 

function searchByName() {
    // get strings in search bar
    var searchTerm = document.getElementById("search").value;
    // color 
    nodes.classed("search-match", function(n){
        if(searchTerm.length == 0) {
            return false;
        } else {
            return n.properties.name.toLowerCase().includes(searchTerm.toLowerCase());
        } 
    });
    // Not matched
    nodes.classed("not-search-match", function(n){
        if(searchTerm.length == 0) {
            return false;
        } else {
            return !n.properties.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });
}



