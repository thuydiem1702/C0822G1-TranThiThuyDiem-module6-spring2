package com.be.controller.perfumeController;

import com.be.model.perfume.Category;
import com.be.model.perfume.Concentration;
import com.be.service.ICategoryService;
import com.be.service.IConcentrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/concentration")
public class ConcentrationController {
    @Autowired
    private IConcentrationService concentrationService;

    @GetMapping("")
    public ResponseEntity<List<Concentration>> getAllCategory() {
        List<Concentration> concentrations = concentrationService.getAllConcentration();
        if (concentrations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(concentrations, HttpStatus.OK);
    }
}
