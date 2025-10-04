package pt.cursinhoinsercao.portalaluno.service;

import pt.cursinhoinsercao.portalaluno.dao.RedeSocialDAO;
import pt.cursinhoinsercao.portalaluno.dao.SecaoDAO;
import pt.cursinhoinsercao.portalaluno.entity.RedeSocial;
import pt.cursinhoinsercao.portalaluno.entity.Secao;

import java.util.List;

public class RedeSocialService {
    private RedeSocialDAO redeDAO = new RedeSocialDAO();

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

        redeAtt.setId(id);
        redeDAO.atualizar(redeAtt);
        return redeAtt;
    }

    public void deletar(int id) throws Exception {
        RedeSocial rede = redeDAO.buscarPorId(id);

        if (rede == null) {
            throw new Exception("Rede social não encontrada com o ID: " + id);
        }

        redeDAO.remover(rede);
    }
}
