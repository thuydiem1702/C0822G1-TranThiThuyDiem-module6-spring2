package com.be.controller.perfumeController;

import com.be.dto.IOrderDetail;
import com.be.dto.ITotalCart;
import com.be.dto.OderDetailDto;
import com.be.model.cart.Cart;
import com.be.model.cart.OrderDetail;
import com.be.model.perfume.Perfume;
import com.be.model.user.User;
import com.be.service.ICartService;
import com.be.service.IPerfumeService;
import com.be.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequestMapping("/api/perfume")
@RestController
public class PerfumeController {
    @Autowired
    private IPerfumeService perfumeService;

    @Autowired
    private ICartService cartService;

    @Autowired
    private IUserService iUserService;

    @Autowired
    private ICartService iCartService;

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

    @GetMapping("/{id}")
    public ResponseEntity<Perfume> findById(@PathVariable("id") Integer id) {
        Perfume perfume = perfumeService.findPerfume(id);
        if (perfume == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(perfume, HttpStatus.OK);
    }

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

    @GetMapping("total")
    public ResponseEntity<ITotalCart> totalCart(@RequestParam(defaultValue = "") int idAccount) {
        Optional<User> user = iUserService.findByIdAccount(idAccount);
        if (user.isPresent()) {
            ITotalCart iCartDto = iCartService.totalCart(user.get());
            if (iCartDto != null) {
                return new ResponseEntity<>(iCartDto, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/{idOrderDetail}")
    public ResponseEntity<Cart> delete(@PathVariable("idOrderDetail") Long idOrderDetail) {
        iCartService.deletePerfumeByIdOrder(idOrderDetail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/payment")
    public ResponseEntity<?> updatePaymentStatus(@RequestBody List<OderDetailDto> orderDetails) {
        for (OderDetailDto o : orderDetails) {
            cartService.updatePaymentStatus(o.getId());
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
