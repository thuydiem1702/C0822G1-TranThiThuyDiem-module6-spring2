package com.be.service.impl;

import com.be.model.user.Role;
import com.be.repository.IRoleRepository;
import com.be.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository iRoleRepository;
    @Override
    public Optional<Role> roleAdmin() {
        return iRoleRepository.roleAdmin();
    }
    @Override
    public Optional<Role> roleCustomer() {
        return iRoleRepository.roleCustomer();
    }

}
