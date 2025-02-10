const express = require('express');
const router = express.Router();

<<<<<<< HEAD
=======


>>>>>>> 84f2da2 (added ai and blockchain)
const {getAllTodo, postCreateTodo, putUpdateTodo, deleteTodo} = require("../controllers/todo");
/**
 * 
 */

<<<<<<< HEAD
=======


>>>>>>> 84f2da2 (added ai and blockchain)
router.get("/", getAllTodo);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 */

router.post("/", postCreateTodo);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
router.put("/:id", putUpdateTodo);
<<<<<<< HEAD
if (!_id) {
    console.error("Error: Todo ID is undefined");
    return;
}
=======

>>>>>>> 84f2da2 (added ai and blockchain)


/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */

router.delete("/:id", deleteTodo);



module.exports = router;