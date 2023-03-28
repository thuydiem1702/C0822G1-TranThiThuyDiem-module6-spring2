package com.be.controller.perfumeController;

import com.be.dto.IOrderDetail;
import com.be.model.cart.Cart;
import com.be.model.perfume.Perfume;
import com.be.service.ICartService;
import com.be.service.IPerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/api/perfume")
@RestController
public class PerfumeController {
    @Autowired
    private IPerfumeService perfumeService;

    @Autowired
    private ICartService cartService;

    @GetMapping("")
    public ResponseEntity<Page<Perfume>> getAllPerfume(@PageableDefault(size = 8) Pageable pageable, @RequestParam(required = false, defaultValue = "") String name) {
        Page<Perfume> perfumePage;
        if (name == null) {
            perfumePage = perfumeService.getAllPerfumeNoParam(pageable);
        } else {
            perfumePage = perfumeService.getAllPerfume(pageable, name);
        }
        if (perfumePage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(perfumePage, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<Perfume>> showList(
            @PageableDefault(size = 8) Pageable pageable) {
        Page<Perfume> perfumeList = perfumeService.findAll(pageable);
        if (perfumeList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(perfumeList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Perfume> delete(@PathVariable("id") Integer id) {
        Perfume perfume = perfumeService.findPerfume(id);
        if (perfume == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        perfumeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search/{id}/{type}")
    public ResponseEntity<Page<Perfume>> search(@PathVariable("id") int id, @PathVariable("type") String type, @PageableDefault(value = 5) Pageable pageable) {
        switch (id) {
            case 0:
                return this.showList(pageable);
            case 1:
                return new ResponseEntity<>(perfumeService.searchByName(type, pageable), HttpStatus.ACCEPTED);
            case 2:
                return new ResponseEntity<>(perfumeService.searchByPrice(Double.parseDouble(type), pageable), HttpStatus.ACCEPTED);
            case 3:
                return new ResponseEntity<>(perfumeService.searchByQuantity(Integer.parseInt(type), pageable), HttpStatus.ACCEPTED);
            default:
                return ResponseEntity.ok(null);
        }
    }

//    @PostMapping("/create")
//    public ResponseEntity<?> createPerfume(@RequestBody @Validated PerfumeDto perfumeDto, BindingResult bindingResult) {
//        Map<String, String> check = perfumeService.checkCreate(perfumeDto);
//        if (check.get("errorName") != null) {
//            bindingResult.rejectValue("name", "name", check.get("errorName"));
//        }
//        if (check.get("errorCode") != null) {
//            bindingResult.rejectValue("codeQr", "codeQr", check.get("errorCode"));
//        }
//        if (bindingResult.hasErrors()) {
//            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.NOT_MODIFIED);
//        }
//        Perfume perfume = new Perfume();
//        BeanUtils.copyProperties(perfumeDto, perfume);
//        perfumeService.addPerfume(perfume);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<Perfume> findById(@PathVariable("id") Integer id) {
        Perfume perfume = perfumeService.findPerfume(id);
        if (perfume == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(perfume, HttpStatus.OK);
    }

//    @PutMapping("/edit/{id}")
//    public ResponseEntity<?> editPerfume(@RequestBody @Validated PerfumeDto perfumeDto, BindingResult bindingResult, @PathVariable("id") Integer id) {
//        Perfume perfume = perfumeService.findPerfume(id);
//        Map<String, String> check = perfumeService.checkUpdate(perfumeDto);
//        if (check.get("errorName") != null) {
//            bindingResult.rejectValue("name", "name", check.get("errorName"));
//        }
//        if (check.get("errorCode") != null) {
//            bindingResult.rejectValue("code", "code", check.get("errorCode"));
//        }
//        if (bindingResult.hasErrors()) {
//            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.NOT_MODIFIED);
//        }
//        if (perfume == null) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        BeanUtils.copyProperties(perfumeDto, perfume);
//        perfumeService.editPerfume(perfume);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @GetMapping("/getList")
    public ResponseEntity<List<Perfume>> getList() {
        return new ResponseEntity<>(perfumeService.getList(), HttpStatus.OK);
    }

    @GetMapping("/addOderDetail/{idPerfume}/{idUser}")
    public ResponseEntity<?> addCart(@PathVariable("idPerfume") Long idPerfume, @PathVariable("idUser") Long idUser) {
        if (idUser != null && idPerfume != null) {
            perfumeService.addCart(idUser, idPerfume);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/get-cart/{idUser}")
    public ResponseEntity<Cart> getCart(@PathVariable("idUser") Long idUser) {
        Cart cart = cartService.getCartByIdUser(idUser);
        if (cart == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/get-perfume-in-cart/{idUser}")
    public ResponseEntity<List<IOrderDetail>> getPerfumeInCart(@PathVariable("idUser") Long idUser) {
        List<IOrderDetail> orderDetailList = cartService.getPerfumeInCart(idUser);
        if (orderDetailList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(orderDetailList, HttpStatus.OK);
    }

    @GetMapping("/pay-perfume/{idUser}")
    public ResponseEntity<?> payPerfume(@PathVariable("idUser") Long idUser) {
        cartService.payPerfume(idUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/change-quantity/{idUser}/{valueChange}/{idPerfume}")
    public ResponseEntity<?> changeQuantity(@PathVariable("idUser") Long idUser,
                                            @PathVariable("valueChange") Long valueChange,
                                            @PathVariable("idPerfume") Long idPerfume) {
        perfumeService.changeQuantity(idUser, valueChange, idPerfume);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
