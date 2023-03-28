package com.be.service;

import com.be.dto.IOrderDetail;
import com.be.model.cart.Cart;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartService {
    Cart getCartByIdUser(@Param("idUser") Long idUser);

    List<IOrderDetail> getPerfumeInCart(Long iUser);


    void payPerfume(Long idUser);

    void increaseQuantity(@Param("idOrderDetail") Long idOrderDetail);
}
