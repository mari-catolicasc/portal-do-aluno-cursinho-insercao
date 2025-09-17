package pt.cursinhoinsercao.portalaluno.service;

import pt.cursinhoinsercao.portalaluno.dao.UsuarioDAO;
import pt.cursinhoinsercao.portalaluno.dto.Login;
import pt.cursinhoinsercao.portalaluno.entity.Usuario;

import java.util.List;

public class UsuarioService {

    private UsuarioDAO usuarioDAO = new UsuarioDAO();
    private TokenService tokenService = new TokenService();

    public Usuario cadastrar(Usuario novoUsuario) throws Exception {

        if (usuarioDAO.buscarPorEmail(novoUsuario.getEmail()) != null) {
            throw new Exception("Este email já está a ser utilizado");
        }

        if (novoUsuario.getTipo() == 1) {

            novoUsuario.setAtivo(false);

        } else {

            novoUsuario.setAtivo(true);

        }
        usuarioDAO.salvar(novoUsuario);
        return novoUsuario;
    }

    public String login(Login login) throws Exception {

        Usuario usuario = usuarioDAO.buscarPorEmail(login.getEmail());

        if (usuario == null || !usuario.getSenha().equals(login.getSenha())) {
            throw new Exception("Email ou senha inválidos.");
        }

        if (!usuario.isAtivo()) {
            throw new Exception("Usuário inativo. Aguarde a aprovação do seu cadastro.");
        }

        return tokenService.gerarToken(usuario);
    }

    //Busca a lista de novas candidaturas de educadores (professores inativos).
    public List<Usuario> listarCandidaturasPendentes() {
        // statusAtivo = false para buscar os inativos/pendentes
        return usuarioDAO.listarProfessoresPorStatus(false);
    }

    //Busca a lista de educadores já aprovados (professores ativos)
    public List<Usuario> listarEducadoresAtivos() {
        // statusAtivo = true para buscar os ativos
        return usuarioDAO.listarProfessoresPorStatus(true);
    }

    //Aprova a candidatura de um educador, tornando-o ativo.
    public void aprovarCandidatura(int id) {
        Usuario usuario = usuarioDAO.buscarPorId(id);

        if (usuario != null && usuario.getTipo() == 1) {
            usuario.setAtivo(true);
            usuarioDAO.atualizar(usuario);
        }
    }

    //Rejeita uma candidatura ou remove um educador existente.
    public void rejeitarOuRemoverEducador(int id) {
        Usuario usuario = usuarioDAO.buscarPorId(id);
        if (usuario != null) {
            usuarioDAO.remover(usuario);
        }
    }
}
