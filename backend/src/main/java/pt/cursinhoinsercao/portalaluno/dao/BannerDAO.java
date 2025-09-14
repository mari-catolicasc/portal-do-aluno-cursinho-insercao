package pt.cursinhoinsercao.portalaluno.dao;

import pt.cursinhoinsercao.portalaluno.entity.Banner;
import pt.cursinhoinsercao.portalaluno.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.List;

public class BannerDAO {

    // Busca o banner que está atualmente marcado como ativo

    public Banner buscarAtivo(){
        EntityManager em = JPAUtil.getEntityManager();

        try{
            String jpql = "select b from Banner b where b.ativo = true";
            TypedQuery<Banner> query = em.createQuery(jpql, Banner.class);
            return query.getSingleResult();

        } catch (NoResultException e){
            return null;
        }finally {
            em.close();
        }
    }

    // Lista todos os banners para exibir no histórico do admin, do mais novo para o mais antigo

    public List<Banner> listarHistorico(){
        EntityManager em = JPAUtil.getEntityManager();
        try{
            String jpql = "select b from Banner b order by b.dataCriacao desc";
            TypedQuery<Banner> query = em.createQuery(jpql, Banner.class);
            return query.getResultList();
        }finally {
            em.close();
        }
    }

    // Salva um novo Banner na base de dados

    public void salvar(Banner banner){
        EntityManager em = JPAUtil.getEntityManager();

        try{
            em.getTransaction().begin();
            em.persist(banner);
            em.getTransaction().commit();
        } catch (Exception e){
            if(em.getTransaction().isActive()){
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        }finally {
            em.close();
        }
    }

    // Atualiza um Banner existente

    public void atualizar (Banner banner){
        EntityManager em = JPAUtil.getEntityManager();
        try{
            em.getTransaction().begin();
            em.merge(banner);
            em.getTransaction().commit();
        } catch (Exception e){
            if (em.getTransaction().isActive()){
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        }finally {
            em.close();
        }
    }

    // Remove um banner a base de dados

    public void deletar(Banner banner){
        EntityManager em = JPAUtil.getEntityManager();
        try{
            em.getTransaction().begin();

            Banner bannerParaDeletar = em.contains(banner) ? banner : em.merge(banner);
            em.remove(bannerParaDeletar);
            em.getTransaction().commit();
        } catch (Exception e){
            if (em.getTransaction().isActive()){
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        }finally {
            em.close();
        }
    }

    // Conta o número total de banner na base de dados

    public long contarBanners(){
        EntityManager em = JPAUtil.getEntityManager();
        try{
            String jpql = "select count(b) from Banner b";
            return em.createQuery(jpql, Long.class).getSingleResult();
        }finally {
            em.close();
        }
    }

    // Encontra e remove o banner mais antigo da base de dados

    public void removerMaisAntigo(){
        EntityManager em = JPAUtil.getEntityManager();

        try{
            String jpql = "select b from Banner b order by b.dataCriacao asc";
            TypedQuery<Banner> query = em.createQuery(jpql, Banner.class).setMaxResults(1);
            Banner bannerMaisAntigo = query.getSingleResult();

            if (bannerMaisAntigo != null){
                em.getTransaction().begin();
                em.remove(bannerMaisAntigo);
                em.getTransaction().commit();
            }
        }catch (NoResultException e){

        }catch (Exception e){
            if (em.getTransaction().isActive()){
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            em.close();
        }
    }
}