import React, { useEffect } from 'react'
import 'litegraph.js/css/litegraph.css'
import NodeRegister from '../NodeRegister';

const NodeGraph = () => {

    useEffect(() => {
        //INITIALIZE LITEGRAPH
        var nodeRegister = new NodeRegister();
        nodeRegister.register();
        var LiteGraph = nodeRegister.getLiteGraph();
        var graph = new LiteGraph.LGraph();
        var canvas = new LiteGraph.LGraphCanvas(document.getElementById('node-graph-canvas'), graph);
        graph.start();
    });

    return (
        <div>
            <canvas id='node-graph-canvas' width='1024' height='720' style={{ border: '1px solid' }}></canvas>
        </div>
    )
}

export default NodeGraph
