package com.be.repository;

import com.be.model.perfume.Trademark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITrademarkRepository extends JpaRepository<Trademark, Integer> {
    @Query(value = "select * from trademark", nativeQuery = true)
    List<Trademark> getAllTrademark();

}
