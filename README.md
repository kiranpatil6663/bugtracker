# Bug/Task Tracker

This is a bug and task tracker application built with React.js and Tailwind CSS. It is a full-stack project designed to help developers and managers efficiently track and manage tasks, bugs, and time spent on projects.

---

### Project Objective

The primary goal of this project is to create a functional, role-based bug/task tracker interface. It demonstrates key frontend development skills, including state management, component-based architecture, and routing, while adhering to modern UI/UX principles.

---

### Key Features

* **Role-Based Authentication**: A mock login system allows users to log in as either a `Manager` or a `Developer`, with different functionalities for each role.
* **Dynamic Dashboard**:
    * **Managers** have a central dashboard that provides a comprehensive, unfiltered view of all tasks.
    * **Developers** have a dedicated "My Tasks" page that shows only the tasks assigned to them, allowing for a focused workflow.
* **Task Creation & Management**:
    * Both managers and developers can **create new tasks** with fields for title, description, priority, assignee, and due date.
    * Developers can **edit**, **delete**, and update the status of their assigned tasks.
* **Bug Resolution Workflow**: A clear process for closing bugs has been implemented:
    1.  A developer marks a bug as **`"Pending Approval"`**.
    2.  A manager can then either **`"Approve"`** it (closing the bug) or **`"Re-open"`** it.
* **Time Tracking**: A time tracker feature allows developers to log the time spent on each task.
* **Manager Reports**: A dedicated reports page for managers shows key metrics, including:
    * A table and bar chart of **total time spent by each developer**.
    * A line graph illustrating the **trend of open and closed tasks** over time.

---

### How to Run Locally

To get this project running on your machine, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/your-repo.git](https://github.com/your-username/your-repo.git)
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd your-repo
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:5173/`.

---

### User Credentials

You can use the following credentials to test the application's different roles:

* **Manager**: `manager@test.com` / `1234`
* **Developer 1**: `dev1@test.com` / `1234`
* **Developer 2**: `dev2@test.com` / `1234`
* **Developer 3**: `dev3@test.com` / `1234`

---

### Areas to Highlight

* **Separation of Concerns**: The project uses a clear component-based structure where different functionalities (e.g., `Navbar`, `TaskList`, `ManagerReport`) are isolated into their own files.
* **State Management**: `localStorage` is used for mock data persistence, while `useState` and `useContext` are effectively used to manage the application's state.
* **Responsive UI**: The entire application is built with **Tailwind CSS**, making it fully responsive and visually consistent across all screen sizes without needing custom CSS.
* **Routing Logic**: `React Router` is used to create protected routes and a clean navigation flow, ensuring a professional user experience.