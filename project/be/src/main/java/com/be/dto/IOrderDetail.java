package com.be.dto;

public interface IOrderDetail {
    Long getIdOrder();

    Long getIdPerfume();

    String getPerfumeName();

    double getPrice();

    String getImage();

    int getQuantity();

    String createDate();

    double getMoney();
}
