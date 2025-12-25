# 🗳️ SecureElect – Secure e-Voting System

SecureElect is a **full-stack secure e-voting application** built using **Spring Boot (Java)** for the backend and **React (Vite)** for the frontend.  
It enables secure authentication, role-based access (Admin/User), election management, and online voting with JWT-based security.

---

## 🚀 Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security (JWT Authentication)
- Spring Data JPA
- Hibernate
- MySQL
- Maven

### Frontend
- React (Vite)
- Axios
- React Router
- Bootstrap / React-Bootstrap

---

## Project Structure
- secureelect/
- │
- ├── backend/ # Spring Boot backend
- │ ├── src/main/java
- │ ├── src/main/resources
- │ └── pom.xml
- │
- ├── frontend/secureelect/ # React frontend (Vite)
- │ ├── src/
- │ ├── package.json
- │ └── vite.config.js


---

## ⚙️ Prerequisites (Must Be Installed)

Make sure you have the following installed **before running the project**:

- Java 21
- Maven
- Node.js (v18+ recommended)
- MySQL
- Git

---

## 🛠️ Backend Setup (Spring Boot)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/SecureElect.git
cd SecureElect/backend
```

### 2. Create MySQL Database
Login to MySQL and run:
```bash
CREATE DATABASE secureelect_db;
```

### 3. Configure application.properties

```bash
spring.datasource.url=jdbc:mysql://localhost:3306/secureelect_db
spring.datasource.username=root
spring.datasource.password=your_mysql_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=create_a_very_long_secret_key_or_else_it_won't_work
jwt.expiration=86400000
```
- Everything is important, if missing, backend will fail to start

### 4. Run Backend
```bash
mvn clean install
mvn spring-boot:run
```
- Backend runs at: (http://localhost:8080
)
- On the first run, default admin is auto-created
```bash
Email: admin@gmail.com
Password: admin123
```
--- 

## 🎨 Frontend Setup (React + Vite)

### 1. Move to frontend directory
```bash
cd ../frontend/securelect
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure API Base URL
- Ensure Axios config from (src/services/api.js) looks like this 
```bash
import axios from "axios";

const API = axios.create({
  baseURL: http://localhost:8080,
});

export default API;
```

### 4. Run Frontend
```bash
npm run dev
```
- Frontend runs at:
```bash
http://localhost:5173
```
--- 

## 🔐 Login Credentials (Local)
### Admin
```bash
Email: admin@gmail.com
Password: admin123
```
### User
- Register via ```/register```
- Login via ```/login```

--- 

## 🗳️ Core Features
### Admin
- Login
- Create elections
- Manage elections
- View Result
### User
- Register/Login
- View active elections
- Cast vote (one vote per election)
- View voting results

---

##### Further email-based verification will be added next
