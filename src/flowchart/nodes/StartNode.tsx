import {Position} from "../../interfaces/Position.tsx";
import NodeComponent from "../NodeComponent.tsx";

interface StartNodeProps {
    id: number;
    position: Position;
}

const StartNode = (props: StartNodeProps) => {
    return (
        <>
            <NodeComponent id={props.id} position={props.position} label={"Start"} height={0}/>
        </>
    )
}

export default StartNode;