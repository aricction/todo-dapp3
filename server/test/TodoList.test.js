const TodoList = artifacts.require("./TodoList.sol");

contract('TodoList', (accounts) => {
    let todoList;

    before(async () => {
        todoList = await TodoList.deployed();
    });

    it('should add a task', async () => {
        await todoList.addTask("My first task");
        const task = await todoList.tasks(1);
        assert.equal(task.content, "My first task");
        assert.equal(task.completed, false);
    });

    it('should toggle task completion', async () => {
        const result = await todoList.toggleCompleted(1);
        const task = await todoList.tasks(1);
        assert.equal(task.completed, true);

        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 1);
        assert.equal(event.completed, true);
    });
});
