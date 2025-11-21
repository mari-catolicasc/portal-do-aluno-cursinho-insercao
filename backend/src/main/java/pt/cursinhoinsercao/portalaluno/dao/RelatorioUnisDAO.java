package pt.cursinhoinsercao.portalaluno.dao;

import pt.cursinhoinsercao.portalaluno.entity.RelatorioUnis;
import pt.cursinhoinsercao.portalaluno.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class RelatorioUnisDAO {

    public void salvar(RelatorioUnis relatorio) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(relatorio);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void remover(RelatorioUnis relatorio) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.remove(em.contains(relatorio) ? relatorio : em.merge(relatorio));
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public RelatorioUnis buscarPorId(int id) {
        EntityManager em = JPAUtil.getEntityManager();
        RelatorioUnis relatorio = em.find(RelatorioUnis.class, id);
        em.close();
        return relatorio;
    }

    public List<RelatorioUnis> listarTodos() {
        EntityManager em = JPAUtil.getEntityManager();
        String jpql = "SELECT r FROM RelatorioUnis r ORDER BY r.dataUpload DESC";
        TypedQuery<RelatorioUnis> query = em.createQuery(jpql, RelatorioUnis.class);
        List<RelatorioUnis> relatorios = query.getResultList();
        em.close();
        return relatorios;
    }
}
