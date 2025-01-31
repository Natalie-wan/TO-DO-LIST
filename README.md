
# To-Do List Application

A simple and interactive To-Do List application built with React, allowing users to manage tasks with drag-and-drop functionality. The application uses JSON Server as a mock backend to store tasks.

## Features

- Add new tasks.
- Drag and drop to reorder tasks.
- Filter tasks by category.
- Persistent storage of tasks using JSON Server.

## Technologies Used

- React
- React Router
- Axios
- JSON Server
- react-beautiful-dnd

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the Repository**:
~~~bash
git clone https://github.com/Natalie-wan/TO-DO-LIST
~~~

2. **Install Dependencies**:
   Run the following command to install all required dependencies:
~~~bash
npm install
~~~

3. **Set Up JSON Server**:
Create a `db.json` file in the root directory of your project with the following structure:
~~~bash
{
"tasks": [
{
"id": "1",
"title": "Go for Shopping",
"category": "Finance",
"priority": "High",
"dueDate": "2025-02-01"
},
{
"id": "2",
"title": "Work on the Labs",
"category": "Personal", // Corrected spelling from 'persnonal'
"priority": "Medium",
"dueDate": "2025-02-15"
},
{
"id": "3",
"title": "Submit end of year Report",
"category": "Work",
"priority": "Low",
"dueDate": "2025-03-01"
},
{
"id": "4",
"title": "Go to gym ",
"category": "Health",
"priority": "High",
"dueDate": "2025-01-31"
}
]
}
~~~

4. **Start JSON Server**:
In a new terminal window, navigate to your project directory and run:
~~~bash
json-server --watch db.json --port 3001
~~~
This will start the JSON server on port 3001.

5. **Run the React Application**:
In another terminal window, run the following command to start your React application:
~~~bash
npm start
~~~
This will open your application in the default web browser at `http://localhost:3000`.

## Usage

- **Adding Tasks**: Navigate to the add task page and fill out the form to create a new task.
- **Reordering Tasks**: Drag and drop tasks to reorder them as needed.
- **Filtering Tasks**: Use the category filter to view tasks by specific categories.

## Troubleshooting

If you encounter any issues:

1. Ensure that both the JSON server and React application are running.
2. Check for any errors in the browser console or terminal.
3. Verify that your `db.json` file is correctly formatted and accessible.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Thanks to [JSON Server] https://github.com/Natalie-wan/TO-DO-LIST for providing an easy-to-use backend solution for development purposes.

