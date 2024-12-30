# API Documentation

## Endpoints

### POST /users/register

Registers a new user.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
- `201 Created` on success
```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```
- `400 Bad Request` if validation fails
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field",
      "location": "body"
    }
  ]
}
```

### POST /users/login

Logs in an existing user.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
- `200 OK` on success
```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```
- `400 Bad Request` if validation fails or credentials are incorrect
```json
{
  "message": "Invalid Email or password"
}
```

### GET /users/profile

Fetches the profile of the authenticated user.

**Headers:**
- `Authorization: Bearer jwt_token`

**Response:**
- `200 OK` on success
```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```
- `401 Unauthorized` if the user is not authenticated
```json
{
  "message": "Unauthorized"
}
```

### GET /users/logout

Logs out the authenticated user.

**Headers:**
- `Authorization: Bearer jwt_token` or use the `token` cookie

**Response:**
- `200 OK` on success
```json
{
  "message": "Logged out successfully"
}
```
- `401 Unauthorized` if the user is not authenticated
```json
{
  "message": "Unauthorized"
}
```

**Note:**
- The token used for authentication will be added to a blacklist to prevent reuse.

### POST /captains/register

Registers a new captain.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "vehicleType": "car",
    "plateNumber": "ABC123",
    "capacity": 4
  }
}
```

**Response:**
- `201 Created` on success
```json
{
  "token": "jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "vehicleType": "car",
      "plateNumber": "ABC123",
      "capacity": 4
    },
    "socketId": null,
    "status": "inactive"
  }
}
```
- `400 Bad Request` if validation fails
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field",
      "location": "body"
    }
  ]
}
```

# Captain Routes Documentation

## Register Captain

**Endpoint:** `POST /captains/register`

**Description:** Registers a new captain.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "vehicleType": "string",
    "plateNumber": "string",
    "capacity": "number"
  }
}
```

**Responses:**
- `201 Created`: Returns the created captain and a token.
- `400 Bad Request`: Returns validation errors or if the captain already exists.

## Login Captain

**Endpoint:** `POST /captains/login`

**Description:** Logs in a captain.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**
- `200 OK`: Returns the logged-in captain and a token.
- `400 Bad Request`: Returns validation errors or if the credentials are invalid.

## Get Captain Profile

**Endpoint:** `GET /captains/profile`

**Description:** Retrieves the profile of the logged-in captain.

**Headers:**
- `Authorization: Bearer <token>`

**Responses:**
- `200 OK`: Returns the captain's profile.
- `401 Unauthorized`: If the token is missing or invalid.

## Logout Captain

**Endpoint:** `GET /captains/logout`

**Description:** Logs out the captain.

**Headers:**
- `Authorization: Bearer <token>`

**Responses:**
- `200 OK`: Returns a success message.
- `401 Unauthorized`: If the token is missing or invalid.
