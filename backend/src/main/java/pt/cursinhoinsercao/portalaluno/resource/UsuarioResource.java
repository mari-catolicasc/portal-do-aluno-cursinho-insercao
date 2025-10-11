package pt.cursinhoinsercao.portalaluno.resource;

import pt.cursinhoinsercao.portalaluno.dto.Login;
import pt.cursinhoinsercao.portalaluno.dto.LoginResponse;
import pt.cursinhoinsercao.portalaluno.entity.Usuario;
import pt.cursinhoinsercao.portalaluno.seguranca.Seguranca;
import pt.cursinhoinsercao.portalaluno.service.UsuarioService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/usuarios")
public class UsuarioResource {

    private UsuarioService usuarioService = new UsuarioService();

    // Endpoints de Autenticação e Cadastro (Públicos)

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response cadastrar(Usuario novoUsuario) {
        try {
            Usuario usuarioCadastrado = usuarioService.cadastrar(novoUsuario);
            return Response.status(Response.Status.CREATED).entity(usuarioCadastrado).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Login login) {
        try {
            String token = usuarioService.login(login);
            LoginResponse resposta = new LoginResponse(token);
            return Response.ok(resposta).build();
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        }
    }

    // novos endpoints para gestão de educadores

    @GET
    @Path("/professores/pendentes")
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca // Apenas admins

    public Response listarCandidaturasPendentes() {
        List<Usuario> candidaturas = usuarioService.listarCandidaturasPendentes();
        return Response.ok(candidaturas).build();
    }

    @GET
    @Path("/professores/ativos")
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca // Apenas admins

    public Response listarEducadoresAtivos() {
        List<Usuario> educadores = usuarioService.listarEducadoresAtivos();
        return Response.ok(educadores).build();
    }

    @PUT
    @Path("/{id}/aprovar")
    @Seguranca // Apenas admins
    public Response aprovarCandidatura(@PathParam("id") int id) {
        usuarioService.aprovarCandidatura(id);
        return Response.ok().build();
    }

    // este endpoint pode ser usado tanto para rejeitar uma candidatura quanto para remover um educador ativo
    @DELETE
    @Path("/{id}")
    @Seguranca // Apenas admins
    public Response rejeitarOuRemoverEducador(@PathParam("id") int id) {
        usuarioService.rejeitarOuRemoverEducador(id);
        return Response.noContent().build();
    }

    //Busca a lista de novas matrículas de alunos.
    @GET
    @Path("/alunos/pendentes")
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca
    public Response listarMatriculasPendentes() {
        List<Usuario> matriculas = usuarioService.listarMatriculasPendentes();
        return Response.ok(matriculas).build();
    }

    //Busca a lista de alunos já matriculados
    @GET
    @Path("/alunos/matriculados")
    @Produces(MediaType.APPLICATION_JSON)
    @Seguranca
    public Response listarAlunosMatriculados() {
        List<Usuario> alunos = usuarioService.listarAlunosMatriculados();
        return Response.ok(alunos).build();
    }

    //Aprova uma matrícula
    @PUT
    @Path("/alunos/{id}/aprovar")
    @Seguranca
    public Response aprovarMatricula(@PathParam("id") int id) {
        usuarioService.aprovarMatricula(id);
        return Response.ok().build();
    }

    //Rejeita/Remove um aluno
    @DELETE
    @Path("/alunos/{id}")
    @Seguranca
    public Response rejeitarOuRemoverAluno(@PathParam("id") int id) {
        usuarioService.rejeitarOuRemoverAluno(id);
        return Response.noContent().build();
    }
}
