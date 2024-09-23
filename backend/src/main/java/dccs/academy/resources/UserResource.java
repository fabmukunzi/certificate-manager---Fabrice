package dccs.academy.resources;

import dccs.academy.dtos.UserDto;
import dccs.academy.services.UserService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
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
    @Inject UserService userService;
    @GET
    public Response searchUsers(
            @QueryParam("firstName") String firstName,
            @QueryParam("lastName") String lastName,
            @QueryParam("plant") String plant,
            @QueryParam("id") String id,
            @QueryParam("departmentId") String departmentId) {
        try {

            firstName = (firstName == null || firstName.isEmpty()) ? "" : firstName.trim();
            lastName = (lastName == null || lastName.isEmpty()) ? "" : lastName.trim();
            plant = (plant == null || plant.isEmpty()) ? "" : plant;
            Long userId = (id != null && !id.isEmpty()) ? Long.parseLong(id) : null;
            Long department = (departmentId != null && !departmentId.isEmpty()) ? Long.parseLong(departmentId) : null;
            List<UserDto> users = userService.userSearch(firstName, lastName, plant, userId, department);
            return Response.ok(users).build();
        }catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}
