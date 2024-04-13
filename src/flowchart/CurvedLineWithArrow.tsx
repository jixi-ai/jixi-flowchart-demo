import { Graphics } from '@pixi/react';
import {Position} from "../interfaces/Position.tsx";

interface CurvedLineWithArrowProps {
    startPoint: Position;
    endPoint: Position;
}

const CurvedLineWithArrow = (props: CurvedLineWithArrowProps) => {
    const draw = (g: any) => {
        g.clear();
        g.lineStyle(2, 0x000000, .5); // Line thickness, color, and alpha

        // Calculate control points for the quadratic curve
        const minXDistance = 75;

        const dx = props.endPoint.x - props.startPoint.x;

        // Calculate mid point and adjust with minimum X distance
        const midX = props.startPoint.x + dx / 2;
        const controlPoint1 = {
            x: Math.max(props.startPoint.x + minXDistance, midX - minXDistance / 2),
            y: props.startPoint.y,
        };
        const controlPoint2 = {
            x: Math.min(props.endPoint.x - minXDistance, midX + minXDistance / 2),
            y: props.endPoint.y,
        };

        // Draw the cubic bezier curve
        g.moveTo(props.startPoint.x, props.startPoint.y);
        g.bezierCurveTo(
            controlPoint1.x, controlPoint1.y,
            controlPoint2.x, controlPoint2.y,
            props.endPoint.x, props.endPoint.y
        );

        // Calculate the angle of the line at the endpoint for the arrowhead
        const angle = Math.atan2(props.endPoint.y - controlPoint2.y, props.endPoint.x - controlPoint2.x);

        // Size and angle for the arrowhead
        const arrowLength = 10;
        const arrowWidth = Math.PI / 6; // 30 degrees in radians

        // Draw the arrowhead at the end of the curve
        g.moveTo(props.endPoint.x, props.endPoint.y);
        g.lineTo(
            props.endPoint.x - arrowLength * Math.cos(angle - arrowWidth),
            props.endPoint.y - arrowLength * Math.sin(angle - arrowWidth)
        );
        g.moveTo(props.endPoint.x, props.endPoint.y);
        g.lineTo(
            props.endPoint.x - arrowLength * Math.cos(angle + arrowWidth),
            props.endPoint.y - arrowLength * Math.sin(angle + arrowWidth)
        );
    };

    return <Graphics draw={draw} />;
};

export default CurvedLineWithArrow;
