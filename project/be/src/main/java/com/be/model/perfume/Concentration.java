package com.be.model.perfume;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Concentration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idConcentration;
    private String name;

    public Concentration() {
    }

    public Concentration(Integer idConcentration, String name) {
        this.idConcentration = idConcentration;
        this.name = name;
    }

    public Integer getIdConcentration() {
        return idConcentration;
    }

    public void setIdConcentration(Integer idConcentration) {
        this.idConcentration = idConcentration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
