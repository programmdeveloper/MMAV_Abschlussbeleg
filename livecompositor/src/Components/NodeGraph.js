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
        <div className="Nodegraphcanvas" id="Nodegraphcanvas">
            <canvas id='node-graph-canvas' className='node-graph-canvas' height={window.innerHeight - 90} width={window.innerWidth / 2}></canvas>
        </div>
    )
}

export default NodeGraph
