import axios from "axios";
import React, { useEffect, useState } from "react";
const Archived = () => {
	const [archivedTasks, setArchivedTasks] = useState([]);
	const fetchArchivedTasks = async () => {
		try {
			const res = await axios.get("http://localhost:3000/archive");
			setArchivedTasks(res.data);
		} catch (error) {
			console.log("Error fetching archived tasks:", error);
		}
	};
	useEffect(() => {
		fetchArchivedTasks();
	}, []);
	const deleteTask = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/archive/${id}`);
		} catch (error) {
			console.log("error deleting task: ", error);
		}
	};
	return (
		<div>
			<div>
				<h2>Archived Tasks</h2>
				<ul>
					{archivedTasks.map((task) => (
						<div key={task.id}>
							<li>{task.task}</li>
							<button onClick={() => deleteTask(task.id)}>delete</button>
						</div>
					))}
				</ul>
			</div>
		</div>
	);
};
export default Archived;
