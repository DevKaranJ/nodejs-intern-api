# API Documentation for Event Management

## Overview
This document provides details about the RESTful APIs developed for managing events, including the expected outputs for both successful and failed API calls.

## Endpoints

### 1. Fetch All Events
- **Method**: GET
- **Endpoint**: `/api/v3/app/events`
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    [
      {
        "_id": "event_id",
        "uid": 1,
        "name": "Event Name",
        "tagline": "Event Tagline",
        "schedule": "2023-10-01T10:00:00Z",
        "description": "Event Description",
        "files": { "image": "image_filename.jpg" },
        "moderator": "Moderator Name",
        "category": "Category",
        "sub_category": "Sub-category",
        "rigor_rank": 5,
        "attendees": ["user_id1", "user_id2"]
      }
    ]
    ```
- **Error Response**:
  - **Code**: 500
  - **Content**: 
    ```json
    { "error": "Failed to fetch events" }
    ```

### 2. Fetch Event by ID
- **Method**: GET
- **Endpoint**: `/api/v3/app/events/:id`
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "_id": "event_id",
      "uid": 1,
      "name": "Event Name",
      "tagline": "Event Tagline",
      "schedule": "2023-10-01T10:00:00Z",
      "description": "Event Description",
      "files": { "image": "image_filename.jpg" },
      "moderator": "Moderator Name",
      "category": "Category",
      "sub_category": "Sub-category",
      "rigor_rank": 5,
      "attendees": ["user_id1", "user_id2"]
    }
    ```
- **Error Response**:
  - **Code**: 404
  - **Content**: 
    ```json
    { "error": "Event not found" }
    ```
  - **Code**: 500
  - **Content**: 
    ```json
    { "error": "Failed to fetch event" }
    ```

### 3. Create New Event
- **Method**: POST
- **Endpoint**: `/api/v3/app/events`
- **Request Body**:
  ```json
  {
    "uid": 1,
    "name": "Event Name",
    "tagline": "Event Tagline",
    "schedule": "2023-10-01T10:00:00Z",
    "description": "Event Description",
    "moderator": "Moderator Name",
    "category": "Category",
    "sub_category": "Sub-category",
    "rigor_rank": 5,
    "attendees": ["user_id1", "user_id2"]
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**: 
    ```json
    { "message": "Event created successfully", "eventId": "new_event_id" }
    ```
- **Error Response**:
  - **Code**: 400
  - **Content**: 
    ```json
    { "error": "Validation failed", "details": ["Validation error messages"] }
    ```
  - **Code**: 409
  - **Content**: 
    ```json
    { "error": "Event with the same name, schedule, and moderator already exists." }
    ```
  - **Code**: 500
  - **Content**: 
    ```json
    { "error": "Failed to create event" }
    ```

### 4. Update Event by ID
- **Method**: PUT
- **Endpoint**: `/api/v3/app/events/:id`
- **Request Body**: Same as Create New Event
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    { "message": "Event updated successfully" }
    ```
- **Error Response**:
  - **Code**: 400
  - **Content**: 
    ```json
    { "error": "Validation failed", "details": ["Validation error messages"] }
    ```
  - **Code**: 404
  - **Content**: 
    ```json
    { "error": "Event not found" }
    ```
  - **Code**: 500
  - **Content**: 
    ```json
    { "error": "Failed to update event", "details": "Error message" }
    ```

### 5. Delete Event by ID
- **Method**: DELETE
- **Endpoint**: `/api/v3/app/events/:id`
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    { "message": "Event deleted successfully" }
    ```
- **Error Response**:
  - **Code**: 404
  - **Content**: 
    ```json
    { "error": "Event not found" }
    ```
  - **Code**: 500
  - **Content**: 
    ```json
    { "error": "Failed to delete event" }
    ```

## Conclusion
This documentation provides a comprehensive overview of the Event Management API, including the expected outputs for both successful and failed API calls.
