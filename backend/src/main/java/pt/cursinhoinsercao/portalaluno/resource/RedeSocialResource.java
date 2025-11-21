package pt.cursinhoinsercao.portalaluno.resource;

import pt.cursinhoinsercao.portalaluno.dao.RedeSocialDAO;
import pt.cursinhoinsercao.portalaluno.dto.BannerDTO;
import pt.cursinhoinsercao.portalaluno.dto.RedeSocialDTO;
import pt.cursinhoinsercao.portalaluno.dto.SecaoDTO;
import pt.cursinhoinsercao.portalaluno.entity.Banner;
import pt.cursinhoinsercao.portalaluno.entity.RedeSocial;
import pt.cursinhoinsercao.portalaluno.entity.Secao;
import pt.cursinhoinsercao.portalaluno.seguranca.Seguranca;
import pt.cursinhoinsercao.portalaluno.service.BannerService;
import pt.cursinhoinsercao.portalaluno.service.RedeSocialService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/redes")
public class RedeSocialResource {

    private RedeSocialService redeService = new RedeSocialService();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarTodas() {
        List<RedeSocial> redes = redeService.buscarTodas();
        return Response.ok(redes).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca
    public Response criar(RedeSocialDTO redeDTO) {
        try {
            RedeSocial novaRede = new RedeSocial();
            novaRede.setLink(redeDTO.getLink());
            novaRede.setTexto(redeDTO.getTexto());
            novaRede.setImagem(redeDTO.getImagem()); // O frontend enviará o caminho do ficheiro aqui

            RedeSocial redeCriada = redeService.criar(novaRede);
            return Response.status(Response.Status.CREATED).entity(redeCriada).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca
    public Response atualizar(@PathParam("id") int id, RedeSocialDTO redeDTO) {
        try {
            RedeSocial redeParaAtt = new RedeSocial();
            redeParaAtt.setLink(redeDTO.getLink());
            redeParaAtt.setTexto(redeDTO.getTexto());
            redeParaAtt.setImagem(redeDTO.getImagem());

            RedeSocial redeAtt = redeService.atualizar(id, redeParaAtt);
            return Response.ok(redeAtt).build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Seguranca
    public Response deletar(@PathParam("id") int id) {
        try {
            redeService.deletar(id);
            return Response.noContent().build(); // Resposta 204 No Content é o padrão para delete com sucesso
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }
}
