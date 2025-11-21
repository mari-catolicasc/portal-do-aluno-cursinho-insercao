package pt.cursinhoinsercao.portalaluno.dao;

import pt.cursinhoinsercao.portalaluno.entity.RedeSocial;
import pt.cursinhoinsercao.portalaluno.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class RedeSocialDAO {

    public void salvar(RedeSocial redeSocial) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(redeSocial);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void atualizar(RedeSocial redeSocial) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(redeSocial);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void remover(RedeSocial redeSocial) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.remove(em.contains(redeSocial) ? redeSocial : em.merge(redeSocial));
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public RedeSocial buscarPorId(int id) {
        EntityManager em = JPAUtil.getEntityManager();
        RedeSocial redeSocial = em.find(RedeSocial.class, id);
        em.close();
        return redeSocial;
    }

    public List<RedeSocial> buscarTodas() {
        EntityManager em = JPAUtil.getEntityManager();
        String jpql = "SELECT r FROM RedeSocial r ORDER BY r.texto";
        TypedQuery<RedeSocial> query = em.createQuery(jpql, RedeSocial.class);
        List<RedeSocial> redes = query.getResultList();
        em.close();
        return redes;
    }
}
