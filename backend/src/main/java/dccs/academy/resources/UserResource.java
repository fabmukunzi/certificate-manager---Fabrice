package dccs.academy.resources;

import dccs.academy.dtos.UserDto;
import dccs.academy.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/backend/users")
public class UserResource {
    @Inject
    UserRepository userRepository;
    @GET
    @Transactional
    public Response searchUsers(
            @QueryParam("firstName") String firstName,
            @QueryParam("lastName") String lastName,
            @QueryParam("plant") String plant,
            @QueryParam("userId") String userId,
            @QueryParam("department") String department) {
        try {
            List<UserDto> users = userRepository.userSearch(firstName, lastName, plant, userId, department);
            return Response.ok(users).build();
        }catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}
