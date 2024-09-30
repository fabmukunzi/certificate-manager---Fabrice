package dccs.academy.resources;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.services.CertificateService;
import dccs.academy.utils.ResponseUtility;
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
        try {
            List<CertificateDto> certificates = certificateService.getAllCertificates();
            return ResponseUtility.successResponse("Certificates retrieved successfully", certificates, Response.Status.OK);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    public Response getCertificateById(@PathParam("id") Long id) {
        try {
            CertificateDto certificate = certificateService.getCertificateById(id);
            return ResponseUtility.successResponse("Certificate retrieved successfully", certificate, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseUtility.errorResponse(e.getMessage(),Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseUtility.errorResponse(e.getMessage(),Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @POST
    public Response createCertificate(CertificateDto certificateDto) {
        try {
            CertificateDto createdCertificate = certificateService.createCertificate(certificateDto);
            return ResponseUtility.successResponse("Certificate created successfully", createdCertificate, Response.Status.CREATED);
        } catch (EntityNotFoundException e) {
            return ResponseUtility.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseUtility.errorResponse(e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCertificate(@PathParam("id") Long id) {
        try {
            certificateService.deleteCertificateById(id);
            return ResponseUtility.successResponse("Certificate with ID " + id + " is deleted successfully", null, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseUtility.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseUtility.errorResponse(e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateCertificate(@PathParam("id") Long id, CertificateDto certificateDto) {
        try {
            CertificateDto updatedCertificate = certificateService.updateCertificate(id, certificateDto);
            return ResponseUtility.successResponse("Certificate updated successfully", updatedCertificate, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseUtility.errorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseUtility.errorResponse(e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

}
