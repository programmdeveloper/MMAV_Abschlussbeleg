import React, { useEffect } from 'react'
import 'litegraph.js/css/litegraph.css'
import NodeRegisterInstance from '../NodeRegister';
import { WIDTH, HEIGHT, GRAPHWIDTH, OUTHEIGHT } from '../App';

const NodeGraph = () => {

    useEffect(() => {
        //INITIALIZE LITEGRAPH
        NodeRegisterInstance.register();
        var LiteGraph = NodeRegisterInstance.getLiteGraph();
        var graph = new LiteGraph.LGraph();
        var canvas = new LiteGraph.LGraphCanvas(document.getElementById('node-graph-canvas'), graph);
        canvas.background_image = "";
        graph.start();
    });

    return (
        <div className="Nodegraphcanvas" id="Nodegraphcanvas">
            <canvas id='node-graph-canvas' className='node-graph-canvas' height={document.documentElement.clientHeight - 90} width={document.body.offsetWidth / 2} style={{ backgroundColor:"#374049"}}></canvas>
        </div>
    )
}

export default NodeGraph
