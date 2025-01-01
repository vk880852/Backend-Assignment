import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// To create the Task
const createTask = asyncHandler(async (req, res) => {
    const { title, description,status } = req.body;

    if (!title?.trim() || !description?.trim()) {
        throw new ApiError(400, "Both title and description are required");
    }

    const task = await Task.create({ title, description,status });

    return res.status(201).json(new ApiResponse(201, "Task created successfully", task));
});

// get all task with pagination and sorting 
const getAllTasks = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || pageNum <= 0) {
        throw new ApiError(400, "Invalid page number");
    }

    if (isNaN(limitNum) || limitNum <= 0) {
        throw new ApiError(400, "Invalid limit number");
    }

    const sortOptions = {};
    if (sortBy && ["createdAt", "title", "description", "status"].includes(sortBy)) {
        sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
    } else {
        sortOptions["createdAt"] = -1;  
    }

    const tasks = await Task.find()
        .skip((pageNum - 1) * limitNum)   
        .limit(limitNum)                 
        .sort(sortOptions);             

    const totalTasks = await Task.countDocuments();

    res.status(200).json(new ApiResponse(200, "Tasks retrieved successfully", {
        tasks,
        pagination: {
            total: totalTasks,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(totalTasks / limitNum)
        }
    }));
});

// to get a single task 
const getTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, "Task retrieved successfully", task));
});

//To update The task
const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findById(id);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    if (!title && !description && !status) {
        throw new ApiError(400, "At least one field (title, description, or category) is required");
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await task.save();

    return res.status(200).json(new ApiResponse(200, "Updated successfully", task));
});

//To delete Task
const deleteTask = asyncHandler(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    await task.deleteOne();

    return res.status(200).json(new ApiResponse(200, "Task deleted successfully", task));
});


export  {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getAllTasks,
};
