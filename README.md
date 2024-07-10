# Online Judge 

## 1. Overview

Online Judge provides a seamless environment to write, compile, and run your code effortlessly, challenging your skills in a competitive setting. Access a collection of problem sheets to enhance your coding abilities across various topics. Track your progress, celebrate achievements, and identify areas for improvement.

## 2. Features

- **Problem Management:** Browse and view detailed problem descriptions, including statement, name, code, difficulty type, and example test cases.
- **User Authentication:** Secure login/signup functionality with encrypted storage of user data.
- **Code Submission and Evaluation:** Submit code for real-time evaluation in a secure sandbox environment using Docker. Verdicts provided based on predefined test cases.
- **Submission History and Logs:** Accessible logs of recent submissions, displaying verdicts and programming language.
- **Profile Management:** Update personal information and view submission statistics.
- **Leaderboard:** Dynamic leaderboard showcasing all standings with their performances.

## 3. High Level Design

### 3.1 Database Design

- **Collections:** Problems, Solutions, Test Cases, User's Login/Signup
- **Document Structure:** Detailed structure for each collection defining fields such as problem statement, name, difficulty level, verdict, etc.

### 3.2 Web Server Design

- **UI Screens:** Home, About, All Problem, Specific Problem, Leaderboard, Show Submissions.
- **Functional Requirements:** Detailed frontend and backend implementation for problem listing, individual problems, code submission, showing submissions, and leaderboard.

### 3.3 Evaluation System

- **Code Execution:** Docker setup for containerized execution, resource management, and security measures.

## 4. Tech Stack

- **Frontend:** Next.js with TypeScript and Tailwind for building the user interface.
- **Backend:** Node.js with Express.js for building the server-side logic and RESTful APIs.
- **Database:** MongoDB for storing application data.
- **Compiler:** Node.js with Express.js for building the server-side logic for code execution and code submissions.
- **Containerization:** Containerizing all sections with Docker and making a network of all ends with a `docker-compose.yml` file.

## 5. Deployment

- **Frontend:** Vercel.
- **Backend:** Render.
- **Compiler:** Containerization with ECR (AWS) and running the container on EC2 on AWS.

## 6. Contents

- **Database:** Contains database files and configurations.
- **Doc:** Documentation including design documents, user manuals, and API references.
- **Backend:** Logic and APIs implemented using Express.js for Node.js.
- **Frontend:** UI components and implementations using React.js.
- **Models:** Database models and schemas for MongoDB.
- **Compiler:** Logic and configurations for code compilation and execution using Docker.

## 7. Version 2.0 Update (Soon)

- **Backend:** Next.js with TypeScript for the server-side logic and RESTful APIs and deploy on aws EC2.
- **Database:** PostgreSQL and Prisma (ORM) for storing application data.
- **Features:** Contest and topic-wise sheets.

## 8. For localy setup
**Step-1:-** Clone the repositry
```
git clone "https://github.com/devRojha/Online_Judge_.git"
```
**Step-2:-** Creat an .env file based on .env.example and Fill the credential.

**Step-3:-** Run the following command for installing dependency
```
cd backend2 ## enter into compiler directory
npm i
cd ../
cd backend ## enter into backend directory
npm i
cd ../
cd frontend ## enter into frontend directory
npm i
cd ../
```
**Step-4:-** Run the following command for runnig web on localhost.
```
cd backend2
npm run dev  ## run compiler at localhost:8000
cd ../
cd backend  ## run backend at localhost:3000
npm run dev
cd ../
cd frontend   ## run frontend at localhost:3001
npm run dev
cd ../
```
**Step-5:-** (For Docker User) Build images of all end and run yml file by following command.
```
cd backend2
docker build -t backend2 . ## Build image for compiler with name backend2
cd ../

cd backend
docker build -t backend .  ## Build image for backend with name backend
cd ../

cd frontend
docker build -t frontend .  ## Build image for frontend with name frontend
cd ../

docker-compose up  ## for making network and runnig all containers
```