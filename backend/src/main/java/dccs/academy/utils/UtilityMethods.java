package dccs.academy.utils;

import jakarta.ws.rs.core.Response;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

public class UtilityMethods {
    static public String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder result = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            result.append(characters.charAt(random.nextInt(characters.length())));
        }
        return result.toString();
    }

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
