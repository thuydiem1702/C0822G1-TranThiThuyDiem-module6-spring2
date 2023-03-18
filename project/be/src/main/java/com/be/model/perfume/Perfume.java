package com.be.model.perfume;

import javax.persistence.*;

@Entity
public class Perfume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPerfume;
    @Column(unique = true, length = 255)
    private String name;
    private Double price;
    private String description;
    private Integer quantity;
    private String image;
    private Boolean flagDelete;

    @ManyToOne()
    @JoinColumn(name = "id_category", nullable = false, referencedColumnName = "id_category")
    private Category category;

    @ManyToOne()
    @JoinColumn(name = "id_concentration", nullable = false, referencedColumnName = "id_concentration")
    private Concentration concentration;

    @ManyToOne()
    @JoinColumn(name = "id_fragrant", nullable = false, referencedColumnName = "id_fragrant")
    private Fragrant fragrant;

    @ManyToOne()
    @JoinColumn(name = "id_trademark", nullable = false, referencedColumnName = "id_trademark")
    private Trademark trademark;

    public Perfume() {
    }

    public Integer getIdPerfume() {
        return idPerfume;
    }

    public void setIdPerfume(Integer idPerfume) {
        this.idPerfume = idPerfume;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(Boolean flagDelete) {
        this.flagDelete = flagDelete;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Concentration getConcentration() {
        return concentration;
    }

    public void setConcentration(Concentration concentration) {
        this.concentration = concentration;
    }

    public Fragrant getFragrant() {
        return fragrant;
    }

    public void setFragrant(Fragrant fragrant) {
        this.fragrant = fragrant;
    }

    public Trademark getTrademark() {
        return trademark;
    }

    public void setTrademark(Trademark trademark) {
        this.trademark = trademark;
    }
}
