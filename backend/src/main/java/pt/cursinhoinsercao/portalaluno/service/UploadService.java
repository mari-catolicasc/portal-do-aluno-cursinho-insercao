package pt.cursinhoinsercao.portalaluno.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class UploadService {

    private static final String UPLOAD_BASE_DIR = "./uploads";

    public UploadService() {
        // Garante que a pasta base de uploads exista
        File uploadDir = new File(UPLOAD_BASE_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }
    }

    public String salvarImagem(InputStream fileInputStream, String originalFileName) throws IOException {
        return salvarFicheiro(fileInputStream, originalFileName, "imagens");
    }

    public String salvarFicheiro(InputStream fileInputStream, String originalFileName, String subpasta) throws IOException {

        Path uploadPath = Paths.get(UPLOAD_BASE_DIR, subpasta);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String extensao = "";

        int i = originalFileName.lastIndexOf('.');

        if (i > 0) {
            extensao = originalFileName.substring(i);
        }

        String nomeFicheiroUnico = UUID.randomUUID().toString() + extensao;

        Path caminhoDestino = uploadPath.resolve(nomeFicheiroUnico);

        Files.copy(fileInputStream, caminhoDestino, StandardCopyOption.REPLACE_EXISTING);

        return "/" + UPLOAD_BASE_DIR.replace("./", "").replace("\\", "/") + "/" + subpasta + "/" + nomeFicheiroUnico;
    }
}

