# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# User Management App

This is a simple **User Management Application** built using **React.js**. It allows users to log in, view a list of users, and edit user details. The application fetches and updates user data using the [Reqres API](https://reqres.in/).

## Features

- **User Authentication**: Login using email and password.
- **User Listing**: Fetch and display a list of users.
- **Edit User**: Update user details.
- **Fully Responsive**: Optimized for all screen sizes using @media queries.
- **Deployment**: Hosted on GitHub Pages/Vercel/Netlify (mention your hosting service).

## Tech Stack

- **Frontend**: React.js, JavaScript, CSS
- **API**: Reqres API (for mock user data)
- **Routing**: React Router
- **State Management**: useState, useEffect
- **Deployment**: GitHub Pages/Vercel/Netlify

## Installation & Setup

### Prerequisites
- Node.js and npm installed
- Git installed

### Clone the Repository
```sh
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### Install Dependencies
```sh
npm install
```

### Start the Development Server
```sh
npm run dev
```
The app will be available at `http://localhost:5173/` (Vite default port).

## Deployment
This project is pre-deployed. If you make changes, push them using:
```sh
git add .
git commit -m "Updated UI and responsiveness"
git push origin main
```
Your hosting service (GitHub Pages/Vercel/Netlify) should automatically update the deployment.

## Folder Structure
```

root-directory/
│── dist/                # Production build folder (auto-generated)
│── node_modules/        # Dependencies (auto-generated)
│── public/              # Static assets (e.g., images, favicon)
│── src/                 # Main source code
│   ├── components/      # UI components
│   │   ├── edituser/      
│   │   │   ├── index.js
│   │   │   ├── index.css
│   │   ├── userslist/
│   │   │   ├── index.js
│   │   │   ├── index.css
│   │   ├── login/
│   │   │   ├── index.js
│   │   │   ├── index.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
|__ index.html
│── package.json         # Project dependencies & scripts
│── package-lock.json    # Locks dependency versions
│── README.md            # Project documentation

```

## API Reference
- **Login**: `POST https://reqres.in/api/login`
- **Get Users**: `GET https://reqres.in/api/users?page=1`
- **Get User by ID**: `GET https://reqres.in/api/users/{id}`
- **Update User**: `PUT https://reqres.in/api/users/{id}`

## Contributing
Feel free to fork this repository and create a pull request for improvements.

## License
This project is licensed under the MIT License.

