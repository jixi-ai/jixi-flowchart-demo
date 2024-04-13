import {Position} from "../../interfaces/Position.tsx";
import NodeComponent from "../NodeComponent.tsx";

interface RandomizeNodeProps {
    id: number;
    position: Position;
    probabilityOne: number;
    probabilityTwo: number;
}

const RandomizeNode = (props: RandomizeNodeProps) => {
    return (
        <>
            <NodeComponent id={props.id} position={props.position} label={"Randomize"} height={0}>
                {(props.probabilityOne * 100).toString() + '%'}
                {(props.probabilityTwo * 100).toString() + '%'}
            </NodeComponent>
        </>
    )
}

export default RandomizeNode;