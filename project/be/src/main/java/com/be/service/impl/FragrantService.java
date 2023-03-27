package com.be.service.impl;

import com.be.model.perfume.Fragrant;
import com.be.repository.IFragrantRepository;
import com.be.service.IFragrantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FragrantService implements IFragrantService {
    @Autowired
    private IFragrantRepository fragrantRepository;

    @Override
    public List<Fragrant> getAllFragrant() {
        return fragrantRepository.getAllFragrant();
    }
}
