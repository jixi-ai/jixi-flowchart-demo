import {Position} from "../../interfaces/Position.tsx";
import NodeComponent from "../NodeComponent.tsx";

interface WaitNodeProps {
    id: number;
    position: Position;
    time: number;
}

const WaitNode = (props: WaitNodeProps) => {
    return (
        <>
            <NodeComponent id={props.id} position={props.position} label={"Wait"} height={0}>
                {props.time.toString() + 'ms'}
            </NodeComponent>
        </>
    )
}

export default WaitNode;