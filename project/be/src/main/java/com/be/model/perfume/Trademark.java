package com.be.model.perfume;

import javax.persistence.*;

@Entity
public class Trademark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_trademark")
    private Integer idTrademark;
    private String name;

    public Trademark() {
    }

    public Trademark(Integer idTrademark, String name) {
        this.idTrademark = idTrademark;
        this.name = name;
    }

    public Integer getIdTrademark() {
        return idTrademark;
    }

    public void setIdTrademark(Integer idTrademark) {
        this.idTrademark = idTrademark;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
