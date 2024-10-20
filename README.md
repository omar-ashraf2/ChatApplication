# Dynamic and Responsive Chat Application with Data Visualization

Welcome to the Dynamic and Responsive Chat Application built with React, Material-UI, Pusher, and Vercel. This application supports real-time messaging with text, images, and file uploads, and dynamically visualizes various data types like tables directly within the chat interface.

### Deployed Version

[View Live Chat Application](https://chat-application-b9p3j8rad-omar-ashraf.vercel.app/)

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation and Setup](#installation-and-setup)
4. [File Structure](#file-structure)
5. [Usage](#usage)
6. [Deployment](#deployment)
7. [Testing](#testing)
8. [Future Improvements](#future-improvements)

## Features

- **Real-time Messaging**: Chat in real time with other users using Pusher for WebSocket-like functionality.
- **User-Friendly Interface**: A responsive chat interface with support for text, images, and file uploads.
- **Dynamic Data Visualization**: View interactive tables within the chat, images with full-screen previews, and downloadable file links.
- **Simulated Multi-User Support**: Switch between users using the user list to simulate multiple active users and conversations.
- **Accessibility**: Enhanced accessibility features with ARIA labels and roles.
- **Responsive Design**: The application adjusts fluidly to different screen sizes for a seamless experience on desktops, tablets, and mobile devices.

## Technologies Used

- **React**: For building the dynamic user interface.
- **Material-UI**: To create a responsive and visually appealing layout.
- **Pusher**: For handling real-time messaging.
- **TypeScript**: To ensure type safety and improve code quality.
- **Vercel**: For deploying the serverless backend and frontend.

## Structure

- **components/**: Contains all the React components used in the chat application.
- **hooks/**: Contains custom hooks like `usePusher` for handling real-time messaging.
- **types/**: Contains TypeScript type definitions for messages.
- **api/**: Contains serverless functions deployed via Vercel.

## Usage

### Sending Messages

1. **Text Messages**: Enter your message in the input field and click "Send" to send text messages.
2. **Image and File Uploads**: Click the file input to upload an image or file. The image will preview inline, while files will be available as download links.

### Switching Users

- Use the **User List** on the left to switch between different users. The selected user becomes the active sender for messages, simulating a multi-user environment.

### Viewing Different Data Types

- **Text**: Displayed as plain text messages.
- **Images**: Uploaded images are shown inline, and you can click on them to open them in a new tab for full-screen viewing.
- **Files**: Files appear as links that can be clicked to download.
- **Tables**: Tabular data can be dynamically rendered in the chat using custom components.


## Contributing

Feel free to submit pull requests or report issues for improvement. Contributions are welcome!

---

### Notes

- **Pusher Configuration**: Make sure your Pusher credentials are valid and set correctly in the environment file.
- **Cross-Origin Requests**: If accessing the API from a different domain, configure CORS accordingly.

This application is a demonstration of a scalable, real-time chat system with support for dynamic data visualization. I hope you enjoy using it and exploring the code!

Let me know if you have any questions or issues!
