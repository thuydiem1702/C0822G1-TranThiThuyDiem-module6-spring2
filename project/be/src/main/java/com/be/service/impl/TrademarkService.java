package com.be.service.impl;

import com.be.model.perfume.Trademark;
import com.be.repository.ITrademarkRepository;
import com.be.service.ITrademarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrademarkService implements ITrademarkService {
    @Autowired
    private ITrademarkRepository trademarkRepository;

    @Override
    public List<Trademark> getAllTrademark() {
        return trademarkRepository.getAllTrademark();
    }
}
