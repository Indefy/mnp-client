# Modern News Platform Client
 This is my React client, for my News site project for creating, viewing, and managing articles. Below you'll find a detailed overview of the technologies used, the project structure, and instructions on how to set up and run the project.
 Here you can go on a sample ive Deployed: 

 ```bash
 https://snap-news-client.onrender.com/
```

## Getting Started

### Prerequisites

Make sure you have the following installed on your development machine:

- Node.js
- npm (Node Package Manager) or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Indefy/mnp-client.git
cd mnp-client
```
1. Install the dependencies:
```bash
npm install
# or
yarn install
```

## Running the Project

To run the project locally, use the following command:
```bash
npm start 
# or
yarn start
```
This will start the development server and open the application in your default web browser.<br>

Technologies used, the project structure
===============

### API Integration
### Axios Setup

The project uses Axios for making HTTP requests. The Axios instance is configured with interceptors for logging requests and responses.

### API Functions
The project uses the api for interacting with the backend API, including fetching articles, categories, and handling search queries.

## Context and State Management

### AuthContext
The `AuthContext` provides authentication state and functions for logging in and out. It uses cookies to store the authentication token.

### DrawerContext
The `DrawerContext` manages the state of the sidebar drawer, including opening and closing it on mobile devices.

## Styling

### SCSS
The project uses SCSS for styling. The styles are organized into component-specific SCSS files and imported into the main SCSS file (`src/scss/main.scss`).

### Material-UI
Material-UI is used for UI components and styling. The theme is configured in `src/scss/base/theme.js`.

## Routing
The project uses `react-router-dom` for client-side routing. Routes are defined in the `App.jsx` file and include paths for the home page, sign-up, sign-in, article creation, article details, categories, and the user profile.

## Components

### ArticleCard
Displays a summary of an article, including the title, image, category, date, and author.

### ArticleDetails
Displays the full content of an article, along with comments and a like button.

### Articles
Displays a list of all articles.

### CategoryPage
Displays articles filtered by category.

### CreateArticle
Provides a form for creating a new article.

### Navbar
The main navigation bar, including search functionality and user authentication links.

### Sidebar
A sidebar for navigating between different categories.

### SignIn
A form for signing in.

### SignUp
A form for signing up.

### UserProfile
Displays the user's profile information and allows them to update it.

## Authentication

### SignIn and SignUp
The `SignIn` and `SignUp` components handle user authentication. Upon successful sign-in or sign-up, the user is logged in and redirected to the home page.

### AuthContext
The `AuthContext` manages the authentication state and provides functions for logging in and out. It uses cookies to store the authentication token.

## Development Notes

-   Ensure the backend API is running and accessible at the base URL specified in the environment variables.
-   The project uses React Context for managing global state (authentication and drawer state).
-   Material-UI provides a consistent and customizable UI framework.
-   SCSS is used for styling to enable nesting and other powerful CSS features.
-   Axios interceptors are configured to log requests and responses for debugging purposes.

For more detailed information about each component and functionality, refer to the code comments and documentation within the respective files.


#### Made by Adi B - 2024
