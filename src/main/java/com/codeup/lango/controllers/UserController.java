package com.codeup.lango.controllers;

import com.codeup.lango.models.User;
import com.codeup.lango.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    private UserRepository userDao;

    @Autowired
    public UserController(UserRepository userDao) {
        this.userDao = userDao;
    }

    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @GetMapping("/api/users/{id}")
    public User getUserById(@PathVariable long id) {
        return userDao.findById(id).orElse(null);
    }
}
