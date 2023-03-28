package com.be.dto;

public interface IOrderDetail {
    Long getIdOrder();

    Long getIdPerfume();

    String getPerfumeName();

    double getPrice();

    int getQuantity();

    double getMoney();
}
