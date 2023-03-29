package com.be.service;


import com.be.dto.request.UpdateUserForm;
import com.be.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    Optional<User> findByUsername(String username);

    void updateUser(UpdateUserForm updateUserForm);

    void changePassword(String password, String username);

    void save(User user);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    List<User> findAll();

    List<User> findAllCustomer();

    List<User> findAllAdmin();

    Page<User> findAllCustomer(Pageable pageable, String name, String address);

    Optional<User> findCustomerById(Integer id);

    Page<User> findAllCustomerNoParam(Pageable pageable);

    Page<User> findAll(String genderSearch, String ageSearch, Pageable pageable);
//    List<BillHistoryDTO> getUserHasBuy();

    User userLogin(String username);

    Optional<User> findByIdAccount(Integer idAccount);
}
