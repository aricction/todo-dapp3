export const TODO_LIST_ADDRESS = '0xa6Eb71E0E97aCdDcBB4F083774a164F7Ab37D9B0'
export const TODO_LIST_ABI = [
    
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "completed",
              "type": "bool"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "taskHash",
              "type": "string"
            }
          ],
          "name": "TaskAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "completed",
              "type": "bool"
            }
          ],
          "name": "TaskCompleted",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "taskCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "tasks",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "completed",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "taskHash",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_content",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_taskHash",
              "type": "string"
            }
          ],
          "name": "addTask",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "toggleCompleted",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "taskHash",
              "type": "string"
            }
          ],
          "name": "verifyTask",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            }
          ],
          "name": "getTask",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
      
]