package com.be.service;

import com.be.model.perfume.Perfume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IPerfumeService {
    void addPerfume(Perfume perfume);
    Perfume findPerfume(Integer id);
    void editPerfume(Perfume perfume);
    Page<Perfume> findAll(Pageable pageable);
    void delete(Integer id);
    Page<Perfume> searchByQuantity(int quantity, Pageable pageable);
    Page<Perfume> searchByPrice(double price, Pageable pageable);
    Page<Perfume> searchByName(String name, Pageable pageable);

    Page<Perfume> getAllPerfume(Pageable pageable, String name);

    Page<Perfume> getAllPerfumeNoParam(Pageable pageable);

    Page<Perfume> getPerfumeByQuantity(Pageable pageable);

    List<Perfume> getList();
}
