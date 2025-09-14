package pt.cursinhoinsercao.portalaluno.dao;

import pt.cursinhoinsercao.portalaluno.entity.Secao;
import pt.cursinhoinsercao.portalaluno.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class SecaoDAO {

    public List<Secao> buscarTodas() {
        EntityManager em = JPAUtil.getEntityManager();
        String jpql = "SELECT s FROM Secao s ORDER BY s.id";
        TypedQuery<Secao> query = em.createQuery(jpql, Secao.class);
        List<Secao> secoes = query.getResultList();
        em.close();
        return secoes;
    }

    public Secao buscarPorId(int id) {
        EntityManager em = JPAUtil.getEntityManager();
        Secao secao = em.find(Secao.class, id);
        em.close();
        return secao;
    }

    public void salvar(Secao secao) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(secao);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void atualizar(Secao secao) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(secao);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void remover(Secao secao) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.remove(em.contains(secao) ? secao : em.merge(secao));
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }
}

