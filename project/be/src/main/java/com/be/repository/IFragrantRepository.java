package com.be.repository;

import com.be.model.perfume.Fragrant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IFragrantRepository extends JpaRepository<Fragrant, Integer> {
    @Query(value = "select * from fragrant", nativeQuery = true)
    List<Fragrant> getAllFragrant();

}
