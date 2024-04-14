# Jixi AI - Flowchart Demo
This is an open-source example of using Jixi AI to generate flow charts with multiple node types, node information, connection requirements, and automatic layout. 

The example uses [PixiJS](https://pixijs.io/) as the graphics library to render the nodes. The client can easily swap Pixi with other Flowchart libraries such as [React Flow](https://reactflow.dev/)

<img width="1161" alt="Screenshot 2024-04-13 at 4 38 25 PM" src="https://github.com/jixi-ai/jixi-flowchart-demo/assets/2688048/a3928870-8ead-406f-87b1-5a482bd58e6c">

## Requirements
This example uses Jixi AI as the AI infrastructure and requires a valid API key to run as expected. To sign up, please go to: https://app.jixi.ai/

## Setup
1. Clone the repository
   ```
   git clone https://github.com/jixi-ai/jixi-flowchart-demo.git
   ```
 2. Navigate to the repository
  ```
  cd jixi-flowchart-demo
  ```
 3. Install dependencies
  ```
  npm install
  ```
 4. Open `App.tsx`. Replace `JIXI_API_KEY` with your Jixi API key, and `JIXI_URL` with the URL of the Jixi Action. See below for information on this setup.
 5. Run `npm run dev`

## Jixi Setup
### Create an account login to Jixi
If you have not done so, navigate to https://app.jixi.ai/ and create a free account. Log in and navigate to your AI application

<img width="1670" alt="Screenshot 2024-04-13 at 5 00 02 PM" src="https://github.com/jixi-ai/jixi-flowchart-demo/assets/2688048/098b42b4-391a-4dca-9d09-540fc3bbc75f">

### Create a new action
On the sidebar, navigate to `Actions` and click `New Action`. Give your action a name (ex: `Flowchart Generator`) and an optional description. Click `Create` then navigate to the `Flowchart Generator` screen.
<img width="1674" alt="Screenshot 2024-04-13 at 5 03 11 PM" src="https://github.com/jixi-ai/jixi-flowchart-demo/assets/2688048/93547180-4bc2-440f-8b11-c2f086130e55">

### Replace code
Highlight all the action's code. Optionally, full screen the code editor by clicking the expand button on the top right of the code editor. Replace the Action's code with:
```javascript
// Click 'Run' to execute
async function execute(userInput) {

  let prompt = '';
  prompt += getFlowPrompt();
  prompt += getStartingNodePrompt();
  prompt += getSendMessageNodePrompt();
  prompt += getRandomizeNodePrompt();
  prompt += getWaitNodePrompt();
  prompt += getGoodExample();
  prompt += getGoodExampleTwo();

  // process the user's request
  prompt += "Use that information to create a flow chart that most accuractly depicts this request: " + userInput["request"]

  console.log(prompt);
  
  const config = {
    prompt: prompt,

    response: {
      flow: "object"
    }
  }
  const flowResult = await jixi.askAI(config);
  return flowResult
}

// Flow Information
function getFlowPrompt() {
  let flowPrompt = "We are going to create a flow chart containing nodes and connections. "
  flowPrompt += "'nodes' is an array of node objects. "
  flowPrompt += "'connections' is an array of connection objects. " 
  flowPrompt += "A connection can only exist between two nodes if both nodes exist in the 'nodes' array. "
  flowPrompt += " The final 'flow' will be an object containing two objects: 'nodes' which is an array of 'node' objects, and 'connections' which is an array of 'connection' objects. ";

  flowPrompt += "A 'node' type can be 'Start, 'Send Message', 'Wait', or 'Randomize'. "
  flowPrompt += "A node's X position should be at least 175 from the last node, horizontally. "
  flowPrompt += "A node's Y position should be at least 125 from the last node, vertically. "
  return flowPrompt;
}

// Connection Information
function getConnectionPrompt() {
  // connections
  const connectionObject = {
    id: "number",
    nodeStart: "number",
    nodeEnd: "number",
  }
  const connectionFormat = JSON.stringify(connectionObject);
  let connectionPrompt = "A connect has the format " + connectionFormat + ". ";
  connectionPrompt += "A 'connection' is the link between two nodes, where 'nodeStart' and 'nodeEnd' are the 'id' values of the two nodes it's connecting."
  connectionPrompt += "\n\n"
  return connectionPrompt;
}

// Start Node Information
function getStartingNodePrompt() {
  const startNode = {
    id: "number",
    type: "Start",
    position: {
        x: 0,
        y: 0,
    },
  };
  const startNodeFormat = JSON.stringify(startNode);
  let startingNodePrompt = "A node of type 'Start' has the format " + startNodeFormat + ". "
  startingNodePrompt += "It is always the first node of the flow, and always has an id of 1. Only one 'Start' node can exist in the flow. "
  startingNodePrompt += "The 'Start' node can connect to 1 other node. "
  startingNodePrompt += "The 'Start' node can connect to nodes of type: 'Send Message', 'Randomize', and 'Wait'. "
  startingNodePrompt += "\n\n"
  return startingNodePrompt;
}

// Send Message Information
function getSendMessageNodePrompt() {
  const sendMessageNode = {
    id: "number",
    type: "Send Message",
    position: {
        x: 0,
        y: 0,
    },
    message: "string"
  };
  const messageNodeFormat = JSON.stringify(sendMessageNode);
  let messagePrompt = "A node of type 'Send Message' has the format " + messageNodeFormat + ". "
  messagePrompt += "The 'Send Message' node can connect to 1 other node. "
  messagePrompt += "The 'Send Message' node can connect to nodes of type: 'Send Message', 'Randomize', and 'Wait'. "
  messagePrompt += "\n\n"
  return messagePrompt;
}

// Randomize Node Information
function getRandomizeNodePrompt() {
  const randomizeNode = {
    id: "number",
    type: "Randomize",
    position: {
        x: 0,
        y: 0,
    },
    probabilityOne: "number",
    probabilityTwo: "number",
  };
  const randomizeNodeFormat = JSON.stringify(randomizeNode);
  let randomizePrompt = "A node of type 'Randomize' has the format " + randomizeNodeFormat + ". "
  randomizePrompt += "The 'Randomize' node always connects to exactly 2 other nodes - one for each probability. Always make sure 'Randomize' nodes have exactly two outgoing connections. "
  randomizePrompt += "The 'Randomize' node can connect to nodes of type: 'Send Message' or 'Wait'. "
  randomizePrompt += "The 'probabilityOne' and 'probabilityTwo' values are numbers between 0.0 and 1.0, that always add up to 1.0"
  randomizePrompt += "\n\n"
  return randomizePrompt;
}

// Wait Node Information
function getWaitNodePrompt() {
  const waitNode = {
    id: "number",
    type: "Wait",
    position: {
        x: 0,
        y: 0,
    },
    time: "number",
  };
  const waitNodeFormat = JSON.stringify(waitNode);
  let waitPrompt = "A node of type 'Wait' has the format " + waitNodeFormat + ". "
  waitPrompt += "The 'Wait' node awlays connects to 1 other node. "
  waitPrompt += "The 'Wait' node can connect to nodes of type: 'Send Message' and 'Randomize' "
  waitPrompt += "The 'time' value is a number, which is a wait time in milliseconds"
  waitPrompt += "\n\n"
  return waitPrompt;
}

function getGoodExample() {
  const flow = {
    nodes: [{
      id: 1,
      type: "Start",
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: 2,
      type: "Send Message",
      position: {
        x: 100,
        y: 50,
      },
      message: "Hi, I'd love to learn more about how your experience has been",
    },
    {
      id: 3,
      type: "Randomize",
      position: {
          x: 200,
          y: 50,
      },
      probabilityOne: .25,
      probabilityTwo: .75,
    },
      {
        id: 4,
        type: "Wait",
        position: {
            x: 300,
            y: 0,
        },
        time: 500,
      }
	],
	connections: [
      {
        id: 1,
        node1: 1,
        node2: 2,
      },
      {
        id: 2,
        node1: 2,
        node2: 3,
      },
	]
  }

  let goodExample = "Here is an example of one valid flow chart: " + JSON.stringify(flow);
  goodExample += "\n\n";
  return goodExample;
}

function getGoodExampleTwo() {
    const flow = {
    nodes: [{
      id: 1,
      type: "Start",
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: 2,
      type: "Randomize",
      position: {
        x: 100,
        y: 0,
      },
      probabilityOne: .5,
      probabilityTwo: .5,
    },
    {
      id: 3,
      type: "Send Message",
      position: {
        x: 200,
        y: 0,
      },
      message: "Message One",
    },
    {
      id: 4,
      type: "Send Message",
      position: {
        x: 200,
        y: 100,
      },
      message: "Message Two",
    },
	],
	connections: [
      {
        id: 1,
        node1: 1,
        node2: 2,
      },
      {
        id: 2,
        node1: 2,
        node2: 3,
      },
      {
        id: 3,
        node1: 2,
        node2: 4,
      },
	]
  }

  let goodExample = "Here is an example of one valid flow chart: " + JSON.stringify(flow);
  goodExample += "\n\n";
  return goodExample;
}
```

### Update our AI model
For this example, we are prioritizing accuracy over price. Let's change our AI model from the default `GPT 3.5` to `GPT 4`. Click `Manage` on the top right of the Action page. Navigate to the `JSON` tab and click on the `AI Model` dropdown. Select `GPT 4` and click `Save`

<img width="1675" alt="Screenshot 2024-04-13 at 5 11 06 PM" src="https://github.com/jixi-ai/jixi-flowchart-demo/assets/2688048/9d70e932-1f15-45da-9044-aa20f21bb825">

### Test the generator
Click `Test` in the top right. Navigate to the `User Input` tab. Here, we will enter the request that will eventually come from our client application. Replace the code with:
```json
{
  "request": "Send a message that says 'Hello from Jixi'"
}
```

<img width="1672" alt="Screenshot 2024-04-13 at 5 10 48 PM" src="https://github.com/jixi-ai/jixi-flowchart-demo/assets/2688048/5f24d395-dd02-442d-9af6-14a0c6627d4a">

### Run the test
Click `Run` to test the flowchart generator. Navigate to `Results` and see the response.

<img width="1673" alt="Screenshot 2024-04-13 at 5 15 34 PM" src="https://github.com/jixi-ai/jixi-flowchart-demo/assets/2688048/190e97ee-e29f-4cbe-bd32-77975b24cf2f">

### Create an API key
On the sidebar, navigate to `API Keys` and click `New API Key`. Give the key a name (ex: `My API Key`) and click `Create`. **You will not be able to view your API key again** so make sure to save it to a safe location.

### Copy the Action URL and API Key to the client application
We highly recommend using a more secure method of storing your API key in `App.tsx` than the provided
```javascript
function App() {
    const JIXI_API_KEY = 'YOUR_API_KEY';
    const JIXI_URL = 'YOUR_ACTION_URL';
```

## Support 
For any questions or technical support, please join us on [Discord](https://discord.gg/CQW9Sa994U)
