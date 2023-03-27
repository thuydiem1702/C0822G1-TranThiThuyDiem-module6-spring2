package com.be.controller;

import com.be.model.perfume.Perfume;
import com.be.service.IPerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private IPerfumeService perfumeService;

    @GetMapping("search")
    public ResponseEntity<?> searchPerfume(@RequestParam(name = "name", defaultValue = "", required = false) String name, @PageableDefault(size = 4) Pageable pageable) {
        if (name.equals("null")) {
            name = "";
        }
        Page<Perfume> perfumePage = perfumeService.getAllPerfume(pageable, name);
        if (perfumePage.getTotalElements() == 0) {
            return new ResponseEntity<>( name , HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(perfumePage, HttpStatus.OK);
    }
    @GetMapping("quantity")
    public ResponseEntity<Page<Perfume>> pageResponseEntityByQuantity(@PageableDefault(value = 5) Pageable pageable) {
        Page<Perfume> perfumePage = perfumeService.getPerfumeByQuantity(pageable);
        return new ResponseEntity<>(perfumePage, HttpStatus.OK);
    }
}
