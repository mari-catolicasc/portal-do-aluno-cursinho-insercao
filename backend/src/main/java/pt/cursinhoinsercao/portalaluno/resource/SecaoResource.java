package pt.cursinhoinsercao.portalaluno.resource;

import pt.cursinhoinsercao.portalaluno.dto.SecaoDTO;
import pt.cursinhoinsercao.portalaluno.entity.Secao;
import pt.cursinhoinsercao.portalaluno.seguranca.Seguranca;
import pt.cursinhoinsercao.portalaluno.service.SecaoService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/secoes")
public class SecaoResource {

    private SecaoService secaoService = new SecaoService();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarTodas() {
        List<Secao> secoes = secaoService.buscarTodas();
        return Response.ok(secoes).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca // Apenas admins podem aceder
    public Response criar(SecaoDTO secaoDTO) {
        try {
            Secao novaSecao = new Secao();
            novaSecao.setTitulo(secaoDTO.getTitulo());
            novaSecao.setTexto(secaoDTO.getTexto());
            novaSecao.setImagem(secaoDTO.getImagem()); // O frontend enviará o caminho do ficheiro aqui

            Secao secaoCriada = secaoService.criar(novaSecao);
            return Response.status(Response.Status.CREATED).entity(secaoCriada).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca // Apenas admins podem aceder
    public Response atualizar(@PathParam("id") int id, SecaoDTO secaoDTO) {
        try {
            Secao secaoParaAtualizar = new Secao();
            secaoParaAtualizar.setTitulo(secaoDTO.getTitulo());
            secaoParaAtualizar.setTexto(secaoDTO.getTexto());
            secaoParaAtualizar.setImagem(secaoDTO.getImagem());

            Secao secaoAtualizada = secaoService.atualizar(id, secaoParaAtualizar);
            return Response.ok(secaoAtualizada).build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Seguranca // Apenas admins podem aceder
    public Response deletar(@PathParam("id") int id) {
        try {
            secaoService.deletar(id);
            return Response.noContent().build(); // Resposta 204 No Content é o padrão para delete com sucesso
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }
}

