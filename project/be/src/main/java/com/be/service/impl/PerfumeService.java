package com.be.service.impl;

import com.be.model.perfume.Perfume;
import com.be.repository.IPerfumeRepository;
import com.be.service.IPerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerfumeService implements IPerfumeService {
    @Autowired
    private IPerfumeRepository perfumeRepository;

    @Override
    public void addPerfume(Perfume perfume) {
        perfumeRepository.addPerfume(perfume);
    }

    @Override
    public Perfume findPerfume(Integer id) {
        return perfumeRepository.findPerfume(id);
    }

    @Override
    public void editPerfume(Perfume perfume) {
        perfumeRepository.editPerfume(perfume);
    }

    @Override
    public Page<Perfume> findAll(Pageable pageable) {
        return perfumeRepository.showListPerfume(pageable);
    }

    @Override
    public void delete(Integer id) {
        perfumeRepository.deletePerfume(id);
    }

    @Override
    public Page<Perfume> searchByQuantity(int quantity, Pageable pageable) {
        return perfumeRepository.searchByQuantity(quantity, pageable);
    }

    @Override
    public Page<Perfume> searchByPrice(double price, Pageable pageable) {
        return perfumeRepository.searchByPrice(price, pageable);
    }

    @Override
    public Page<Perfume> searchByName(String name, Pageable pageable) {
        return perfumeRepository.searchByName(name, pageable);
    }

    @Override
    public Page<Perfume> getAllPerfume(Pageable pageable, String name) {
        return perfumeRepository.getAllPerfume(pageable, name);
    }

    @Override
    public Page<Perfume> getAllPerfumeNoParam(Pageable pageable) {
        return perfumeRepository.getAllPerfumeNoParam(pageable);
    }

    @Override
    public Page<Perfume> getPerfumeByQuantity(Pageable pageable) {
        return perfumeRepository.getPerfumeByQuantity(pageable, 20);
    }

    @Override
    public List<Perfume> getList() {
        return perfumeRepository.getList();
    }
}
