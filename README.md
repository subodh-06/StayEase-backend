# StayEase Backend  

## 🚀 Overview  
StayEase is a hotel booking platform that provides authentication, hotel listings, room booking, AI-based recommendations, and a review system.  

---

## 📂 Project Structure  

```
StayEase-backend/
├── src/
│   ├── config/            # Database & cloud configurations
│   ├── controllers/       # API controllers (business logic)
│   ├── middleware/        # Auth & other middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API route handlers
│   ├── utils/             # Utility functions
│   ├── server.js          # Express server entry point
├── .env                   # Environment variables (not committed)
├── .gitignore             # Ignore unnecessary files
├── package.json           # Project dependencies
├── README.md              # Project documentation
```

---

## 🛠️ Backend Setup  

### 1️⃣ Install Dependencies  
Ensure you have **Node.js 18+** installed, then run:  

```sh
pnpm install
```

### 2️⃣ Configure Environment Variables  
Create a `.env` file in the root directory and add:  

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3️⃣ Start the Server  
```sh
pnpm run dev
```

> The backend runs on **http://localhost:5000** by default.

---

## 🔌 API Documentation  

### Authentication (`/api/auth`)
| Method | Endpoint     | Description       | Body Params |
|--------|-------------|-------------------|-------------|
| POST   | `/register` | Register a user   | `{name, email, password, role}` |
| POST   | `/login`    | Login a user      | `{email, password}` |

### Hotels (`/api/hotels`)
| Method | Endpoint                 | Description                   | Body Params |
|--------|--------------------------|-------------------------------|-------------|
| GET    | `/`                      | Get all hotels                | - |
| GET    | `/:id`                   | Get hotel by ID               | - |
| POST   | `/`                      | Add a new hotel (Admin only)  | `{name, location, price}` |
| PUT    | `/:id`                   | Update hotel info (Admin)     | `{name, location, price}` |
| DELETE | `/:id`                   | Delete a hotel (Admin)        | - |

### Reviews & Ratings (`/api/hotels/:hotelId/reviews`)
| Method | Endpoint                  | Description              | Body Params |
|--------|---------------------------|--------------------------|-------------|
| POST   | `/:hotelId/review`        | Add a review             | `{rating, comment}` |
| GET    | `/:hotelId/reviews`       | Get all reviews for hotel | - |

### Bookings (`/api/bookings`)
| Method | Endpoint           | Description               | Body Params |
|--------|--------------------|---------------------------|-------------|
| GET    | `/`               | Get user’s bookings       | - |
| POST   | `/`               | Create a new booking      | `{hotelId, roomId, checkIn, checkOut}` |
| DELETE | `/:bookingId`     | Cancel a booking         | - |

---

## 🖥️ Frontend Integration  

### 🔑 Authentication Example (React)
```js
const login = async (email, password) => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  localStorage.setItem("token", data.token);
};
```

### 🏨 Fetching Hotels
```js
const fetchHotels = async () => {
  const res = await fetch("http://localhost:5000/api/hotels");
  const data = await res.json();
  return data;
};
```

### ⭐ Adding a Review
```js
const addReview = async (hotelId, rating, comment) => {
  const res = await fetch(`http://localhost:5000/api/hotels/${hotelId}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ rating, comment }),
  });
  return res.json();
};
```

---

## 🔧 Troubleshooting  

### 1️⃣ Database Not Connecting?  
- Ensure **MongoDB is running** (`MONGO_URI` in `.env` should be correct).  
- Restart server:  
  ```sh
  pnpm run dev
  ```

### 2️⃣ Getting `401 Unauthorized`?  
- Ensure you're **sending the JWT token** in the request headers.  
- Try logging in again.

### 3️⃣ Cloudinary Not Working?  
- Check if Cloudinary API keys are correct in `.env`.  
- Verify if images are uploaded manually via Cloudinary UI.

---

## 🤝 Contribution  
1. Fork the repo  
2. Create a new branch: `git checkout -b feature-name`  
3. Commit changes: `git commit -m "Added new feature"`  
4. Push to branch: `git push origin feature-name`  
5. Open a PR 🎉  

---

## 📜 License  
MIT License. Feel free to use and modify! 🚀  
