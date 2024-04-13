import {Node} from "./Node.tsx";
import {Connection} from "./ConnectionPoint.tsx";

export interface Flow {
    nodes: Node[];
    connections: Connection[];
}