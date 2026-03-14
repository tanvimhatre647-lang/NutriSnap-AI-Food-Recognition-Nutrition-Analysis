# NutriSnap Backend

This is the Node.js/Express backend for the NutriSnap AI Food Recognition & Nutrition Analysis application.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on default port 27017 or a valid MongoDB URI)
- A Spoonacular API Key

## Setup & Running Locally

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   The `.env` file is already created configures:
   - `PORT=5000`
   - `MONGO_URI=mongodb://localhost:27017/nutrisnap`
   - `JWT_SECRET=[Your Secret]`
   - `SPOONACULAR_API_KEY=[Your API Key]`

3. **Start the Server**
   ```bash
   node server.js
   ```
   *(Or you can use `nodemon server.js` if you have nodemon installed globally for automatic restarts during development).*

   The server will run on `http://localhost:5000`.

## API Documentation

### Auth Routes (`/api/auth`)

#### Register a New User
- **URL**: `/register`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns User ID, email, and JWT token.

#### Login
- **URL**: `/login`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns User ID, email, and JWT token.

#### Get Current User Profile
- **URL**: `/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns user details (excluding password).

#### Update Profile (Onboarding)
- **URL**: `/profile`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Any of the following fields: `name`, `age`, `gender`, `weight`, `height`, `activityLevel`, `goal`.

---

### Food Recognition Routes (`/api/food`)

#### Analyze Food from Image
- **URL**: `/analyze`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `multipart/form-data` with a `file` field containing the image.
- **Description**: Uploads an image, sends it to Spoonacular API for image analysis and nutritional guessing, saves the result to the user's scan history in MongoDB, and returns the analysis data.
- **Response Example**:
  ```json
  {
    "scanId": "65ab12...34",
    "foodName": "Pizza",
    "confidence": 95,
    "nutrition": {
      "calories": 285,
      "protein": 12,
      "carbs": 36,
      "fat": 10
      // ... vitamins and minerals
    }
  }
  ```

#### Get Scan History
- **URL**: `/history`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Returns a list of all past food scans for the authenticated user, sorted by date descending.
