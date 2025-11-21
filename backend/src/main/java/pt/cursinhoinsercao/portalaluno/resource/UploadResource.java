package pt.cursinhoinsercao.portalaluno.resource;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import pt.cursinhoinsercao.portalaluno.dto.UploadResponse;
import pt.cursinhoinsercao.portalaluno.seguranca.Seguranca;
import pt.cursinhoinsercao.portalaluno.service.UploadService;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.InputStream;

@Path("/uploads")
public class UploadResource {

    private UploadService uploadService = new UploadService();

    @POST
    @Seguranca
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)

    public Response uploadFile(

            @FormDataParam("file") InputStream fileInputStream,
            @FormDataParam("file") FormDataContentDisposition fileMetaData,
            @FormDataParam("subpasta") String subpasta) {

        try {

            String pastaDestino = (subpasta == null || subpasta.trim().isEmpty()) ? "imagens" : subpasta;

            String caminhoDoFicheiro = uploadService.salvarFicheiro(fileInputStream, fileMetaData.getFileName(), pastaDestino);

            UploadResponse resposta = new UploadResponse(caminhoDoFicheiro);

            return Response.ok(resposta).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao processar o upload do ficheiro.").build();
        }
    }
}

