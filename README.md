# Apartment Listings App

Simple app to list apartments, view details, and add new ones.

## Stack

- Frontend: Next.js (client on port `3000`)
- Backend: NestJS (server on port `8080`)
- Database: Postgres (port `5432`)

## Clone the repository (if you haven't already):

```bash
git clone <repository-url>
cd apartment-hub
```

## Run with Docker (recommended)

- Build and start all services:

```bash
docker-compose up -d --build
```

- Open:
  - Frontend: http://localhost:3000
  - Backend API: http://localhost:8080/v1
- Compose sets:
  - `NEXT_PUBLIC_API_URL=http://backend:8080/v1` (frontend)
  - `POSTGRES_URI=postgres://postgres:password@apartment-db:5432/nawy-db` (backend)

## Run locally (without Docker)

### Note : if yarn --cwd not working properly , try to move to the (server / client) directory and run the command again with no --cwd.

- Install dependencies:

```bash
yarn install:all
```

- Start backend:

```bash
yarn --cwd server start:dev
```

- Start frontend:

```bash
yarn --cwd client dev
```

## API Documentation

### Base URL

- **Development**: `http://localhost:8080`
- **Docker**: `http://backend:8080`

### Endpoints

#### 1. Get All Apartments

**GET** `/v1/apartment`

Retrieve a paginated list of apartments with optional filtering.

**Query Parameters:**

- `page` (optional): Page number (1-50, default: 1)
- `perPage` (optional): Items per page (1-50, default: 10)
- `search` (optional): Search in unit name, number, project, or description
- `project` (optional): Filter by project name
- `status` (optional): Filter by status (`available`, `rented`, `pending`)

**Example Request:**

```bash
GET /v1/apartment?page=1&perPage=10&search=garden&status=available
```

**Example Response:**

```json
{
  "data": [
    {
      "id": 1,
      "unit_name": "Garden View A-101",
      "unit_number": "A-101",
      "project": "Sunrise Residency",
      "address": "123 Main St, Cityville",
      "price": "120000.00",
      "bedrooms": 2,
      "bathrooms": 2,
      "area": "85.50",
      "description": "Cozy 2BR with garden view and modern amenities.",
      "status": "available",
      "amenities": ["Garden View", "Parking", "Balcony"],
      "images": [
        "/images/apartments/apartment(1-1).webp",
        "/images/apartments/apartment(1-2).webp"
      ],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "page": 1,
  "perPage": 10,
  "total": 25,
  "totalPages": 3
}
```

#### 2. Get Single Apartment

**GET** `/v1/apartment/:id`

Retrieve details of a specific apartment by ID.

**Path Parameters:**

- `id`: Apartment ID (integer)

**Example Request:**

```bash
GET /v1/apartment/1
```

**Example Response:**

```json
{
  "id": 1,
  "unit_name": "Garden View A-101",
  "unit_number": "A-101",
  "project": "Sunrise Residency",
  "address": "123 Main St, Cityville",
  "price": "120000.00",
  "bedrooms": 2,
  "bathrooms": 2,
  "area": "85.50",
  "description": "Cozy 2BR with garden view and modern amenities.",
  "status": "available",
  "amenities": ["Garden View", "Parking", "Balcony"],
  "images": [
    "/images/apartments/apartment(1-1).webp",
    "/images/apartments/apartment(1-2).webp"
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### 3. Create New Apartment

> **Note**: This route should be protected by authentication middleware in a production environment. Each user should only be able to add apartments and view their own private apartment details and surely the public info about the other apartments. However, for the purpose of this task, authentication is not implemented and the functionality is kept simple.

**POST** `/v1/apartment/add-apartmen`

Create a new apartment listing.

**Request Body:**

```json
{
  "unit_name": "Modern Studio C-301",
  "unit_number": "C-301",
  "project": "Urban Heights",
  "address": "789 Downtown Ave, Metro City",
  "price": "95000.00",
  "bedrooms": 1,
  "bathrooms": 1,
  "area": "65.00",
  "description": "Contemporary studio apartment perfect for young professionals.",
  "status": "available",
  "amenities": ["Modern Design", "Gym Access", "Rooftop Terrace"],
  "images": [
    "/images/apartments/apartment(4-1).webp",
    "/images/apartments/apartment(4-2).webp"
  ]
}
```

**Field Validations:**

- `unit_name`: String, 3-255 characters
- `unit_number`: String, 1-255 characters (must be unique)
- `project`: String, 1-255 characters
- `address`: String, minimum 10 characters
- `price`: Decimal string (e.g., "95000.00")
- `bedrooms`: Integer, minimum 0
- `bathrooms`: Integer, minimum 1
- `area`: Decimal string (e.g., "65.00")
- `description`: String, 10-255 characters, no HTML tags
- `status`: Enum (`available`, `rented`, `pending`)
- `amenities`: Array of strings
- `images`: Array of image URLs/paths

**Example Response:**

```json
{
  "id": 8,
  "unit_name": "Modern Studio C-301",
  "unit_number": "C-301",
  "project": "Urban Heights",
  "address": "789 Downtown Ave, Metro City",
  "price": "95000.00",
  "bedrooms": 1,
  "bathrooms": 1,
  "area": "65.00",
  "description": "Contemporary studio apartment perfect for young professionals.",
  "status": "available",
  "amenities": ["Modern Design", "Gym Access", "Rooftop Terrace"],
  "images": [
    "/images/apartments/apartment(4-1).webp",
    "/images/apartments/apartment(4-2).webp"
  ],
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

### Error Responses

#### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": [
    "unit_name must be longer than or equal to 3 characters",
    "price must be a decimal string with up to 2 digits after the decimal point"
  ],
  "error": "Bad Request"
}
```

#### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Apartment with unit_number 999 not found",
  "error": "Not Found"
}
```

#### 409 Conflict

```json
{
  "statusCode": 409,
  "message": "Apartment with unit_number A-101 already exists",
  "error": "Conflict"
}
```

### Testing the API

#### Using cURL:

**Get all apartments:**

```bash
curl -X GET "http://localhost:8080/v1/apartment?page=1&perPage=5"
```

**Get apartment by ID:**

```bash
curl -X GET "http://localhost:8080/v1/apartment/1"
```

**Create new apartment:**

```bash
curl -X POST "http://localhost:8080/v1/apartment/add-apartmen" \
  -H "Content-Type: application/json" \
  -d '{
    "unit_name": "Test Apartment",
    "unit_number": "T-001",
    "project": "Test Project",
    "address": "123 Test Street, Test City",
    "price": "100000.00",
    "bedrooms": 2,
    "bathrooms": 1,
    "area": "75.00",
    "description": "A test apartment for API demonstration",
    "status": "available",
    "amenities": ["Test Amenity"],
    "images": ["/images/test.webp"]
  }'
```

## Husky (pre-commit)

- Pre-commit runs `lint-staged`:
  - ESLint fix + Prettier format on staged files
- If a commit fails, run checks manually:

```bash
yarn --cwd client lint
```

```bash
yarn --cwd server lint
```

```bash
yarn --cwd client tsc --noEmit -p tsconfig.json
```

```bash
yarn --cwd server tsc --noEmit -p tsconfig.json
```
