import axios from "axios";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaArchive } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
const Home = () => {
	const [tasks, setTasks] = useState();
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const allTask = async () => {
		try {
			const res = await axios.get("http://localhost:3000/tasks");
			setTasks(res.data);
			console.log(res.data);
		} catch (error) {
			console.log("error fetching a tasks ", error);
		}
	};
	useEffect(() => {
		allTask();
	}, []);
	const addTask = async (values, { resetForm }) => {
		try {
			const res = await axios.post("http://localhost:3000/task", values);
			console.log("Task added:", res.data);
			resetForm();
			toast.success("Task added successfully");
			allTask();
		} catch (error) {
			console.log("error adding task ", error);
			toast.error("Error adding a task");
		}
	};
	const deleteTask = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/task/${id}`);
			toast.success("task deleted Successfully !");
			allTask();
		} catch (error) {
			console.log("error deleting task", error);
			toast.error("Error deleting task");
		}
	};
	const editTask = async (values) => {
		try {
			await axios.put(`http://localhost:3000/task/${selectedTask.id}`, values);
			closeEditModel();
			toast.success("Updated successfully");
			allTask();
		} catch (error) {
			console.log("error editing task", error);
			toast.error("Error updating task");
		}
	};
	const openEditModal = (task) => {
		setSelectedTask(task);
		setShowEditModal(true);
	};
	const closeEditModel = () => {
		setShowEditModal(false);
	};
	const initialValue = {
		task: "",
	};
	const validationSchema = Yup.object().shape({
		task: Yup.string().required(),
	});
	const archiveTask = async (id) => {
		try {
			await axios.put(`http://localhost:3000/archive/${id}`);
			toast.success("Task archived successfully");
			allTask(); // Refresh the task list
		} catch (error) {
			console.log("Error archiving task", error);
			toast.error("Error archiving task");
		}
	};
	


	return (
		<>
			<Toaster position="top-right" reverseOrder={false} />
			<div className="flex flex-col md:flex-row md:items-center justify-center p-5 z-20">
				<Formik
					initialValues={initialValue}
					onSubmit={addTask}
					validationSchema={validationSchema}
				>
					<Form>
						<Field
							type="text"
							name="task"
							className="md:w-80 w-full min-w-24 border-4 border-neutral-800	p-3 rounded-md	focus:outline-none focus:ring focus:border-blue-500"
							placeholder="task..."
						/>
						<button
							className="outline w-full md:w-auto hover:bg-teal-200 mt-2 md:ml-3  p-3 rounded-md"
							type="submit"
						>
							Add
						</button>
						<ErrorMessage
							className="text-red-600 text-center"
							name="task"
							component="p"
						/>
					</Form>
				</Formik>
			</div>
			<div className="overflow-x-auto">
				<table className="table  ">
					<thead>
						<tr className="text-center text-2xl font-sans">
							<th>Task</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{tasks &&
							tasks.map((task) => (
								<tr
									className="text-center  font-mono gochi-hand-regular hover:bg-black hover:text-white"
									key={task.id}
								>
									<td className="text-2xl"> {task.task}</td>
									<td className="flex justify-evenly font-semibold">
										<FaRegEdit
											className="text-2xl cursor-pointer"
											onClick={() => openEditModal(task)}
										/>
										<MdDelete
											className="text-2xl cursor-pointer"
											onClick={() => deleteTask(task.id)}
										/>
										<FaArchive
											className="text-2xl cursor-pointer"
											onClick={() => archiveTask(task.id)}
										/>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				{showEditModal && (
					<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 backdrop-blur-sm">
						<div className="bg-white rounded-lg shadow-lg p-6 w-96">
							<h2 className="text-lg font-medium mb-4">Edit Task</h2>
							<Formik
								initialValues={{ task: selectedTask ? selectedTask.task : "" }}
								onSubmit={editTask}
								validationSchema={validationSchema}
							>
								<Form>
									<Field
										type="text"
										name="task"
										className="mt-1 p-2 border border-gray-300 rounded-md w-full"
									/>
									<div className="flex justify-end mt-2">
										<button
											type="submit"
											className="bg-blue-500 text-white px-4 py-2 rounded-md"
										>
											Save
										</button>
										<button
											type="button"
											onClick={closeEditModel}
											className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
										>
											Cancel
										</button>
									</div>
								</Form>
							</Formik>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
export default Home;
