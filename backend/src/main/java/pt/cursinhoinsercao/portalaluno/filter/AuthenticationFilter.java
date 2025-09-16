package pt.cursinhoinsercao.portalaluno.filter;

import io.jsonwebtoken.Claims;
import pt.cursinhoinsercao.portalaluno.seguranca.Seguranca;
import pt.cursinhoinsercao.portalaluno.service.TokenService;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Seguranca
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    private TokenService tokenService = new TokenService();
    private static final int TIPO_ADMIN = 1; //professor com id 1 é o Admin.

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            abortarComNaoAutorizado(requestContext, "Cabeçalho de autorização ausente ou mal formatado.");
            return;
        }

        String token = authorizationHeader.substring("Bearer".length()).trim();

        try {
            Claims claims = tokenService.validarToken(token);

            int tipoUsuario = claims.get("tipo", Integer.class);
            if (tipoUsuario != TIPO_ADMIN) {
                requestContext.abortWith(
                        Response.status(Response.Status.FORBIDDEN).entity("Acesso negado. Permissões insuficientes.").build());
                return;
            }


        } catch (Exception e) {
            // se o token for inválido ele lança essa mensagem
            abortarComNaoAutorizado(requestContext, "Token inválido ou expirado.");
        }
    }

    private void abortarComNaoAutorizado(ContainerRequestContext requestContext, String mensagem) {
        requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED).entity(mensagem).build());
    }
}
