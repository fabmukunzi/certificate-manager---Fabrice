package dccs.academy.resources;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.services.CertificateService;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/backend/certificates")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CertificateResource {

    @Inject
    CertificateService certificateService;

    @GET
    public Response getAllCertificates() {
        List<CertificateDto> certificates = certificateService.getAllCertificates();
        return Response.ok(certificates).build();
    }

    @GET
    @Path("/{id}")
    public Response getCertificateById(@PathParam("id") Long id) {
        try {
            CertificateDto certificate = certificateService.getCertificateById(id);
            return Response.ok(certificate).build();
        } catch (EntityNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @POST
    public Response createCertificate(CertificateDto certificateDto) {
       try{
           CertificateDto createdCertificate = certificateService.createCertificate(certificateDto);
           return Response.status(Response.Status.CREATED).entity(createdCertificate).build();
       }catch (EntityNotFoundException e){
           return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
       }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCertificate(@PathParam("id") Long id) {
        try {
            certificateService.deleteCertificateById(id);
            return Response.ok("Certificate with ID "+id+" is deleted successfully").build();
        } catch (EntityNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

}
