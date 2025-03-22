# Hotel Social Media Post Generator

An AI-powered tool for small hotels to create and manage professional social media posts using Canva for Teams API.

## Features

- AI-powered image and text generation for special occasions
- Seamless Canva integration with SSO
- Real-time collaboration and image locking
- Social media platform integration (Instagram, Facebook, Twitter, LinkedIn)
- Post scheduling and analytics
- User-friendly interface for non-technical users

## Tech Stack

### Frontend
- React.js
- Material-UI
- Redux for state management
- Socket.io for real-time features

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Socket.io for real-time features
- Canva for Teams API integration
- Social Media Platform APIs

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Canva for Teams API credentials
- Social Media Platform API credentials

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Backend (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CANVA_API_KEY=your_canva_api_key
CANVA_API_SECRET=your_canva_api_secret

# Frontend (.env)
REACT_APP_API_URL=your_backend_url
REACT_APP_CANVA_CLIENT_ID=your_canva_client_id
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../frontend
npm start
```

## Project Structure

```
hotel-social-media-generator/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store
│   │   └── utils/          # Utility functions
│   └── public/             # Static files
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── config/             # Configuration files
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 