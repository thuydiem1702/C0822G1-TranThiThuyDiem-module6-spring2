package com.be.repository;

import com.be.dto.IOrderDetail;
import com.be.dto.ITotalCart;
import com.be.model.cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ICartRepository extends JpaRepository<Cart, Long> {
    @Query(value = "select * from cart where user_id = :idUser order by id desc limit 1", nativeQuery = true)
    Cart getCartByIdUser(@Param("idUser") Long idUser);

    @Query(value = "select od.id as idOrder, od.id_perfume as idPerfume ,p.name as perfumeName , p.price as price, p.image as image, od.quantity as quantity,p.price * od.quantity as money from user join cart c on user.id = c.user_id  join order_detail od on c.id = od.cart_id join perfume p on od.id_perfume = p.id_perfume where user.id = :idUser and od.flag = false", nativeQuery = true)
    List<IOrderDetail> getPerfumeInCart(@Param("idUser") Long idUser);

    @Modifying
    @Query(value = "update order_detail join cart c on c.id = order_detail.cart_id set order_detail.flag = true where c.user_id=:idUser", nativeQuery = true)
    void payPerfume(@Param("idUser") Long idUser);

    @Modifying
    @Query(value = "update order_detail set quantity= quantity + 1 where order_detail.id = :idOrderDetail", nativeQuery = true)
    void increaseQuantity(@Param("idOrderDetail") Long idOrderDetail);

    @Modifying
    @Query(value = "update order_detail set quantity= quantity - 1 where order_detail.id = :idOrderDetail", nativeQuery = true)
    void reduceQuantity(@Param("idOrderDetail") Long idOrderDetail);

    @Modifying
    @Query(value = "update order_detail set flag = true where order_detail.id = :idOrderDetail", nativeQuery = true)
    void deletePerfumeByIdOrder(@Param("idOrderDetail") Long idOrderDetail);

    @Query(value = "select sum(od.quantity*p.price) as totalCostUser, sum(od.quantity) as quantityUser from cart c join order_detail od on c.id = od.cart_id join perfume p on od.id_perfume = p.id_perfume where c.user_id = :idUser and od.flag= false",
            nativeQuery = true)
    ITotalCart totalCostUser(@Param("idUser") int idUser);

}
