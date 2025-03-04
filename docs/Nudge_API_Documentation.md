# Nudge Creation API Documentation

## **Base URL:**
```
/api/v3/app/nudges
```

## **Endpoints:**

### **1. Create a Nudge**
**Endpoint:**
```
POST /api/v3/app/nudges
```

**Description:**
Creates a new nudge associated with an event.

**Request Headers:**
```json
{
  "Content-Type": "multipart/form-data"
}
```

**Request Body (Form Data):**
| Parameter      | Type      | Required | Description |
|--------------|----------|----------|-------------|
| event_id      | String   | Yes      | The ID of the event to tag. |
| title         | String   | Yes      | Title of the nudge (max 60 characters). |
| image         | File     | Yes      | Cover image for the nudge. |
| schedule_date | String   | Yes      | Date when the nudge should be sent (Format: `YYYY-MM-DD`). |
| start_time    | String   | Yes      | Start time of the nudge (Format: `HH:MM`). |
| end_time      | String   | Yes      | End time of the nudge (Format: `HH:MM`). |
| description   | String   | Yes      | Detailed description of the nudge. |
| icon          | File     | No       | Icon representing the nudge. |
| invitation    | String   | No       | One-line invitation text. |

**Example Request in Postman:**
1. Set the request type to **POST**.
2. Enter the URL: `https://api.example.com/api/v3/app/nudges`.
3. In the **Headers** tab, add:
   - Key: `Content-Type`, Value: `multipart/form-data`
4. In the **Body** tab, select **form-data** and add the following key-value pairs:
   - `event_id`: `65a3b2c4d9f5e6a789b0c123`
   - `title`: `Upcoming Workshop`
   - `image`: (select the file)
   - `schedule_date`: `2025-03-10`
   - `start_time`: `14:00`
   - `end_time`: `16:00`
   - `description`: `Join us for an insightful workshop on new tech trends.`
   - `icon`: (select the file, optional)
   - `invitation`: `Swipe right to explore more!`

**Response:**
```json
{
  "message": "Nudge created successfully",
  "nudgeId": "65f2a8b9d4e6c7a890d12345"
}
```

---

### **2. Retrieve a Nudge**
**Endpoint:**
```
GET /api/v3/app/nudges/:id
```

**Description:**
Fetch details of a specific nudge by its ID.

**Example Request in Postman:**
1. Set the request type to **GET**.
2. Enter the URL: `https://api.example.com/api/v3/app/nudges/65f2a8b9d4e6c7a890d12345`.

**Response:**
```json
{
  "nudgeId": "65f2a8b9d4e6c7a890d12345",
  "event_id": "65a3b2c4d9f5e6a789b0c123",
  "title": "Upcoming Workshop",
  "image": "https://cdn.example.com/nudges/65f2a8b9d4e6c7a890d12345.jpg",
  "schedule_date": "2025-03-10",
  "start_time": "14:00",
  "end_time": "16:00",
  "description": "Join us for an insightful workshop on new tech trends.",
  "icon": "https://cdn.example.com/icons/65f2a8b9d4e6c7a890d12345.png",
  "invitation": "Swipe right to explore more!"
}
```

---

### **3. Update a Nudge**
**Endpoint:**
```
PUT /api/v3/app/nudges/:id
```

**Description:**
Update an existing nudge's details.

**Example Request in Postman:**
1. Set the request type to **PUT**.
2. Enter the URL: `https://api.example.com/api/v3/app/nudges/65f2a8b9d4e6c7a890d12345`.
3. In the **Headers** tab, add:
   - Key: `Content-Type`, Value: `application/json`
4. In the **Body** tab, select **raw** and enter the following JSON:
```json
{
  "title": "Updated Workshop Details",
  "description": "Join us for a deeper dive into AI innovations.",
  "schedule_date": "2025-03-11",
  "start_time": "15:00",
  "end_time": "17:00"
}
```

**Response:**
```json
{
  "message": "Nudge updated successfully"
}
```

---

### **4. Delete a Nudge**
**Endpoint:**
```
DELETE /api/v3/app/nudges/:id
```

**Description:**
Removes a specific nudge by its ID.

**Example Request in Postman:**
1. Set the request type to **DELETE**.
2. Enter the URL: `https://api.example.com/api/v3/app/nudges/65f2a8b9d4e6c7a890d12345`.

**Response:**
```json
{
  "message": "Nudge deleted successfully"
}
```

---

## **Error Handling**
| Error Code | Message | Description |
|------------|----------|-------------|
| 400 | "Invalid input" | Missing or incorrect request parameters. |
| 404 | "Nudge not found" | No nudge found for the given ID. |
| 500 | "Internal server error" | Something went wrong on the server. |

---

### **Conclusion**
This API allows users to create, retrieve, update, and delete nudges associated with events, enabling seamless event-based notifications.
