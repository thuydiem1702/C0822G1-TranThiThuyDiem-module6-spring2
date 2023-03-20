package com.be.repository;

import com.be.model.user.Role;
import com.be.model.user.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoleRepository extends JpaRepository<Role,Integer> {
    Optional<Role> findByName(RoleName name);
    @Query(value = "select r.* from role r where r.name = 'ROLE_ADMIN'",nativeQuery = true)
    Optional<Role>  roleAdmin();
    @Query(value = "select r.* from role r where r.name = 'ROLE_CUSTOMER'",nativeQuery = true)
    Optional<Role> roleCustomer();
}
