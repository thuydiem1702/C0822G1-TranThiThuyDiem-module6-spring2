package com.be.service.impl;

import com.be.dto.IOrderDetail;
import com.be.model.cart.Cart;
import com.be.repository.ICartRepository;
import com.be.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CartService implements ICartService {
    @Autowired
    private ICartRepository iCartRepository;
    @Override
    public Cart getCartByIdUser(Long idUser) {
        return iCartRepository.getCartByIdUser(idUser);
    }
    @Override
    public List<IOrderDetail> getPerfumeInCart(Long idUser) {
        return iCartRepository.getPerfumeInCart(idUser);
    }

    @Override
    public void payPerfume(Long idUser) {
        iCartRepository.payPerfume(idUser);
    }
    @Override
    public void increaseQuantity(Long idOrderDetail) {
//        List<IOrderDetail> orderDetailList= iCartRepository.getWatchInCart()
    }
}
