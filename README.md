# 🎥 Movie Challenge

**Movie Challenge** is a React and TypeScript application that allows users to explore movies using The Movie Database (TMDb) API. Users can search for movies, filter by genre, sort by popularity, and navigate through paginated results.

## 🎯 Purpose

This project aims to provide a simple and interactive interface for users to discover and explore movies. The application fetches data from the TMDb API and displays it in a user-friendly manner, allowing users to filter and sort the results based on their preferences.

## 🛠 Technologies Used

- **React** ⚛️ - A JavaScript library for building user interfaces.
- **TypeScript** ⌨️ - A superset of JavaScript that adds static typing.
- **Vite** ⚡ - A fast frontend build tool and development server.
- **Bootstrap** 🎨 - A CSS framework for responsive design.

## 📋 Features

- **Search Movies:** Users can search for movies by entering a keyword.
- **Filter by Genre:** Users can filter movies based on selected genres.
- **Sort by Popularity:** Users can sort the movie list by popularity or release date.
- **Pagination:** The app supports paginated results, allowing users to navigate through multiple pages of movies.
- **Responsive Design:** The layout adjusts seamlessly across different screen sizes.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A TMDb API key to fetch movie data.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/movie-challenge.git
    cd movie-challenge
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables:
    - Create a `.env` file in the root of the project.
    - Add your TMDb API key:
      ```plaintext
      VITE_TOKEN_API=your_tmdb_api_key
      ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open the app in your browser:
    ```plaintext
    http://localhost:5173
    ```

## 🔧 How It Works

1. **API Integration:**
    - The application fetches movie data from TMDb API using the provided API key.
    - API requests are handled by the `Services` class, which constructs the appropriate URLs based on user input.

2. **State Management:**
    - The app uses React's `useState` and `useEffect` hooks to manage state and handle side effects.

3. **User Interaction:**
    - Users can input search terms, select genres, and sort options to dynamically update the displayed movie list.

4. **Error Handling:**
    - The app includes basic error handling to manage failed API requests and display appropriate messages to users.

## 🛠️ Development Journey

- **Initial Setup:** Set up the project structure using Vite, React, and TypeScript. Configured the environment for API integration.
- **API Integration:** Developed the `Services` class to handle API requests. Implemented the necessary methods to fetch movie data based on different filters.
- **UI Components:** Created reusable components like `MovieList`, `Filter`, and `SortOptions`. Integrated Bootstrap for responsive design.
- **Testing:** Tested the application locally to ensure it works as expected before deploying.

## 🌐 Live Demo

Check out the live demo of the application https://dev-014-movie-challenge-fw-swart.vercel.app/.

## 📧 Contact

If you have any questions or feedback, feel free to reach out!

---

Made with ❤️ by Catherin Romero
