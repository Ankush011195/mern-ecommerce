# 🛍️ GadgetStore — MERN E-Commerce Platform

A full-stack e-commerce web application built with the MERN stack, featuring AI-powered customer support, Google OAuth, Razorpay payments, and a complete Admin Panel.

## 🌐 Live Demo

Frontend: https://gadgetstor.netlify.app/
Backend API: https://mern-ecommerce-pg1x.onrender.com/api

## ✨ Features

### 👤 User Features
- 🔐 Register & Login (JWT Authentication)
- 🔑 Google OAuth (Sign in with Google)
- 🔒 Forgot Password (Email reset link)
- 🛒 Add to Cart & Manage Quantities
- ❤️ Wishlist — Save favourite products
- 📦 Place Orders (Cash on Delivery + Razorpay)
- 📋 My Orders — Track order status
- 👤 Profile Management (Update name, email, password)

### 🛠️ Admin Features
- 📊 Dashboard — Total users, orders, products & revenue
- 📦 Product Management — Add, Edit, Delete products
- 🛒 Order Management — View all orders, Mark as Delivered
- 👥 User Management — View & Delete users

### 🤖 AI Features
- 💬 AI Chatbot (GadgetBot) — Powered by Groq (LLaMA 3.3 70B)
- Customer support for orders, returns, shipping queries

---

## 🖥️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| Tailwind CSS | Styling |
| React Router DOM | Client-side Routing |
| Axios | API Calls |
| Firebase | Google OAuth |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Bcrypt.js | Password Hashing |
| Razorpay | Payment Gateway |
| Groq SDK | AI Chatbot |
| Nodemailer | Email Service |

### Deployment
| Service | Purpose |
|---|---|
| Netlify | Frontend Hosting |
| Render | Backend Hosting |
| MongoDB Atlas | Cloud Database |

---

## 📁 Project Structure

```
mern-ecommerce/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── Chatbot.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminProducts.jsx
│   │   │       ├── AdminOrders.jsx
│   │   │       └── AdminUsers.jsx
│   │   ├── api.js
│   │   └── firebase.js
│   └── package.json
│
└── backend/
    ├── controllers/
    │   ├── userController.js
    │   ├── orderController.js
    │   ├── productController.js
    │   └── adminController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── adminMiddleware.js
    ├── models/
    │   ├── User.js
    │   ├── Order.js
    │   └── Product.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── orderRoutes.js
    │   ├── productRoutes.js
    │   ├── adminRoutes.js
    │   ├── chatRoute.js
    │   └── paymentRoutes.js
    ├── utils/
    │   └── sendEmail.js
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Razorpay account (for payments)
- Groq API key (for chatbot)
- Firebase project (for Google OAuth)
- Gmail App Password (for emails)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GROQ_API_KEY=your_groq_api_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start frontend:
```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 🔑 Admin Access

To make a user admin:
1. Go to MongoDB Atlas → Collections → users
2. Find your user → Edit
3. Add field: `isAdmin: true`
4. Logout and login again → Admin Panel will appear in Navbar

---

## 📡 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| POST | `/api/users/google-login` | Google OAuth login |
| POST | `/api/users/forgot-password` | Send reset email |
| PUT | `/api/users/reset-password/:token` | Reset password |
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update user profile |

### Product Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |

### Order Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place new order |
| GET | `/api/orders/myorders` | Get user orders |

### Admin Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/users` | Get all users |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/orders` | Get all orders |
| PUT | `/api/admin/orders/:id/deliver` | Mark delivered |
| POST | `/api/admin/products` | Add product |
| PUT | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Delete product |

### Other Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/chat` | AI Chatbot |
| POST | `/api/payment/create-order` | Razorpay order |
| POST | `/api/payment/verify` | Verify payment |

---

## 🔒 Environment Variables

### Backend `.env`
| Variable | Description |
|---|---|
| `PORT` | Server port (5000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `RAZORPAY_KEY_ID` | Razorpay API key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret |
| `GROQ_API_KEY` | Groq API key for chatbot |
| `EMAIL_USER` | Gmail address for emails |
| `EMAIL_PASS` | Gmail App Password |
| `FRONTEND_URL` | Frontend URL for reset links |

### Frontend `.env`
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL |
| `VITE_FIREBASE_*` | Firebase configuration |

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.


## 👨‍💻 Developer

Made with ❤️ by Ankush Mehra


