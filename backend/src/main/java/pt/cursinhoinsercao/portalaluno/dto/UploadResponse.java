package pt.cursinhoinsercao.portalaluno.dto;

public class UploadResponse {
    private String filePath;

    public UploadResponse(String filePath) {
        this.filePath = filePath;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
