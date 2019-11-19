package com.codeup.lango.controllers;

import com.codeup.lango.Util.Password;
import com.codeup.lango.models.User;
import com.codeup.lango.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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


//    compares user to db and adds user session
    @PostMapping("/api/login")
    public void userLogin(HttpServletRequest request,
                          @RequestParam("email") String email,
                          @RequestParam("password") String password){
        HttpSession session = request.getSession();
        User user = userDao.findUserByEmail(email);

        System.out.println("Email: " + email);
        System.out.println("Password: " + password);
//        updated repo
//        if (Password.check(password, user.getPassword())){
//            session.setAttribute("loggedInUser", user);
//            System.out.println("logged in");
//        } else {
//            throw new RuntimeException("invalid entry");
//        }
    }

//    gets user that is currently logged in the session
    @GetMapping("/api/loggedInUser")
    public User getLoggedInUser(HttpServletRequest request) {
        HttpSession session = request.getSession();

        if (session.getAttribute("loggedInUser") !=null) {
            return (User) session.getAttribute("loggedInUser");
        }
        return null;
    }

//    logs user out invalidates session
    @PostMapping("/api/logout")
    public void userLogout(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.invalidate();
    }

}
