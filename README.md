# Taskmaster Documentation

## Overview

**Taskmaster** is a task management application built with Next.js. It enables users to efficiently create and manage tasks in a user-friendly interface. This documentation provides a comprehensive guide on the application's architecture, setup, features, and usage.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Getting Started](#getting-started)
3. [API Setup](#api-setup)
4. [Environment Variables](#environment-variables)
5. [Application Features](#application-features)
6. [Usage](#usage)

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **ShadCN UI**: A set of components for building UI faster and more efficiently.

## Getting Started

To get started with Taskmaster, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm (Node package manager) or Yarn

### 1. Clone the Repository

First, clone the Taskmaster client repository:

```bash
git clone https://github.com/your-username/taskmaster-client.git
cd taskmaster-client
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

To start the development server, use the following command:

```bash
npm run dev
# or
yarn dev
```

Your application will be accessible at [http://localhost:3000](http://localhost:3000).

## API Setup

Before using the Taskmaster application, you need to set up the Taskmaster API. For detailed instructions on setting up the API, please refer to the [Taskmaster API README](https://github.com/hyper-dot/taskmaster-server).

## Environment Variables

In the Next.js application, you need to define the following environment variable in a `.env.local` file:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:8080
```

This variable allows the Next.js app to communicate with the Taskmaster API.

## Application Features

- User authentication (login/signup)
- Task creation and management
- Task status tracking (pending, in progress, completed)
- Responsive design for mobile and desktop

## Usage

1. **Access the Application:**
   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

2. **Authentication:**
   - Users can register and log in to access the application.
   - Use the credentials to log in and manage tasks.

3. **Task Management:**
   - Create new tasks with details like title, description, and due date.
   - Edit and delete tasks as needed.
   - Track the progress of tasks.

