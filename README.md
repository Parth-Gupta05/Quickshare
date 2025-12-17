Here is the complete **Frontend README.md** for QuickShare. It incorporates the project description you provided, adapted to explain the application from the user interface perspective, while matching your specific folder structure and tech stack.

***

# QuickShare Frontend

The official React-based client for **QuickShare** — a seamless, anonymous file-sharing platform.

This frontend interfaces with the QuickShare backend to provide a polished, responsive user experience. It allows users to create ephemeral "rooms," drag-and-drop files for instant upload, and download content securely without the need for mandatory registration.

## 📖 About QuickShare

QuickShare is designed to remove friction from file transfer. The application logic is split into a robust backend (Node/Redis/Cloudinary) and this modern frontend.

**Key capabilities exposed via this UI:**
*   **Ephemeral Rooms:** Users can generate temporary spaces that auto-expire (powered by backend Cron jobs).
*   **High-Performance Access:** Room data is fetched instantly (via backend Redis caching) to ensure the UI loads files without delay.
*   **Secure Storage:** Files uploaded through the drag-and-drop interface are securely stored in the cloud (Cloudinary) and stripped of metadata upon room expiration.
*   **Flexible Auth:** While the core features are anonymous, the UI includes fully integrated Login/Signup flows for users who wish to manage persistent accounts.

## 🛠 Tech Stack

**Core Framework:**
*   **React (Vite):** Fast, modern frontend tooling.
*   **React Router DOM:** For client-side routing (`/rooms`, `/join`, etc.).

**State Management:**
*   **Redux Toolkit:** Manages global application state, specifically user authentication (`authSlice`) and UI states.

**Styling & UI:**
*   **Tailwind CSS:** Utility-first CSS framework.
*   **Flowbite React:** Component library for pre-built UI elements (Modals, Navbars).
*   **Responsive Design:** Fully mobile-compatible.

## 📂 Project Structure

```text
frontend/
├── .flowbite-react/      # Flowbite theme configurations
├── public/               # Static assets (logo.png)
├── router/               # Application Routing
│   ├── loaderFunctions.js
│   └── router.js
├── src/
│   ├── assets/
│   ├── Components/       # Reusable UI Blocks
│   │   ├── FileDropZone.jsx    # Drag & Drop upload handler
│   │   ├── FilePreviewer.jsx   # Visual preview before download
│   │   ├── FileRoomCard.jsx    # Card display for files in a room
│   │   ├── GlobalSpinner.jsx   # Loading state indicator
│   │   ├── Navbar.jsx          # Main navigation & Auth status
│   │   └── RoomCodeInput.jsx   # Input for joining rooms
│   ├── pages/            # Page Views
│   │   ├── Errorpage.jsx       # 404 Handling
│   │   ├── Home.jsx            # Landing page (Create/Join options)
│   │   ├── JoinRoom.jsx        # Dedicated join interface
│   │   ├── Login.jsx           # User Auth
│   │   ├── Room.jsx            # Main Room View (Upload/Download)
│   │   └── Signup.jsx          # Registration
│   ├── redux/            # State Management
│   │   ├── features/
│   │   │   └── authSlice.js
│   │   └── store.js
│   ├── App.jsx           # Root Component
│   └── main.jsx          # Entry Point
├── .env                  # Environment Variables
├── tailwind.config.js    # Tailwind Config
└── vite.config.js        # Vite Config
```

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   The **QuickShare Backend** running locally or deployed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/quickshare-frontend.git
    cd quickshare-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```env
    # URL of your running backend
    VITE_BACKEND_URL=http://localhost:3000
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The app should now be running at `http://localhost:5173`.

## 🔌 Backend Integration Details

This frontend is strictly coupled with the QuickShare backend API:
Backend Repository: https://github.com/Parth-Gupta05/Quickshare-backend.git

*   **File Uploads:** Uses `multipart/form-data` to send files to the `/file-upload/upload` endpoint. The `FileDropZone` component handles the conversion of dropped files into form data.
*   **Authentication:** The frontend relies on **HTTP-Only Cookies**. When a user logs in via `Login.jsx`, the backend sets a secure cookie. The frontend sends `credentials: include` with every Axios request to maintain the session.
*   **Room Synchronization:** When joining a room (`Room.jsx`), the app polls the backend, which retrieves data from Redis to populate the file list instantly.

## 🤝 Contributing

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/NewFeature`).
3.  Commit your changes (`git commit -m 'Add some NewFeature'`).
4.  Push to the branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License.