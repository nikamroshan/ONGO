# ONGO - Full-Stack MERN Logistics Platform

A complete MERN stack logistics super-app with separate authentication for Fleet Owners and Drivers.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation

1. **Install Backend Dependencies**
```bash
cd server
npm install
```

2. **Install Frontend Dependencies**
```bash
cd ..
npm install
```

### Running the Application

**Terminal 1 - Start MongoDB** (if not already running)
```bash
mongod
```

**Terminal 2 - Start Backend Server**
```bash
cd server
npm run dev
```
Backend will run on: http://localhost:5000

**Terminal 3 - Start Frontend**
```bash
npm run dev
```
Frontend will run on: http://localhost:5173

## 📱 Features

### Authentication System
- **Two User Types:**
  - Fleet Owner (Full dashboard access)
  - Driver (Simplified driver app)
- **Separate Login/Register** for each user type
- **JWT-based authentication** with secure password hashing (bcrypt)

### For Fleet Owners
- Load marketplace with search and filters
- Fleet management (trucks and drivers)
- FASTag management with ₹29 platform fee
- Fuel tracking with leakage detection
- Revenue dashboard with charts

### For Drivers
- Simplified, low-literacy friendly UI
- View assigned loads
- Trip management (start/end trips)
- FASTag balance check

## 💰 Monetization

1. **₹29 per FASTag recharge** - Platform fee
2. **3% commission on loads** - Automatic calculation
3. **₹101 per driver trip** - Trip completion fee

## 🔐 Demo Credentials

### Fleet Owner
- **Email:** owner@ongo.com
- **Password:** password123

### Driver
- **Email:** driver@ongo.com
- **Password:** password123

> **Note:** You need to register these accounts first using the registration form.

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - REST API
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** + **Vite** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **Lucide React** - Icons
- **Recharts** - Data visualization

## 📁 Project Structure

```
ONGO/
├── server/                    # Backend
│   ├── models/               # MongoDB models
│   │   ├── User.js          # Fleet owner model
│   │   ├── Driver.js        # Driver model
│   │   ├── Truck.js         # Truck model
│   │   └── Load.js          # Load model
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication
│   │   ├── loads.js         # Load management
│   │   ├── trucks.js        # Truck management
│   │   └── drivers.js       # Driver management
│   ├── middleware/          # JWT middleware
│   ├── config/              # DB configuration
│   ├── .env                 # Environment variables
│   └── server.js            # Express app
│
├── src/                      # Frontend
│   ├── api/                 # Axios configuration
│   ├── screens/             # All screens
│   │   ├── LoginScreen.jsx  # Login with tabs
│   │   ├── SplashScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   └── ...
│   ├── components/          # Reusable components
│   ├── context/             # AppContext with auth
│   └── data/                # Mock data (for demo)
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register/user` - Register fleet owner
- `POST /api/auth/register/driver` - Register driver
- `POST /api/auth/login/user` - Login fleet owner
- `POST /api/auth/login/driver` - Login driver

### Loads
- `GET /api/loads` - Get all loads
- `POST /api/loads` - Create new load (fleet owner only)
- `PUT /api/loads/:id/assign` - Assign load to driver/truck
- `PUT /api/loads/:id/status` - Update load status

### Trucks
- `GET /api/trucks` - Get user's trucks
- `POST /api/trucks` - Add new truck
- `PUT /api/trucks/:id` - Update truck
- `POST /api/trucks/:id/recharge` - Recharge FASTag

### Drivers
- `GET /api/drivers` - Get all drivers (fleet owner)
- `GET /api/drivers/me` - Get driver profile (driver)
- `PUT /api/drivers/:id/status` - Update driver status

## 🗄️ Database Schema

### Users (Fleet Owners)
- name, email, password (hashed), phone, company
- role: "fleet_owner"
- trucks: [ObjectId]

### Drivers
- name, email, password (hashed), phone, license
- experience, rating, status, tripsCompleted
- assignedTruck: ObjectId
- role: "driver"

### Trucks
- owner: ObjectId (User)
- registrationNumber, type, capacity
- status, fastagBalance

### Loads
- postedBy: ObjectId (User)
- from, to, truckType, weight, product
- loadValue, commission (3%), netPayout
- status, assignedDriver, assignedTruck

## 🎯 User Flow

### Fleet Owner Flow
1. Register/Login as Fleet Owner
2. Add trucks to fleet
3. Create or browse available loads
4. Assign loads to drivers and trucks
5. Recharge FASTag (₹29 platform fee)
6. Track fuel consumption
7. View revenue dashboard

### Driver Flow
1. Register/Login as Driver
2. View assigned loads
3. Check FASTag balance
4. Start/End trips
5. View trip history

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt (10 salt rounds)
- Protected API routes with middleware
- Role-based access control
- Token expiration (30 days)
- Automatic token refresh on frontend

## 🚀 Deployment

### Environment Variables

Create `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/ongo
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
npm run build
```

## 📊 Revenue Metrics

The platform tracks three revenue streams:
- FASTag recharges: ₹29 × count
- Load commissions: 3% × load value
- Trip fees: ₹101 × trips completed

All metrics are displayed in the Revenue Dashboard with charts.

## 🎨 Design

- Mobile-first responsive design
- ONGO green branding (#22c55e)
- Professional BlackBuck-inspired UI
- Smooth animations and transitions
- Accessible driver app (large buttons, minimal text)

---

**ONGO - Moving India Forward** 🚛💚
