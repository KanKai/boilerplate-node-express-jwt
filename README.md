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
2) Rename `env_development_example` to `.env.development`
2) Rename `env_production_example` to `.env.production`

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
`GET /api/users/me`
```javascript
{
    "success": true,
    "error_code": null,
    "message": "Successfully get detail user!",
    "data": {
        "_id": "5d82f91b174a4f0e2ebb5b0d",
        "role": 2,
        "createdAt": "2019-09-19T03:39:40.306Z",
        "updatedAt": "2019-09-19T03:39:40.306Z",
        "email": "xxxx@mail.com",
        "profile": {
            "firstName": "Jeerawat",
            "lastName": "Keawsawat"
        },
        "tokens": [
            {
                "_id": "5d82f91b174a4f0e2ebb5b0e",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgyZjkxYjE3NGE0ZjBlMmViYjViMGQiLCJlbWFpbCI6ImplZXJhd2F0QGFkZHRlY2hodWIuY29tIiwicm9sZSI6MiwiaWF0IjoxNTY4ODY0NTM5LCJleHAiOjE1Njg4NjU0Mzl9.us9LppDJEmeEy4x8zKHkhR6Td-jBDn9iZT48yOPLgF0"
            },
            {
                "_id": "5d82fb1c1a7b1812e4d66788",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgyZjkxYjE3NGE0ZjBlMmViYjViMGQiLCJlbWFpbCI6ImplZXJhd2F0QGFkZHRlY2hodWIuY29tIiwicm9sZSI6MiwiaWF0IjoxNTY4ODY1MDUyLCJleHAiOjE1Njg4NjU5NTJ9.8IswMii5jb9codnrA19oNkorMPHmQALSAJVdicQ9-CQ"
            }
        ],
        "__v": 2
    }
}
```

**Description**: checks the JWT. Token should be passed as Url-encoded query or `Authorization: Bearer xxx` header

#### Logout application
`POST /api/users/me/logout`

**Description**: checks the JWT. Token should be passed as Url-encoded query or `Authorization: Bearer xxx` header

#### Logout all devices
`POST /api/users/me/logoutall`

**Description**: checks the JWT. Token should be passed as Url-encoded query or `Authorization: Bearer xxx` header

#### Translate
`GET /api/translate?keyword="สวัสดีครับ"`
```javascript
{
    "success": true,
    "error_code": null,
    "message": "Successfully",
    "data": {
        "result": "\"Hello\""
    }
}
```
