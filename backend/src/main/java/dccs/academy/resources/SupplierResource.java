package dccs.academy.resources;

import dccs.academy.repositories.SupplierRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
@Path("/backend/suppliers")
@Produces(MediaType.APPLICATION_JSON)
public class SupplierResource {
    @Inject
    SupplierRepository supplierRepository;
    @GET
    @Transactional
    public Response supplierSearch(@QueryParam("index") String index, @QueryParam("name") String name, @QueryParam("city") String city) {
        try {
            var suppliers = supplierRepository.supplierSearch(name, city, index);
            return Response.ok(suppliers).build();
        }catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

}
