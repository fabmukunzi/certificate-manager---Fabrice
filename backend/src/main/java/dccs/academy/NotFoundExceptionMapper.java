package dccs.academy;

import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.HashMap;
import java.util.Map;

@Provider
public class NotFoundExceptionMapper implements ExceptionMapper<NotFoundException> {
    @Context
    UriInfo uriInfo;
    @Override
    public Response toResponse(NotFoundException exception) {
        String path = uriInfo.getPath();
        if (path != null && path.startsWith("/backend")) {
            Map<String, Object> response = new HashMap<>();
            response.put("message","Backend endpoint is not found");
            return Response.ok(response).build();
        }
        return null;
    }
}
