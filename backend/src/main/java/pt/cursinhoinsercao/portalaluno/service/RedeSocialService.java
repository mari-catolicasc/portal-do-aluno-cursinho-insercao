package pt.cursinhoinsercao.portalaluno.service;

import pt.cursinhoinsercao.portalaluno.dao.RedeSocialDAO;
import pt.cursinhoinsercao.portalaluno.entity.RedeSocial;
import java.util.List;

public class RedeSocialService {

    private final RedeSocialDAO redeDAO;

    public RedeSocialService() {
        this.redeDAO = new RedeSocialDAO();
    }

    public RedeSocialService(RedeSocialDAO redeDAO) {
        this.redeDAO = redeDAO;
    }

    public List<RedeSocial> buscarTodas() {
        return redeDAO.buscarTodas();
    }

    public RedeSocial buscarPorId(int id) {
        return redeDAO.buscarPorId(id);
    }

    public RedeSocial criar(RedeSocial novaRede) throws Exception {
        if (novaRede.getTexto() == null || novaRede.getTexto().trim().isEmpty()) {
            throw new Exception("O texto (nome) da rede social não pode ser vazio");
        }

        if (novaRede.getLink() == null || novaRede.getLink().trim().isEmpty()) {
            throw new Exception("O link da rede social não pode ser vazio");
        }

        if (novaRede.getImagem() == null || novaRede.getImagem().trim().isEmpty()) {
            throw new Exception("A imagem da rede social não pode ser vazia");
        }

        redeDAO.salvar(novaRede);
        return novaRede;
    }

    public RedeSocial atualizar(int id, RedeSocial redeAtt) throws Exception {
        RedeSocial redeExistente = redeDAO.buscarPorId(id);

        if (redeExistente == null) {
            throw new Exception("Rede social não encontrada com o ID: " + id);
        }

        if (redeAtt.getTexto() != null) redeExistente.setTexto(redeAtt.getTexto());
        if (redeAtt.getLink() != null) redeExistente.setLink(redeAtt.getLink());
        if (redeAtt.getImagem() != null) redeExistente.setImagem(redeAtt.getImagem());

        redeDAO.atualizar(redeExistente);
        return redeExistente;
    }

    public void deletar(int id) throws Exception {
        RedeSocial rede = redeDAO.buscarPorId(id);
        if (rede == null) {
            throw new Exception("Rede social não encontrada com o ID: " + id);
        }

        redeDAO.remover(rede);
    }
}
