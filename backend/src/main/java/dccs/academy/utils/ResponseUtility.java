package dccs.academy.utils;

import jakarta.ws.rs.core.Response;

import java.util.HashMap;
import java.util.Map;

public class ResponseUtility {
    static public Response successResponse(String message, Object data, Response.Status status) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        if (data != null) response.put("data", data);
        return Response.status(status).entity(response).build();
    }

    static public Response errorResponse(String error, Response.Status status) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", error);
        return Response.status(status).entity(response).build();
    }
}