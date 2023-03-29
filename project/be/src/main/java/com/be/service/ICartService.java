package com.be.service;

import com.be.dto.IOrderDetail;
import com.be.dto.ITotalCart;
import com.be.model.cart.Cart;
import com.be.model.user.User;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ICartService {
    Cart getCartByIdUser(@Param("idUser") Long idUser);

    List<IOrderDetail> getPerfumeInCart(Long iUser);

    void payPerfume(Long idUser);

    void increaseQuantity( Long idOrderDetail);

    ITotalCart totalCart(User user);

    void deletePerfumeByIdOrder( Long idOrderDetail);
    Optional<Cart> findById(Long id);
}
