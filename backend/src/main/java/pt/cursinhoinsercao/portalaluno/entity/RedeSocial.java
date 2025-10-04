package pt.cursinhoinsercao.portalaluno.entity;

import javax.persistence.*;

@Entity
@Table(name = "redes_sociais")
public class RedeSocial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "imagem")
    private String imagem;

    @Column(name = "texto")
    private String texto;

    @Column(name = "link")
    private String link;

    public RedeSocial() {
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagem() {
        return this.imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public String getTexto() { return this.texto; }

    public void setTexto(String texto) { this.texto = texto; }

    public String getLink() { return this.link; }

    public void setLink(String link) { this.link = link; }
}