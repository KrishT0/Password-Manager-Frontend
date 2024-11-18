# Password Manager Frontend

This is the frontend of the Password Manager application, designed to provide a secure and user-friendly interface for managing your passwords. The app integrates with the backend service to perform operations like storing, retrieving, and updating encrypted passwords.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Secure Login and Signup**: Supports authentication with secure credentials.
- **Password Storage**: Add, view, and manage stored passwords securely.
- **User-Friendly Interface**: Intuitive design for seamless navigation.
- **Search Functionality**: Quickly find stored passwords.
- **Responsive Design**: Fully optimized for mobile and desktop screens.

---

## Technologies Used

- **Frontend Framework**: ReactJs, React Router, React Hook Form, Tanstack Table
- **Styling**: Tailwind CSS, Shacdcn UI
- **Build Tool**: Vite

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/krisht0/password-manager-frontend.git
   cd password-manager-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Add the required environment variables (e.g., API endpoint, authentication keys).

   ```env
   VITE_BASE_URL=http://localhost:3001/
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Browser will open automatically at:  
   [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
password-manager-frontend/
├── public/               # Public assets (e.g., icons, images, favicon)
├── src/                  # Main source code
│   ├── api/              # API-related functions and services
│   ├── assets/           # Static files (e.g., images, fonts)
│   ├── components/       # Reusable components (e.g., UI elements, buttons)
│   │   ├── ui/           # ShadCN UI components
│   │   └── custom/       # Custom-created components
│   ├── hooks/            # Custom React hooks (shadcn components hooks)
│   ├── lib/              # Utility and helper functions
│   ├── pages/            # Pages for routing
│   │   ├── auth/         # Authentication-related pages (login, signup)
│   │   ├── dashboard/    # Dashboard and main app pages
│   │   ├── error/        # Error and fallback pages
│   │   └── home/         # Home page
│   ├── routes/           # Application routes
│   ├── App.jsx           # Main app component
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── .env                  # Environment variables
├── .gitignore            # Ignored files for Git
├── components.json       # Vite components auto-import configuration
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML entry point for Vite
├── jsconfig.json         # JavaScript configuration for paths
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Locked dependency tree
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # TailwindCSS configuration
├── vercel.json           # Deployment configuration for Vercel
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch (`feat/feature-name`):
   ```bash
   git checkout -b feat/feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feat/feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).
