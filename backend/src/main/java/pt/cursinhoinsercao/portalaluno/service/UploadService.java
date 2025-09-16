package pt.cursinhoinsercao.portalaluno.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class UploadService {

    private static final String UPLOAD_DIR = "./uploads";

    public UploadService() {
        // Garante que a pasta de uploads exista. Se não existir, cria-a.
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }
    }

    public String salvarImagem(InputStream fileInputStream, String originalFileName) throws IOException {
        String extensao = originalFileName.substring(originalFileName.lastIndexOf("."));
        String nomeFicheiroUnico = UUID.randomUUID().toString() + extensao;

        java.nio.file.Path caminhoDestino = Paths.get(UPLOAD_DIR, nomeFicheiroUnico);

        Files.copy(fileInputStream, caminhoDestino, StandardCopyOption.REPLACE_EXISTING);

        return "/" + UPLOAD_DIR.substring(2) + "/" + nomeFicheiroUnico;
    }
}
