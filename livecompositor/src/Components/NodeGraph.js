import React, { useEffect } from 'react'
import 'litegraph.js/css/litegraph.css'

var LiteGraph = require("litegraph.js/build/litegraph.js").LiteGraph;

const NodeGraph = () => {

    useEffect(() => {
        var graph = new LiteGraph.LGraph();
        var canvas = new LiteGraph.LGraphCanvas(document.getElementById('node-graph-canvas'), graph);

        LiteGraph.clearRegisteredTypes();
        //LiteGraph.registerNodeType("philipp/sum", MyAddNode);
        graph.start();
    });
    return (
        <div>
            <canvas id='node-graph-canvas' width='1024' height='720' style={{ border: '1px solid' }}></canvas>
        </div>
    )
}

export default NodeGraph
