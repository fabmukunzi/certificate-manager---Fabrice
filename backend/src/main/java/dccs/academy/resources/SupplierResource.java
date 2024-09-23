package dccs.academy.resources;

import dccs.academy.services.SupplierService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
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
    SupplierService supplierService;
    @GET
    public Response supplierSearch(@QueryParam("index") String index, @QueryParam("names") String names, @QueryParam("city") String city) {
        names = (names == null || names.isEmpty()) ? "" : names;
        city = (city == null || city.isEmpty()) ? "" : city;
        var indexValue = (index == null || index.isEmpty()) ? null : Long.parseLong(index);
        var suppliers = supplierService.supplierSearch(names, city, indexValue);
        return Response.ok(suppliers).build();
    }

}
