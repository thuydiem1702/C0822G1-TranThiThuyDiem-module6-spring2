package com.be.service.impl;

import com.be.model.perfume.Concentration;
import com.be.repository.IConcentrationRepository;
import com.be.service.IConcentrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConcentrationService implements IConcentrationService {
    @Autowired
    private IConcentrationRepository concentrationRepository;

    @Override
    public List<Concentration> getAllConcentration() {
        return concentrationRepository.getAllConcentration();
    }
}
