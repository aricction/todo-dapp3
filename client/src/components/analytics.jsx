import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Legend);

export const Analytics = ({ todo, verifyTaskHash, handleComplete , handleCheckboxClick }) => {
    const completedTasks = todo.filter((task) => task.completed).length;
    const incompleteTasks = todo.length - completedTasks;
  
    const data = {
      labels: ["Completed", "Incomplete"],
      datasets: [
        {
          label: "Task Completion %",
          data: [completedTasks, incompleteTasks],
          backgroundColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"],
          hoverOffset: 4,
        },
      ],
    };
  
    return (
      <div className=" p-6 space-between mt-6 lg:w-[450px] lg:h-[500px] bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <Pie data={data} />
  
        {/* Task Verification Section 
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Verify Tasks</h3>
          <ul className="mt-2">
            {todo.map((task) => (
              <li key={task._id} className="flex justify-between items-center mt-2 p-2 bg-gray-100 rounded-md">
                <span>{task.title}</span>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    verifyTaskHash(task._id, task.content, e.target.checked) // Call verifyTaskHash with taskId, taskContent, and checkbox status
                  }
                  className="ml-2"
                />
              </li>
            ))}
          </ul>
        </div>*/}
      </div>
    );
  };
  

