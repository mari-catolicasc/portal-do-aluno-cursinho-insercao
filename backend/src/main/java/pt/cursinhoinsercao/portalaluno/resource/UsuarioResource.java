package pt.cursinhoinsercao.portalaluno.resource;

import pt.cursinhoinsercao.portalaluno.dto.Login;
import pt.cursinhoinsercao.portalaluno.dto.LoginResponse;
import pt.cursinhoinsercao.portalaluno.entity.Usuario;
import pt.cursinhoinsercao.portalaluno.service.UsuarioService;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("usuarios")
public class UsuarioResource {

    private UsuarioService usuarioService = new UsuarioService();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response cadastrar(Usuario novoUsuario) {
        try {
            // Chama o serviço para executar a lógica de cadastro.
            Usuario usuarioCadastrado = usuarioService.cadastrar(novoUsuario);

            // Se tudo ocorreu bem, retorna uma resposta http 201 e envia o usuário criado (sem a senha, idealmente) de volta no corpo da resposta.
            return Response.status(Response.Status.CREATED).entity(usuarioCadastrado).build();

        } catch (Exception e) {
            // Se o serviço lançou uma exceção exemplo (email já existe), vai capturar a mensgaem e retornar a msg de erro http 400
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Login dadosLogin) {
        try {
            String token = usuarioService.login(dadosLogin);

            LoginResponse response = new LoginResponse(token);

            return Response.ok(response).build();

        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        }
    }
}