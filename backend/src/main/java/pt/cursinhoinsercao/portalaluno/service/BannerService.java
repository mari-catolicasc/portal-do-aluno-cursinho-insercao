package pt.cursinhoinsercao.portalaluno.service;

import pt.cursinhoinsercao.portalaluno.dao.BannerDAO;
import pt.cursinhoinsercao.portalaluno.entity.Banner;
import pt.cursinhoinsercao.portalaluno.util.JPAUtil;

import javax.persistence.EntityManager;
import java.util.List;

public class BannerService {

    private BannerDAO bannerDAO = new BannerDAO();
    private static final int MAX_BANNERS_HISTORICO = 5;

    public Banner buscarBannerAtivo() {
        return bannerDAO.buscarAtivo();
    }

    public List<Banner> listarHistorico() {
        return bannerDAO.listarHistorico();
    }

    //Cria um novo banner, desativa o antigo e gere o histórico.
    public void criarNovoBanner(Banner novoBanner) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();

            //Desativa todos os banners existentes
            bannerDAO.desativarTodos(em);

            //Define o novo banner como ativo e salva
            novoBanner.setAtivo(true);
            em.persist(novoBanner);

            //Verifica e remove o banner mais antigo se o limite for excedido
            long total = (Long) em.createQuery("SELECT COUNT(b) FROM Banner b").getSingleResult();

            if (total > MAX_BANNERS_HISTORICO) {
                Banner maisAntigo = em.createQuery("SELECT b FROM Banner b ORDER BY b.dataCriacao ASC", Banner.class)
                        .setMaxResults(1)
                        .getSingleResult();
                em.remove(maisAntigo);
            }

            em.getTransaction().commit();

        } catch (Exception e) {

            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }

            e.printStackTrace();

            throw e;

        } finally {
            em.close();
        }
    }

    //Reativa um banner do histórico.
    public void reativarBannerDoHistorico(int id) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();

            //Desativa todos os banners existentes
            bannerDAO.desativarTodos(em);

            //Busca o banner a ser reativado
            Banner bannerParaReativar = em.find(Banner.class, id);
            if (bannerParaReativar != null) {

                bannerParaReativar.setAtivo(true);
                em.merge(bannerParaReativar);
            } else {

                throw new RuntimeException("Banner com ID " + id + " não encontrado.");
            }

            em.getTransaction().commit();

        } catch (Exception e) {

            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }

            e.printStackTrace();

            throw e;

        } finally {
            em.close();
        }
    }
}

