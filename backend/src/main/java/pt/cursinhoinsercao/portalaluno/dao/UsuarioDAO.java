package pt.cursinhoinsercao.portalaluno.dao;

import pt.cursinhoinsercao.portalaluno.entity.Usuario;
import pt.cursinhoinsercao.portalaluno.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;

public class UsuarioDAO {

    public void salvar(Usuario usuario) {

        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(usuario);
            em.getTransaction().commit();

        } finally {
            em.close();
        }
    }

    public Usuario buscarPorId(int id) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            return em.find(Usuario.class, id);
        } finally {
            em.close();
        }
    }

    public Usuario buscarPorEmail(String email) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            String jpql = "SELECT u FROM Usuario u WHERE u.email = :email";
            TypedQuery<Usuario> query = em.createQuery(jpql, Usuario.class);
            query.setParameter("email", email); // Usar parâmetros previne SQL Injection
            return query.getSingleResult();

        } catch (NoResultException e) {
            return null;

        } finally {
            em.close();
        }
    }

    public List<Usuario> buscarTodos() {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            String jpql = "SELECT u FROM Usuario u";
            TypedQuery<Usuario> query = em.createQuery(jpql, Usuario.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public void atualizar(Usuario usuario) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(usuario);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void remover(Usuario usuario) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.remove(em.merge(usuario));
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public List<Usuario> listarProfessoresPorStatus(boolean statusAtivo) {
        EntityManager em = JPAUtil.getEntityManager();

        String jpql = "select u from Usuario u where u.tipo = 1 and u.ativo = :status";
        TypedQuery<Usuario> query = em.createQuery(jpql, Usuario.class);
        query.setParameter("status", statusAtivo);
        List<Usuario> professores = query.getResultList();
        em.close();
        return professores;
    }
}
