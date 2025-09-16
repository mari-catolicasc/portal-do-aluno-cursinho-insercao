package pt.cursinhoinsercao.portalaluno.resource;

import pt.cursinhoinsercao.portalaluno.dto.BannerDTO;
import pt.cursinhoinsercao.portalaluno.entity.Banner;
import pt.cursinhoinsercao.portalaluno.seguranca.Seguranca;
import pt.cursinhoinsercao.portalaluno.service.BannerService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/banners")
public class BannerResource {

    private BannerService bannerService = new BannerService();

    @GET
    @Path("/ativo")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarBannerAtivo() {
        Banner banner = bannerService.buscarBannerAtivo();
        if (banner != null) {
            return Response.ok(banner).build();
        }
        return Response.status(Response.Status.NOT_FOUND).entity("Nenhum banner ativo encontrado.").build();
    }

    @GET
    @Path("/historico")
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca // Protege esta rota, apenas admins podem ver o histórico
    public Response listarHistorico() {
        List<Banner> historico = bannerService.listarHistorico();
        return Response.ok(historico).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Seguranca // Protege esta rota, apenas admins podem criar banners
    public Response criarNovoBanner(BannerDTO bannerDTO) {
        if (bannerDTO == null || bannerDTO.getImagem() == null || bannerDTO.getImagem().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("A URL da imagem é obrigatória.").build();
        }
        Banner novoBanner = new Banner();
        novoBanner.setImagem(bannerDTO.getImagem());

        bannerService.criarNovoBanner(novoBanner);
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Path("/{id}/reativar")
    @Seguranca // Protege esta rota, apenas admins podem reativar banners
    public Response reativarBanner(@PathParam("id") int id) {
        bannerService.reativarBannerDoHistorico(id);
        return Response.ok().build();
    }
}
