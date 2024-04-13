import './App.css';
import NodeCanvas from "./NodeCanvas.tsx";
import {useEffect, useState} from "react";
import {Flow} from "./interfaces/Flow.tsx";
import {Stage} from "@pixi/react";

function App() {

    const JIXI_API_KEY = 'YOUR_API_KEY';
    const JIXI_URL = 'YOUR_ACTION_URL';

    const [flowData, setFlowData] = useState<Flow | null>(null);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    // Make the AI call to generate the flow chart
    const handleSubmit = async () => {

        setFlowData(null);

        // Using API Key from Jixi
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JIXI_API_KEY
            },
            body: JSON.stringify({ request: inputValue })
        };

        try {
            const response = await fetch(JIXI_URL, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFlowData(data.flow);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    // Starting default data
    useEffect(() => {
        setFlowData({
            nodes: [
                { id: 1, type: 'Start', position: { x: 0, y: 0 } },
                { id: 2, type: 'Send Message', message: 'Hello', position: { x: 175, y: -100 } }
            ],
            connections: [
                { id: 1, node1: 1, node2: 2 }
            ],
        })
    }, [])

    return (
        <div className={'flex'}>
            <div className="instructions-container">
                {"Use the Text Area in the bottom right to generate AI flow charts. View the raw data in the top right." +
                    "\n\nPossible Nodes: \n\n" +
                    "Send Message: Sends a string message\n\n" +
                    "Wait: Waits for a certain amount of milliseconds\n\n" +
                    "Randomize: Chooses between two possible nodes\n\n" +
                    "Example Input: \nSend a message that says 'Hello', wait 2 seconds, then send another message that says 'How are you?'"
                }
            </div>
            {flowData ?
                <NodeCanvas flowData={flowData}/> :
                <Stage width={800} height={800} options={{ antialias: true, background: 0xf3f4f5 }}/>
            }
            <div style={{
                width: '50vw',
                height: '792px',
            }}>
                <div className={'json-display'}>
                    {flowData ? <pre>{JSON.stringify(flowData, null, 2)}</pre> : 'Loading...'}
                </div>
                <div className={'input-display'}>
                    <textarea
                        value={inputValue}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            height: '200px',
                            marginBottom: '10px',
                            background: 'white',
                            color: 'black',
                            fontSize: '18px',
                            fontFamily: 'system-ui',
                        }}
                    />
                    <button onClick={handleSubmit} style={{
                        width: '100%',
                        padding: '10px 0',
                        fontSize: '18px',
                        cursor: 'pointer',
                        fontFamily: 'system-ui',
                    }}>
                        Generate
                    </button>
                </div>
            </div>

        </div>
    )
}

export default App
