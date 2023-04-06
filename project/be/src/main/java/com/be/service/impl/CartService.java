package com.be.service.impl;

import com.be.dto.IOrderDetail;
import com.be.dto.ITotalCart;
import com.be.model.cart.Cart;
import com.be.model.user.User;
import com.be.repository.ICartRepository;
import com.be.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class CartService implements ICartService {
    @Autowired
    private ICartRepository iCartRepository;

    @Override
    public Cart getCartByIdUser(Long idUser) {
        return iCartRepository.getCartByIdUser(idUser);
    }

        @Override
    public List<IOrderDetail> getPerfumeInCart(Long idUser , String value) {
        if (value.equals("history")) {
            return iCartRepository.getCartHistory(idUser);
        }
        return iCartRepository.getPerfumeInCart(idUser);
    }
//    @Override
//    public List<IOrderDetail> getPerfumeInCart(Long idUser) {
//        return iCartRepository.getPerfumeInCart(idUser);
//    }

    @Override
    public void payPerfume(Long idUser) {
        iCartRepository.payPerfume(idUser);
    }

    @Override
    public void increaseQuantity(Long idOrderDetail) {
//        List<IOrderDetail> orderDetailList= iCartRepository.getPerfumeInCart();
    }

    @Override
    public ITotalCart totalCart(User user) {
        return iCartRepository.totalCostUser(user.getId());
    }

    @Override
    public void deletePerfumeByIdOrder(Long idOrderDetail) {
        iCartRepository.deletePerfumeByIdOrder(idOrderDetail);
    }

    @Override
    public Optional<Cart> findById(Long id) {
        return iCartRepository.findById(id);
    }

    @Override
    public void updatePaymentStatus(Long idOrderDetail) {
        iCartRepository.updatePaymentStatus(idOrderDetail);
    }


}
