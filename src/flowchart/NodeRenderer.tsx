import {Node} from '../interfaces/Node.tsx'
import StartNode from "./nodes/StartNode.tsx";
import SendMessageNode from "./nodes/SendMessageNode.tsx";
import RandomizeNode from "./nodes/RandomizeNode.tsx";
import WaitNode from "./nodes/WaitNode.tsx";

interface NodeRendererProps {
    node: Node;
}

const NodeRenderer = (props: NodeRendererProps) => {
    switch (props.node.type) {
        case 'Start':
            return <StartNode
                id={props.node.id}
                position={props.node.position}
            />;
        case 'Send Message':
            return <SendMessageNode
                id={props.node.id}
                position={props.node.position}
                message={props.node.message ?? ''}
            />;
        case 'Randomize':
            return <RandomizeNode
                id={props.node.id}
                position={props.node.position}
                probabilityOne={props.node.probabilityOne ?? .5}
                probabilityTwo={props.node.probabilityTwo ?? .5}
            />;
        case 'Wait':
            return <WaitNode
                id={props.node.id}
                position={props.node.position}
                time={props.node.time ?? 0}
            />;
        default:
            return <div>Unknown Node Type</div>;
    }
};

export default NodeRenderer;