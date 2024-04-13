import {Position} from "./Position.tsx";

export interface Node {
    id: number;
    type: string;
    position: Position;
    message?: string;
    time?: number;
    probabilityOne?: number;
    probabilityTwo?: number;
}