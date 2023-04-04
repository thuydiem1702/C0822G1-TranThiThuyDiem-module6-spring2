package com.be.model.cart;

import com.be.model.perfume.Perfume;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private boolean flag;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "id_perfume", nullable = false, referencedColumnName = "id_perfume")
    private Perfume perfume;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false, referencedColumnName = "id")
    private Cart cart;

    public OrderDetail() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public Perfume getPerfume() {
        return perfume;
    }

    public void setPerfume(Perfume perfume) {
        this.perfume = perfume;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}
