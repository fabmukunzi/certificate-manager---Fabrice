package dccs.academy;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

@Path("/frontend")
public class FrontendResource {

    @GET
    @Path("{path:.*}")
    public Response forwardToIndex() {
        return Response.ok(getClass().getResourceAsStream("/META-INF/resources/frontend/index.html")).build();
    }
}
