This Car Rental Booking App is a comprehensive full-stack platform that enables users to browse and book luxury vehicles while providing car owners with tools to manage their fleet and track earnings,. Built using the MERN stack, the application prioritizes a modern user experience with smooth animations and real-time image optimization,.

--------------------------------------------------------------------------------
Car Rental Booking App
Features
• Completely Animated UI: A highly engaging homepage featuring reveal animations on scroll and interactive elements powered by the Motion library,.
• Dual-Role Functionality:
    ◦ Users: Can search for cars by location/date, view detailed specifications, and track booking history.
    ◦ Owners: Access a private dashboard to list new cars, update availability, and manage booking statuses (Pending, Confirmed, Cancelled),,.
• Advanced Car Search: A functional search system that allows filtering by brand, model, category, or transmission type,.
• Secure Authentication: Features a robust login and registration system using JWT (JSON Web Tokens) and Bcrypt password encryption,.
• Image Optimization: Integration with ImageKit to automatically compress and transform car/profile images into modern formats like WebP for faster loading,.
• Financial Tracking: Owners can monitor total revenue and monthly earnings directly from their dashboard,.
Technology Stack
Component
Technologies Used
Frontend
React.js, Tailwind CSS, Motion, React Router DOM,,
Backend
Node.js, Express
Database
MongoDB, Mongoose,
Media
ImageKit (Cloud storage & optimization)
Deployment
Vercel,
Environment Variables
To run this project, you will need to set up .env files for both the client and server,.
Client (.env):
• VITE_BACKEND_URL: Your backend server address.
• VITE_CURRENCY: Preferred currency symbol (e.g., $).
Server (.env):
• MONGODB_URI: Your MongoDB connection string.
• JWT_SECRET: A secret key for token generation.
• IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT: API keys from your ImageKit dashboard.
Installation and Setup
1. Clone the Repository and open it in your code editor.
2. Frontend Setup:
3. The frontend will run on localhost:5173 by default,.
4. Backend Setup:
5. The backend will run on localhost:3000 by default,.
Deployment
The application is configured for deployment on Vercel using vercel.json configuration files in both the client and server directories to handle routing and API endpoints,.
