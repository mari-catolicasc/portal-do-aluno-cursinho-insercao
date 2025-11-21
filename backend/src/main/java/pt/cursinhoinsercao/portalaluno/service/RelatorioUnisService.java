package pt.cursinhoinsercao.portalaluno.service;

import pt.cursinhoinsercao.portalaluno.dao.RelatorioUnisDAO;
import pt.cursinhoinsercao.portalaluno.entity.RelatorioUnis;

import java.io.File;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

public class RelatorioUnisService {

    private RelatorioUnisDAO relatorioUnisDAO = new RelatorioUnisDAO();

    private UploadService uploadService = new UploadService();

    public List<RelatorioUnis> listarTodos() {
        return relatorioUnisDAO.listarTodos();
    }

    public RelatorioUnis criar(InputStream fileInputStream, String nomeOriginal) throws Exception {

        String path = uploadService.salvarFicheiro(fileInputStream, nomeOriginal, "relatorios");

        RelatorioUnis novoRelatorio = new RelatorioUnis();
        novoRelatorio.setPath(path);
        novoRelatorio.setNomeOriginal(nomeOriginal);
        novoRelatorio.setDataUpload(LocalDateTime.now());

        relatorioUnisDAO.salvar(novoRelatorio);

        return novoRelatorio;
    }

    public void remover(int id) throws Exception {
        RelatorioUnis relatorio = relatorioUnisDAO.buscarPorId(id);
        if (relatorio == null) {
            throw new Exception("Relatório não encontrado com o ID: " + id);
        }

        relatorioUnisDAO.remover(relatorio);

        try {
            File ficheiroParaApagar = new File("." + relatorio.getPath());
            if (ficheiroParaApagar.exists()) {
                ficheiroParaApagar.delete();
            }
        } catch (Exception e) {
            System.err.println("Aviso: Falha ao apagar o ficheiro físico: " + relatorio.getPath());
            e.printStackTrace();
        }
    }
}
