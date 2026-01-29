# AI Rules for Blog App

This document outlines the core technologies and library usage guidelines for the Blog App. Adhering to these rules ensures consistency, maintainability, and leverages the strengths of the chosen tech stack.

## Tech Stack Overview

The Blog App is built with a modern web development stack, focusing on performance, developer experience, and scalability:

*   **React 18:** The primary JavaScript library for building user interfaces.
*   **TypeScript:** Provides type safety and improves code quality and maintainability.
*   **Vite:** A fast build tool and development server for a quick development cycle.
*   **Tailwind CSS:** A utility-first CSS framework for rapid and consistent styling, emphasizing responsive design.
*   **shadcn/ui & Radix UI:** A collection of beautifully designed, accessible, and customizable UI components built on Radix UI and styled with Tailwind CSS.
*   **React Router DOM:** For declarative routing within the application.
*   **Axios:** A promise-based HTTP client for making API requests.
*   **@react-oauth/google:** Facilitates Google Sign-In for user authentication.
*   **date-fns:** A comprehensive utility library for date manipulation and formatting.
*   **Lucide React:** A library providing a set of beautiful and customizable SVG icons.
*   **React Context:** Used for global state management across the application.
*   **React Hook Form & Zod:** For efficient form management and schema-based validation.

## Library Usage Guidelines

To maintain a consistent and efficient codebase, please follow these guidelines when developing new features or modifying existing ones:

*   **Styling:**
    *   **New Components:** Always use Tailwind CSS classes for styling. Prioritize responsive design principles.
    *   **Existing Styled Components:** The project currently uses `styled-components` for some existing components. For new components or significant refactors, transition to Tailwind CSS and `shadcn/ui`. Avoid adding new `styled-components` files.
*   **UI Components:**
    *   Utilize `shadcn/ui` components whenever possible. These components are pre-installed and styled to match the application's design system.
    *   If a specific `shadcn/ui` component does not meet the requirements, create a new component using Tailwind CSS.
*   **Routing:**
    *   All application routing should be handled using `react-router-dom`.
    *   Keep route definitions centralized in `src/router/AppRouter.tsx`.
*   **API Requests:**
    *   Use the existing `axiosInstance` located in `src/api/axiosInstance.ts` for all HTTP requests to the DummyAPI.
*   **State Management:**
    *   Continue to use React Context (`src/context`) for managing global application state.
*   **Authentication:**
    *   For Google Sign-In functionality, use the `@react-oauth/google` library.
*   **Date Handling:**
    *   All date formatting, parsing, and manipulation should be done using `date-fns`.
*   **Icons:**
    *   Integrate icons using the `lucide-react` library.
*   **Forms:**
    *   Implement forms using `react-hook-form` for efficient state management and validation.
    *   Use `zod` for defining and validating form schemas.
*   **Toasts/Notifications:**
    *   For displaying transient notifications or messages to the user, use the `shadcn/ui` toast system (via the `useToast` hook and `Toaster` component).