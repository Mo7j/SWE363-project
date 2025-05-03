#  KFUPM Roommate Finder

KFUPM Roommate Finder is a web application designed to help KFUPM students find compatible roommates efficiently and securely.
Instead of relying on random social media or WhatsApp groups, this platform allows students to filter search results based on preferences, communicate directly within the website, and use portal integration for authentication.
The app solves key issues such as lack of organized roommate matching, limited information sharing, and time-consuming manual searches.
This solution benefits both students and the university by making the roommate arrangement process smoother, faster, and more reliable.

---

## Setup & Installation

### Prerequisites
- Node.js 
- npm 

Install dependencies
- npm install
- npm install firebase 
- npm install web-vitals
 


### Steps

1. **Clone the repository**
   git clone https://github.com/Mo7j/SWE363-project.git
   cd SWE363-project
2. **Set up environment variables**
   -Create a .env file in the project root and add the following:
   REACT_APP_FIREBASE_API_KEY=AIzaSyA0extQQvS3O7k1gKV_FpyY4zSvN4ked5I
REACT_APP_FIREBASE_AUTH_DOMAIN=kfupm-roommate.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=kfupm-roommate
REACT_APP_FIREBASE_STORAGE_BUCKET=kfupm-roommate.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=827965945048
REACT_APP_FIREBASE_APP_ID=1:827965945048:web:4fa4ae972a3bf66a5e53

## 📦 Usage Instructions & Examples

1. **Sign up or log in as a user**
   - You can use any email and password to create an account.

2. **Sign in as Admin**
   - Use the following credentials: the admin use 
     - **ID**: `s2000@kfupm.edu.sa`
     - **Password**: `Mohammed2@`

3. **Browse roommate requests**
   - View all the available roommate listings posted by other students.

4. **Send and receive requests**
   - You can send roommate requests to others and receive incoming requests.

5. **Chat with students**
   - Communicate directly with other students through the built-in chat system.

6. **Start using the platform**
   - Visit: [http://localhost:3000](http://localhost:3000)
   - Register as a student and start browsing available roommate requests.
   - Sign in as an admin or student
## Back-End Overview
The back-end of this project is powered by Firebase services, including:
   -Firebase Authentication for user login 
   -Cloud Firestore for storing roommate requests and user data



## API Documentation
| Endpoint              | Method | Description                    | Request Body                  | Response                      |
| --------------------- | ------ | ------------------------------ | ----------------------------- | ----------------------------- |
| `/api/users/register` | POST   | Register a new user            | `{ email, password, ... }`    | `201 Created` / `400 Error`   |
| `/api/users/login`    | POST   | Login existing user            | `{ email, password }`         | `200 OK` / `401 Unauthorized` |
| `/api/requests/`      | GET    | Get all roommate requests      | None                          | `200 OK`                      |
| `/api/requests/`      | POST   | Create a new roommate request  | `{ title, description, ... }` | `201 Created`                 |
| `/api/interests/:id`  | POST   | Express interest in a roommate | `{ userId, message }`         | `200 OK`                      |


## 👥 Team Members & Roles

- **THAMIR ABDULLAH AL ORFI AL JOHANI** — Implemented Signup, Login, Admin Page, Role Selection, and Admin Login , and deployed the web application
- **ALGHAMDI, TURKI ABDULLAH** — Developed the Chatting Page
- **MOHAMMED FAHAD ALAJMI** — Implemented Website Settings and Profile Settings Page, filtering criteria,manage user accounts , post system announcements , monitor chat interactions


- **ABDULRAHMAN AHMED ALTARIQI** — Built the Roommate Request Form and University Redirect Page
- **MOHAMED NASER HEJAZI** — Created the Search Request, My Requests, and Not Found pages, and modified errors in the main repository, designed the database on Firebase, implemented the functionality to add user inputs to the Firestore database.

                                        


