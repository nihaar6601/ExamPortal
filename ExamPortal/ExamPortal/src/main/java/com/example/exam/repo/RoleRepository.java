package com.example.exam.repo;

import com.example.exam.model.Role;
import com.example.exam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface RoleRepository extends JpaRepository<Role,Long> {
}
