package dccs.academy;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;

@Path("/")
public class RedirectResource {

    @GET
    public Response redirectToFrontend() {
        return Response.seeOther(UriBuilder.fromUri("/frontend").build()).build();
    }
}
