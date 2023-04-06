package com.be.repository;

import com.be.model.perfume.Perfume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface IPerfumeRepository extends JpaRepository<Perfume, Integer> {
    @Modifying
    @Transactional
    @Query(value = "insert into perfume" +
            "(`name`, " +
            "id_trademark, " +
            "id_fragrant, " +
            "id_concentration, " +
            "id_category, " +
            "price," +
            "image, " +
            "description, " +
            "quantity," +
            "flag_delete) " +
            "values " +
            "(:#{#perfume.name}, " +
            ":#{#perfume.trademark.idTrademark}, " +
            ":#{#perfume.fragrant.idFragrant}, " +
            ":#{#perfume.concentration.idConcentration}, " +
            ":#{#perfume.category.idCategory}, " +
            ":#{#perfume.price}, " +
            ":#{#perfume.image}, " +
            ":#{#perfume.description}, " +
            ":#{#perfume.quantity}," +
            ":#{#perfume.flagDelete})",
            nativeQuery = true)
    void addPerfume(@Param("perfume") Perfume perfume);

    @Query(value = "select * from perfume where perfumeee.perfume.id_perfume = :id and flag_delete = false",
            nativeQuery = true)
    Perfume findPerfume(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "update perfume set " +
            "`name` =:#{#perfume.name}, " +
            "id_trademark =:#{#perfume.trademark.idTrademark}, " +
            "id_fragrant =:#{#perfume.fragrant.idFragrant}, " +
            "id_concentration =:#{#perfume.concentration.idConcentration}, " +
            "id_category =:#{#perfume.category.idCategory}, " +
            "price =:#{#perfume.price}, " +
            "image =:#{#perfume.image}, " +
            "description =:#{#perfume.description}, " +
            "quantity =:#{#perfume.quantity}, " +
            "where id =:#{#perfume.idPerfume} " +
            "and flag_delete = false ",
            nativeQuery = true)
    void editPerfume(@Param("perfume") Perfume perfume);

    @Query(value = "select * from perfume where flag_delete = false order by perfumeee.perfume.id_perfume desc ", nativeQuery = true)
    Page<Perfume> showListPerfume(Pageable pageable);

    @Query(value = "select * from perfume where name like concat ('%':name'%') and flag_delete = false  order by perfumeee.perfume.id_perfume desc", nativeQuery = true)
    Page<Perfume> searchByName(@Param("name") String name, Pageable pageable);

    @Query(value = "select * from perfume where price like concat ('%':price'%') and flag_delete = false order by perfumeee.perfume.id_perfume desc", nativeQuery = true)
    Page<Perfume> searchByPrice(@Param("price") double price, Pageable pageable);

    @Query(value = "select * from perfume where quantity = :quantity and flag_delete = false ", nativeQuery = true)
    Page<Perfume> searchByQuantity(@Param("quantity") int quantity, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "update perfume  set flag_delete = true" +
            " where id_perfume = :idPerfume", nativeQuery = true)
    void deletePerfume(@Param("idPerfume") Integer idPerfume);

    @Query(value = "select * from perfume where perfume.name like concat('%', :name, '%') order by perfumeee.perfume.quantity desc ", nativeQuery = true)
    Page<Perfume> getAllPerfume(Pageable pageable, @Param("name") String name);

    @Query(value = "select * from perfume ", nativeQuery = true)
    Page<Perfume> getAllPerfumeNoParam(Pageable pageable);

    @Query(value = "select * from `perfume` where name like concat('%',:name,'%')", nativeQuery = true)
    Page<Perfume> searchPerfume(@Param("name") String name, Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT c.* , ifnull(sum(ifnull(wh.quantity,0))-ifnull(c.quantity,0),0) as quantity_sold" +
            " FROM `perfume` c left JOIN `ware_housing` wh on c.id = wh.perfume_id GROUP BY c.id having c.flag_delete = false " +
            "ORDER BY quantity_sold")
    Page<Perfume> getPerfumeByQuantity(Pageable pageable, @Param("limit") Integer limit);

    @Query(value = "select * from perfume ", nativeQuery = true)
    List<Perfume> getList();

    @Modifying
    @Query(value = "INSERT INTO `perfumeee`.`cart` (`user_id`,flag) VALUES (:idUser,false)", nativeQuery = true)
    void addCart(@Param("idUser") Long idUser);

    @Modifying
    @Query(value = "INSERT INTO `perfumeee`.`order_detail` (`cart_id`, `id_perfume`,flag,quantity) VALUES (:idCart, :idPerfume,false,1)", nativeQuery = true)
    void addOrderDetail(@Param("idCart") Long idCart, @Param("idPerfume") Long idPerfume);
}
