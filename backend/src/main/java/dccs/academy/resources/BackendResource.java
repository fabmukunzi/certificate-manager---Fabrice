package dccs.academy.resources;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.HashMap;
import java.util.Map;

@Path("/backend")
public class BackendResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response hello() {
        Map<String, Object> response = new HashMap<>();
        response.put("message","Welcome to my backend APIs");
        return Response.ok(response).build();
    }
}
