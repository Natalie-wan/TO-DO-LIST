// src/mockTasks.js

export const mockTasks = [
    { 
        "id": 6, 
        "title": "Complete JavaScript project", 
        "category": "Work", 
        "priority": "High", 
        "dueDate": "2025-01-28" 
    },
    {
        "id": 7,
        "title": "Read a new book",
        "category": "Leisure",
        "priority": "Low",
        "dueDate": "2025-02-05"
    },
    {
        "id": 8,
        "title": "Attend team meeting",
        "category": "Work",
        "priority": "Medium",
        "dueDate": "2025-01-30"
    },
    {
        "id": 9,
        "title": "Meal prep for the week",
        "category": "Health",
        "priority": "Medium",
        "dueDate": "2025-02-01"
    },
    {
        "id": 10,
        "title": "Car maintenance appointment",
        "category": "Personal",
        "priority": "High",
        "dueDate": "2025-02-03"
    }
];

// Get unique categories from the tasks
export const mockCategories = [...new Set(mockTasks.map(task => task.category))];