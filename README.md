# boilerplate-node-express-jwt
This project is a sample implementation of an authentication system that uses JSON Web Token to manage users' login data in Node.js web server.

Express.js, Mongoose, ES6 Syntax is used in this project.

## Getting Started
### Prerequisites
- node.js 10.16.x
- npm 6.9.x
- MongoDB 4.2.x

### Installing & Configuration
1) Install dependencies
```
cd boilerplate-node-express-jwt && npm install
```
2) Rename `env_example` to `.env`

### Run the server
```
npm start
```

## APIs
### Auth Route
#### Register
`POST /api/auth/register`
```
{
    name,
    email,
    password
}
```
#### Login
`POST /api/auth/login`
```
{
    email,
    password
}
```
**Description**: logs in to the server. Server will return a JWT token as:
```javascript
{
    "success": true,
    "error_code": null,
    "message": "Successfully create new user",
    "data": {
        "user": {
            "role": 2,
            "createdAt": "2019-09-19T03:39:40.306Z",
            "updatedAt": "2019-09-19T03:39:40.306Z",
            "_id": "5d82f91b174a4f0e2ebb5b0d",
            "email": "xxxx@mail.com",
            "tokens": [
                {
                    "_id": "5d82f91b174a4f0e2ebb5b0e",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgyZjkxYjE3NGE0ZjBlMmViYjViMGQiLCJlbWFpbCI6ImplZXJhd2F0QGFkZHRlY2hodWIuY29tIiwicm9sZSI6MiwiaWF0IjoxNTY4ODY0NTM5LCJleHAiOjE1Njg4NjU0Mzl9.us9LppDJEmeEy4x8zKHkhR6Td-jBDn9iZT48yOPLgF0"
                }
            ],
            "__v": 1
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgyZjkxYjE3NGE0ZjBlMmViYjViMGQiLCJlbWFpbCI6ImplZXJhd2F0QGFkZHRlY2hodWIuY29tIiwicm9sZSI6MiwiaWF0IjoxNTY4ODY0NTM5LCJleHAiOjE1Njg4NjU0Mzl9.us9LppDJEmeEy4x8zKHkhR6Td-jBDn9iZT48yOPLgF0"
    }
}
```
#### Me
`GET /api/users/me` or `GET /api/users/me?token={token}`  

**Description**: checks the JWT. Token should be passed as Url-encoded query or `Authorization: Bearer` header
