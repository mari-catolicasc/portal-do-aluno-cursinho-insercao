package pt.cursinhoinsercao.portalaluno.service;

import pt.cursinhoinsercao.portalaluno.dao.BannerDAO;
import pt.cursinhoinsercao.portalaluno.entity.Banner;

import java.util.List;

public class BannerService {

    private BannerDAO bannerDAO = new BannerDAO();
    private static final int LIMITE_HISTORICO = 5;

    // Busca o banner que esta ativo
    public Banner buscarBannerAtivo(){
        return bannerDAO.buscarAtivo();
    }

    // Lista todos os banners do historico do admin
    public List<Banner> listarHistorico() {
        return bannerDAO.listarHistorico();
    }

    // Cria um novo banner, desativa o antigo e gera o limite do histórico
    public void criarNovoBanner(Banner novoBanner) {
        // Desativa o banner ativo atual, se existir
        Banner bannerAtivoAntigo = bannerDAO.buscarAtivo();
        if (bannerAtivoAntigo != null) {
            bannerAtivoAntigo.setAtivo(false);
            bannerDAO.atualizar(bannerAtivoAntigo);
        }

        // Prepara e salva o novo banner como ativo
        novoBanner.setAtivo(true);
        bannerDAO.salvar(novoBanner);

        // Verifica o limite do histórico e apaga o mais antigo se necessário
        long totalBanners = bannerDAO.contarBanners();
        if (totalBanners > LIMITE_HISTORICO) {
            bannerDAO.removerMaisAntigo();
        }
    }

    //Define um banner existente do histórico como o novo banner ativo
    public void reativarBannerDoHistorico(int idDoBannerParaAtivar) {
        // 1. Desativar o banner ativo atual.
        Banner bannerAtivoAntigo = bannerDAO.buscarAtivo();
        if (bannerAtivoAntigo != null) {
            bannerAtivoAntigo.setAtivo(false);
            bannerDAO.atualizar(bannerAtivoAntigo);
        }
    }
}
