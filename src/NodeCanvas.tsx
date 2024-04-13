import {useEffect, useReducer, useState} from "react";
import {Connection} from "./interfaces/ConnectionPoint.tsx";
import {Node} from "./interfaces/Node.tsx";
import { Stage, Container } from '@pixi/react';
import CurvedLineWithArrow from "./flowchart/CurvedLineWithArrow.tsx";
import {Flow} from "./interfaces/Flow.tsx";
import NodeRenderer from "./flowchart/NodeRenderer.tsx";

interface NodeCanvasProps {
    flowData: Flow;
}

const NodeCanvas = (props: NodeCanvasProps) => {
    // STATE
    const [nodes, setNodes] = useState<Node[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const loadFlow = (flow: Flow) => {
        const { nodes, connections } = flow;

        const parsedNodes = nodes.map(node => ({ ...node }));
        const parsedConnections = connections.map(conn => ({
            id: conn.id,
            node1: conn.node1,
            node2: conn.node2,
        }));

        setNodes(parsedNodes);
        setConnections(parsedConnections);
        forceUpdate();
    };

    useEffect(() => {
        loadFlow(props.flowData);
    }, [props.flowData]);

    return (
        <Stage width={800} height={800} options={{ antialias: true, background: 0xf3f4f5 }}>
            <Container x={100} y={400}>

                {/*Render the Nodes*/}
                {nodes.map(n => <NodeRenderer key={n.id} node={n} />)}

                {/*Render the connection points*/}
                {connections.map(conn => {
                    const fromNode = nodes.find(n => n.id === conn.node1);
                    const toNode = nodes.find(n => n.id === conn.node2);
                    return (
                        (fromNode && toNode) ?
                            <CurvedLineWithArrow
                                key={conn.id}
                                startPoint={{x: fromNode.position.x + 75, y: fromNode.position.y}}
                                endPoint={{x: toNode.position.x - 75, y: toNode.position.y}}
                            /> :
                            <></>
                    );
                })}
            </Container>
        </Stage>
    )
}

export default NodeCanvas;