package pt.cursinhoinsercao.portalaluno.service;

import pt.cursinhoinsercao.portalaluno.dao.UsuarioDAO;
import pt.cursinhoinsercao.portalaluno.dto.Login;
import pt.cursinhoinsercao.portalaluno.entity.Usuario;

public class UsuarioService {

    private UsuarioDAO usuarioDAO = new UsuarioDAO();
    private TokenService tokenService = new TokenService();

    public Usuario cadastrar(Usuario novoUsuario) throws Exception {
        Usuario usuarioExistente = usuarioDAO.buscarPorEmail(novoUsuario.getEmail());

        if (usuarioExistente != null) {
            throw new Exception("O e-mail informado já está em uso.");
        }
        if (novoUsuario.getNome() == null || novoUsuario.getNome().trim().isEmpty()) {
            throw new Exception("O nome do usuário não pode ser vazio.");
        }
        if (novoUsuario.getSenha() == null || novoUsuario.getSenha().length() < 6) {
            throw new Exception("A senha deve ter no mínimo 6 caracteres.");
        }

        usuarioDAO.salvar(novoUsuario);
        return novoUsuario;
    }

    public String login(Login dadosLogin) throws Exception {
        Usuario usuarioDoBanco = usuarioDAO.buscarPorEmail(dadosLogin.getEmail());

        if (usuarioDoBanco != null && usuarioDoBanco.getSenha().equals(dadosLogin.getSenha())) {
            return tokenService.gerarToken(usuarioDoBanco);
        }

        throw new Exception("E-mail ou senha inválidos.");
    }
}