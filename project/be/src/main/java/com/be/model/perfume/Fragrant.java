package com.be.model.perfume;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Fragrant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
