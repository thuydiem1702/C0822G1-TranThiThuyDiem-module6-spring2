package com.be.repository;

import com.be.model.perfume.Concentration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IConcentrationRepository extends JpaRepository<Concentration, Integer> {
    @Query(value = "select * from concentration", nativeQuery = true)
    List<Concentration> getAllConcentration();

}
