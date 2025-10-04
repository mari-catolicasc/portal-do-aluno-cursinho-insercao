package pt.cursinhoinsercao.portalaluno.dto;

import javax.persistence.*;

public class RedeSocialDTO {
    private String imagem;
    private String texto;
    private String link;

    public String getImagem() {
        return this.imagem;
    }

    public String getTexto() { return this.texto; }

    public String getLink() { return this.link; }
}