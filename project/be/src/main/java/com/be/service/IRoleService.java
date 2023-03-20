package com.be.service;


import com.be.model.user.Role;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> roleAdmin();
    Optional<Role> roleCustomer();
}
