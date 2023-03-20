package com.be.model.perfume;

import javax.persistence.*;

@Entity
public class Fragrant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fragrant")
    private Integer idFragrant;
    private String name;

    public Fragrant() {
    }

    public Fragrant(Integer idFragrant, String name) {
        this.idFragrant = idFragrant;
        this.name = name;
    }

    public Integer getIdFragrant() {
        return idFragrant;
    }

    public void setIdFragrant(Integer idFragrant) {
        this.idFragrant = idFragrant;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
