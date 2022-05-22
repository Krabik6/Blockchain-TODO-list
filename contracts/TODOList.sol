// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract TODOList {

    struct Task {
    uint id;
    string description;
    bool completed;
  }
    uint256 private todoCount = 0;
    mapping(uint => Task) public tasks;

    constructor(string memory _description) {
        if(keccak256(abi.encodePacked(_description)) != keccak256(abi.encodePacked(""))) {
        setTask(_description);
        }
    }

    function setTask(string memory _description) public {
        todoCount ++;
        tasks[todoCount] = Task(todoCount, _description, false);
        emit TaskCreated(todoCount, _description, false);
    } 

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }

    event TaskCreated(
    uint id,
    string description,
    bool completed
  );

     event TaskCompleted(
        uint id,
        bool completed
     );
    
}