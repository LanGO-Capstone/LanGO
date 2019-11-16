package com.codeup.lango.repositories;

import com.codeup.lango.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
