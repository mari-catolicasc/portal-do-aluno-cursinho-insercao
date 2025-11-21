package pt.cursinhoinsercao.portalaluno.resource;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import pt.cursinhoinsercao.portalaluno.entity.RelatorioUnis;
import pt.cursinhoinsercao.portalaluno.seguranca.Seguranca;
import pt.cursinhoinsercao.portalaluno.service.RelatorioUnisService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.InputStream;
import java.util.List;

@Path("/relatorios")
@Seguranca // Protege todos os endpoints desta classe por defeito
public class RelatorioUnisResource {

    private RelatorioUnisService relatorioUnisService = new RelatorioUnisService();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarTodos() {
        List<RelatorioUnis> relatorios = relatorioUnisService.listarTodos();
        return Response.ok(relatorios).build();
    }

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response criar(
            @FormDataParam("file") InputStream fileInputStream,
            @FormDataParam("file") FormDataContentDisposition fileMetaData) {
        try {
            RelatorioUnis relatorioCriado = relatorioUnisService.criar(fileInputStream, fileMetaData.getFileName());
            return Response.status(Response.Status.CREATED).entity(relatorioCriado).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response remover(@PathParam("id") int id) {
        try {
            relatorioUnisService.remover(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }
}
