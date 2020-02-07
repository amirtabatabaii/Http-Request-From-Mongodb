const express = require("express");
const router = express.Router();
const ToDoList = require("../models/toDoList");

// Getting All
router.get("/", async (req, res) => {
    try {
        const toDoList = await ToDoList.find();
        res.json(toDoList);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Getting One
router.get("/:id", getToDoList, (req, res) => {
    res.send(res.toDoList);
});

// Creating One
router.post("/", async (req, res) => {
    const toDoList = new ToDoList({
        Title: req.body.Title,
        Date: req.body.Date,
        IsDone: req.body.IsDone,
        Description: req.body.Description,
        PriorityType: req.body.PriorityType
    });

    try {
        const newToDoList = await toDoList.save();
        res.status(201).json(newToDoList);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Updating One
router.patch("/:id", getToDoList, async (req, res) => {
    if (req.body.Title != null) {
        res.toDoList.Title = req.body.Title;
    }
    if (req.body.Date != null) {
        res.toDoList.Date = req.body.Date;
    }
    if (req.body.IsDone != null) {
        res.toDoList.IsDone = req.body.IsDone;
    }
    if (req.body.Description != null) {
        res.toDoList.Description = req.body.Description;
    }
    if (req.body.PriorityType != null) {
        res.toDoList.PriorityType = req.body.PriorityType;
    }
    try {
        const updateToDoLst = await res.toDoList.save();
        res.json(updateToDoLst);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Deleting One
router.delete("/:id", getToDoList, async (req, res) => {
    try {
        await res.toDoList.remove();
        res.json({
            message: "Deleted ToDoList..."
        });
    } catch (err) {
        err.status(500).json({
            message: err.message
        });
    }
});

async function getToDoList(req, res, next) {
    let toDoList;
    try {
        toDoList = await ToDoList.findById(req.params.id);
        if (toDoList == null) {
            return res.status(404).json({
                message: "Cannot Find toDoList...!"
            });
        }
    } catch {
        return res.status(500).json({
            message: err.message
        });
    }

    res.toDoList = toDoList;
    next();
}

module.exports = router;