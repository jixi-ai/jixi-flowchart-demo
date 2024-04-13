import {Position} from "../../interfaces/Position.tsx";
import NodeComponent from "../NodeComponent.tsx";

interface SendMessageNodeProps {
    id: number;
    position: Position;
    message: string;
}

const SendMessageNode = (props: SendMessageNodeProps) => {
    return (
        <>
            <NodeComponent id={props.id} position={props.position} label={"Send Message"} height={0}>
                {props.message}
            </NodeComponent>
        </>
    )
}

export default SendMessageNode;