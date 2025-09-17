package pt.cursinhoinsercao.portalaluno.entity;

import javax.persistence.*;

@Entity
@Table(name = "secoes")
public class Secao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Adiciona o campo 'titulo' para corresponder à base de dados
    @Column(name = "titulo")
    private String titulo;

    @Column(name = "texto")
    private String texto;

    @Column(name = "imagem")
    private String imagem;

    // --- Getters e Setters ---

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Adiciona o getter e setter para o novo campo 'titulo'
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
