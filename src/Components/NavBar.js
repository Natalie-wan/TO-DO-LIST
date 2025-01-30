import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    // Inline styles for NavBar
    const styles = {
        nav: {
            display: "flex",
            justifyContent: "space-around",
            padding: "15px",
            backgroundColor: "#007bff",
            color: "white",
        },
        link: {
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "bold",
        }
    };

    return (
        <nav style={styles.nav}>
            <Link to="/tasks" style={styles.link}>Tasks</Link>
            <Link to="/add-task" style={styles.link}>Add Task</Link>
            <Link to="/categories" style={styles.link}>Categories</Link>
        </nav>
    );
}

export default NavBar;
