import Web3 from "web3";
import { useState, useEffect } from "react";
import axios from "axios";
import { UpdateTodo } from "./updateTodo";
import { CreateTodo } from "./createTodo";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Analytics } from "./analytics";
import { useRef } from "react";
<<<<<<< HEAD

// Set up Web3 and the contract
const web3 = new Web3("https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID");
const contractAddress = "0xa6Eb71E0E97aCdDcBB4F083774a164F7Ab37D9B0";
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
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
    "inputs": [],
    "name": "addTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const taskContract = new web3.eth.Contract(contractABI, contractAddress);
=======
import { sha256 } from "js-sha256";
import NavBar from "./navbar";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from '../config'
import Chatbot from "./chatbot";
// Set up Web3 and the contract
const web3 = new Web3("http://127.0.0.1:7545");


const taskContract = new web3.eth.Contract( TODO_LIST_ABI, TODO_LIST_ADDRESS);
>>>>>>> 84f2da2 (added ai and blockchain)

function TodoCard({ data, handleEdit, handleDelete, handleComplete }) {
  const { _id, title, description, completed } = data;

  return (
    <li
      key={_id}
      className={`bg-blue-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start ${
        completed ? "line-through  bg-green-500" : ""
      }`}
    >
      <div className="text-lg flex flex-rows-4 font-semibold items-center w-full">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleComplete(_id, !completed)}
          className="p-4 mr-4"
        />
        <div className="flex flex-col">
          <h3
            className={`flex items-center text-lg font-semibold ${
              completed ? "line-through text-gray-500" : ""
            }`}
          >
            {title}
          </h3>
          <p className="text-sm text-gray-200">{description}</p>
        </div>
      </div>

      <div className="mt-2 flex gap-2 w-full justify-end">
        <button
          className="p-2  text-white rounded-md flex items-center gap-1"
          name={_id}
          onClick={handleEdit}
        >
          <MdEdit size={18} />
        </button>
        <button
          className="p-2  text-white rounded-md flex items-center gap-1"
          name={_id}
          onClick={handleDelete}
        >
          <MdDelete size={18} />
        </button>
      </div>
    </li>
  );
}

const ShowTodoList = () => {
  const scrollRef = useRef(null);
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);
<<<<<<< HEAD
  const [account, setAccount] = useState(""); // Account to sign transactions
=======
  const [account, setAccount] = useState(""); // Store connected wallet address
>>>>>>> 84f2da2 (added ai and blockchain)

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/todo")
<<<<<<< HEAD
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err.message));
  }, [update]);
=======
      .then((res) => {
          console.log("Fetched Todos:", res.data);
          setTodo(res.data);
      })
      .catch((err) => console.log(err.message));
}, [update, axios]);

>>>>>>> 84f2da2 (added ai and blockchain)

  function handleEdit(e) {
    setId(e.currentTarget.name);
    setOpen(true);
  }

  function handleUpdate() {
    setUpdate(!update);
  }

  function handleDelete(e) {
    const todoId = e.currentTarget.name;
<<<<<<< HEAD

=======
>>>>>>> 84f2da2 (added ai and blockchain)
    axios
      .delete(`http://localhost:3000/api/todo/${todoId}`)
      .then(() => {
        setTodo((data) => data.filter((todo) => todo._id !== todoId));
      })
      .catch((err) => console.log("Failed to delete:", err.message));
  }

  function handleComplete(todoId, completedStatus) {
    axios
      .put(`http://localhost:3000/api/todo/${todoId}`, { completed: completedStatus })
      .then(() => {
        setTodo((prevTodo) =>
          prevTodo.map((todo) =>
            todo._id === todoId ? { ...todo, completed: completedStatus } : todo
          )
        );
<<<<<<< HEAD
        // Store task hash on blockchain (optional if needed)
=======
>>>>>>> 84f2da2 (added ai and blockchain)
      })
      .catch((err) => console.log("Failed to update completion status", err.message));
  }

  function handleClose() {
    setId("");
    setOpen(false);
  }

<<<<<<< HEAD
  // Connect to Ethereum wallet (Metamask)
  const handleLogin = async () => {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
  };

  // Add task to blockchain (if needed)
  function addTaskToBlockchain() {
    taskContract.methods
      .addTask()
      .send({ from: account })
      .then((receipt) => {
        console.log("Task added to blockchain:", receipt);
      })
      .catch((err) => console.log("Failed to add task to blockchain:", err.message));
  }

  return (
    <div className="bg-gray-200 lg:grid lg:grid-cols-1 content-start gap-4">
      <section className="lg:w-[1000px] gap-12 p-4 lg:grid lg:grid-cols-2 items-center justify-between">
        {/* Connect wallet button */}
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded-md mb-4">
          Connect Wallet
        </button>
=======
  // Connect to Ethereum wallet (MetaMask)
  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]); // Store the connected wallet address
        console.log("Connected account:", accounts[0]);
      } catch (err) {
        console.error("User denied account access", err);
      }
    } else {
      console.log("MetaMask not detected!");
    }
  };

  const generateTaskHash = (taskContent) => {
    return web3.utils.keccak256(taskContent);
};

  // Add task to blockchain (if needed)
  const addTaskToBlockchain = async (taskContent) => {
    if (!account) {
      console.log("Wallet not connected");
      return;
    }
  
    const taskHash = generateTaskHash(taskContent);
  
    try {
      const receipt = await taskContract.methods
        .addTask(taskContent, taskHash)
        .send({ from: account })
         .on("receipt", console.log);

      console.log("Task added to blockchain:", receipt);
    } catch (err) {
      console.log("Failed to add task to blockchain:", err.message);
    }
  };

  const verifyTaskHash = async (taskId, taskContent, isChecked) => {
    // If the checkbox is unchecked, return immediately
    if (!isChecked) return;

    console.log("Inside verifyTaskHash - Received taskId:", taskId, "Type:", typeof taskId);

    taskId = Number(taskId);
    if (isNaN(taskId)) {
      console.log("Invalid taskId, must be a number");
      return;
    }

    const taskHash = generateTaskHash(taskContent);
    try {
      const isValid = await taskContract.methods.verifyTask(taskId, taskHash).call();
      console.log(isValid ? "Task is verified" : "Task verification failed");
    } catch (error) {
      console.log("Failed to verify task hash:", error.message);
    }
};

  
  
  

  return (
    <div className="bg-gray-200 lg:grid lg:grid-cols-1 content-start gap-4">
      <NavBar handleLogin={handleLogin} account={account} />
      <section className="lg:w-[1000px] gap-12 p-4 lg:grid lg:grid-cols-2 items-center justify-between">
        
        {/* Connect Wallet Button */}
      

        {/* CreateTodo Component (Visible Only When Wallet is Connected) */}
        {account && <CreateTodo addTaskToBlockchain={addTaskToBlockchain}/>}
>>>>>>> 84f2da2 (added ai and blockchain)

        {/* Todo List Section */}
        <section
          ref={scrollRef}
          className="bg-white p-6 rounded-lg mr-10 lg:w-[950px] shadow-lg flex flex-col justify-start items-start"
          style={{
            overflowY: "auto",
<<<<<<< HEAD
            maxHeight: "calc(80vh - 120px)", // Adjust this value based on your layout
=======
            maxHeight: "calc(80vh - 120px)",
>>>>>>> 84f2da2 (added ai and blockchain)
          }}
        >
          <p className="font-semibold text-2xl text-black mb-4">TODO List</p>
          <ul className="space-y-4 w-full">
            {todo.map((data) => (
              <TodoCard
                key={data._id}
                data={data}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
              />
            ))}
          </ul>
<<<<<<< HEAD
=======
          <div className="absolute overflow-auto"> <Chatbot /></div>
>>>>>>> 84f2da2 (added ai and blockchain)
        </section>

        {/* Analytics Section */}
        <section className="flex items-center justify-center">
<<<<<<< HEAD
          <Analytics />
=======
        <Analytics
  todo={todo}
  verifyTaskHash={verifyTaskHash} // Directly pass the function reference
/>

>>>>>>> 84f2da2 (added ai and blockchain)
        </section>

        {/* Update Todo Modal */}
        {open && (
          <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 flex flex-col items-center">
              <p onClick={handleClose} className="absolute top-2 right-4 text-xl cursor-pointer">
                &times;
              </p>
              <UpdateTodo _id={id} handleClose={handleClose} handleUpdate={handleUpdate} />
            </div>
          </section>
        )}
      </section>
<<<<<<< HEAD
=======
     
>>>>>>> 84f2da2 (added ai and blockchain)
    </div>
  );
};

export default ShowTodoList;
<<<<<<< HEAD
=======

>>>>>>> 84f2da2 (added ai and blockchain)
