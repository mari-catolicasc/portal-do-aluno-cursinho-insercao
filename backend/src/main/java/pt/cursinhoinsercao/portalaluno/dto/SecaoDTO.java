package pt.cursinhoinsercao.portalaluno.dto;

public class SecaoDTO {
    private String titulo;
    private String texto;
    private String imagem; // Pode ser o caminho do ficheiro ou null

    // Getters e Setters
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getTexto() {
        return texto;
    }
    public void setTexto(String texto) {
        this.texto = texto;
    }
    public String getImagem() {
        return imagem;
    }
    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}

