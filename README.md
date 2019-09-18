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
    "message": "Successfully logged in!",
    "data": {
        "result": {
            "createdAt": "2019-09-18T11:42:03.266Z",
            "updatedAt": "2019-09-18T11:42:03.266Z",
            "_id": "5d82182b9cc8d5d188eb8e51",
            "name": "tester",
            "email": "tester@mail.com",
            "phone": "999999999",
            "role": "user",
            "tokens": [
                {
                    "_id": "5d826e97d2d299f168fb7764",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgyMTgyYjljYzhkNWQxODhlYjhlNTEiLCJlbWFpbCI6ImplZXJhd2F0QGFkZHRlY2hodWIuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTY4ODI5MDc5LCJleHAiOjE1Njg4Mjk5Nzl9.L_MPKYzyHv-z8noaAaWTZTkK6NTPh4vBe-OQf5jISLw"
                }
            ],
            "__v": 16
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgyMTgyYjljYzhkNWQxODhlYjhlNTEiLCJlbWFpbCI6ImplZXJhd2F0QGFkZHRlY2hodWIuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTY4ODI5MDc5LCJleHAiOjE1Njg4Mjk5Nzl9.L_MPKYzyHv-z8noaAaWTZTkK6NTPh4vBe-OQf5jISLw"
    }
}
```
#### Me
`GET /api/users/me` or `GET /api/users/me?token={token}`  

**Description**: checks the JWT. Token should be passed as Url-encoded query or `Authorization: Bearer` header
