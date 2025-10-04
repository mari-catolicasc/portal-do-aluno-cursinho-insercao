package pt.cursinhoinsercao.portalaluno.dao;

import pt.cursinhoinsercao.portalaluno.entity.RedeSocial;
import pt.cursinhoinsercao.portalaluno.util.JPAUtil;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class RedeSocialDAO {

    public List<RedeSocial> buscarTodas() {
        EntityManager em = JPAUtil.getEntityManager();
        String jpql = "SELECT rs FROM RedeSocial rs ORDER BY rs.id";
        TypedQuery<RedeSocial> query = em.createQuery(jpql, RedeSocial.class);
        List<RedeSocial> redes = query.getResultList();
        em.close();
        return redes;
    }

    public RedeSocial buscarPorId(int id) {
        EntityManager em = JPAUtil.getEntityManager();
        RedeSocial rede = em.find(RedeSocial.class, id);
        em.close();
        return rede;
    }

    public void salvar(RedeSocial rede) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(rede);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void atualizar(RedeSocial rede) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(rede);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void remover(RedeSocial rede) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.remove(em.contains(rede) ? rede : em.merge(rede));
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }
}
