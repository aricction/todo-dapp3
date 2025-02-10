// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;

    }

    // Mapping to store tasks by their ID
    mapping(uint => Task) public tasks;

        string taskHash;
    }
    
    // Event to log task details when added
    event TaskAdded(uint id, string content, bool completed, string taskHash);


    // Event to notify when a task is completed
    event TaskCompleted(uint id, bool completed);


    // Constructor to initialize taskCount
    constructor() {
        taskCount = 0;
    }

    // Function to add a task
    function addTask(string memory _content) public {
        taskCount++; // Increment task count
        tasks[taskCount] = Task(taskCount, _content, false); // Add new task with initial content and 'completed' false

    // Mapping to store tasks by their ID
    mapping(uint => Task) public tasks;

    // Function to add a task
    function addTask(string memory _content, string memory _taskHash) public {
        taskCount++; // Increment task count
        tasks[taskCount] = Task(taskCount, _content, false, _taskHash); // Store task in mapping
        emit TaskAdded(taskCount, _content, false, _taskHash);

    }

    // Function to toggle the completion of a task
    function toggleCompleted(uint _id) public {

        Task storage _task = tasks[_id]; // Get task from storage (not memory)
        _task.completed = !_task.completed; // Toggle the completed status
        emit TaskCompleted(_id, _task.completed); // Emit event
    }

        require(_id > 0 && _id <= taskCount, "Task ID is out of range"); // Ensure valid task ID
        Task storage _task = tasks[_id]; // Get task from storage
        _task.completed = !_task.completed; // Toggle the completed status
        emit TaskCompleted(_id, _task.completed); // Emit event
    }
    
    // Verify task hash
    function verifyTask(uint256 taskId, string memory taskHash) public view returns (bool) {
        require(taskId > 0 && taskId <= taskCount, "Task ID is invalid"); // Ensure valid task ID
        string memory storedHash = tasks[taskId].taskHash; // Get task's stored hash from the mapping
        return keccak256(abi.encodePacked(storedHash)) == keccak256(abi.encodePacked(taskHash)); // Compare the hashes
    }

    // Get task by ID
    function getTask(uint _taskId) public view returns (string memory, bool, string memory) {
        require(_taskId > 0 && _taskId <= taskCount, "Invalid task ID"); // Ensure valid task ID
        Task memory task = tasks[_taskId];
        return (task.content, task.completed, task.taskHash);
    }

}
