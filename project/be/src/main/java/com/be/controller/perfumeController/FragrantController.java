package com.be.controller.perfumeController;

import com.be.model.perfume.Concentration;
import com.be.model.perfume.Fragrant;
import com.be.service.IConcentrationService;
import com.be.service.IFragrantService;
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
@RequestMapping("api/fragrant")
public class FragrantController {
    @Autowired
    private IFragrantService fragrantService;

    @GetMapping("")
    public ResponseEntity<List<Fragrant>> getAllFragrant() {
        List<Fragrant> fragrants = fragrantService.getAllFragrant();
        if (fragrants.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(fragrants, HttpStatus.OK);
    }
}
