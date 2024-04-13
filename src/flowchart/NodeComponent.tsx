import {Graphics, Text} from '@pixi/react'
import React, {useEffect, useRef, useState} from "react";
import {Position} from "../interfaces/Position.tsx";

interface NodeProps {
    id: number;
    position: Position,
    label: string,
    height: number,
    children?: React.ReactNode,
}

const NodeComponent = (props: NodeProps) => {
    const defaultPosition: Position = {x: props.position.x, y: props.position.y}
    const [position, setPosition] = useState<Position>(defaultPosition);

    const graphicsRef = useRef<never>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setPosition(props.position)
    }, [props.position])

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging) return;
            // Calculate the new position
            const dx = event.clientX - dragStart.x;
            const dy = event.clientY - dragStart.y;
            setPosition(prevPosition => ({ x: prevPosition.x + dx, y: prevPosition.y + dy }));
            // Update drag start position for the next move event
            setDragStart({ x: event.clientX, y: event.clientY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    const onDragStart = (event: any) => {
        setIsDragging(true);
        setDragStart({ x: event.clientX, y: event.clientY });
    };

    return (
        <>
            <Graphics
                ref={graphicsRef}
                draw={(g) => {
                    g.clear();
                    g.beginFill(0xFFFFFF);
                    g.drawRoundedRect(-75, -50, 150, 100, 12);
                    g.endFill();
                }}
                x={position.x}
                y={position.y}
                pointerdown={onDragStart}
                mouseover={() => {
                    document.body.style.cursor = 'move';
                }}
                mouseout={() => {
                    document.body.style.cursor = 'default';
                }}
                interactive={true}
            />
            <Text
                text={props.label}
                x={position.x}
                y={position.y}
                style={{
                    fontFamily: '"Arial"',
                    fontSize: 14,
                    fill: 'black',
                    align: 'center'
                }}
                anchor={0.5} // Centers the text
            />
            {props.children && (
                <Text
                    text={props.children as string ?? ''}
                    x={position.x}
                    y={position.y + 20}
                    style={{ fontFamily: '"Arial"', fontSize: 12, fill: 'grey', align: 'center' }}
                    anchor={0.5}
                />
            )}
        </>
    );
};

export default NodeComponent;
