package com.codeup.lango.controllers;

import com.codeup.lango.Util.Password;
import com.codeup.lango.models.Image;
import com.codeup.lango.models.Language;
import com.codeup.lango.models.User;
import com.codeup.lango.repositories.LanguageRepository;
import com.codeup.lango.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    private UserRepository userDao;
    private LanguageRepository languageDao;

    @Autowired
    public UserController(UserRepository userDao, LanguageRepository languageDao) {
        this.languageDao = languageDao;
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

    @PostMapping("/api/users/{id}/edit")
    public void editUserDetails(@PathVariable long id,
//                                @RequestParam("email") String email,
                                @RequestParam("displayName") String displayName,
                                @RequestParam("location") String location,
                                @RequestParam("interests") String interests,
                                @RequestParam("aboutMe") String aboutMe,
                                @RequestParam("languages") String languages) {

        User user = userDao.findById(id).orElse(null);

        assert user != null;
//        user.setEmail(email);
        user.getUserDetails().setDisplayName(displayName);
        user.getUserDetails().setLocation(location);
        user.getUserDetails().setInterests(interests);
        user.getUserDetails().setAboutMe(aboutMe);

        String[] languageStrings = languages.split(",");
        List<Language> languageList = new ArrayList<>();

        for (String language : languageStrings) {
            languageList.add(languageDao.findByLanguage(language));
        }

        user.getUserDetails().setLanguages(languageList);

        userDao.save(user);
    }

    //    compares user to db and adds user session
    @PostMapping("/api/login")
    public String userLogin(HttpServletRequest request,
                          @RequestParam("email") String email,
                          @RequestParam("password") String password) {

        HttpSession session = request.getSession();
        User user = userDao.findUserByEmail(email);

        if (Password.check(password, user.getPassword())) {
            session.setAttribute("loggedInUser", user);
            return null;
        } else {
            return "invalid";
        }
    }

    //    gets user that is currently logged in the session
    @GetMapping("/api/loggedInUser")
    public User getLoggedInUser(HttpServletRequest request) {
        HttpSession session = request.getSession();

        if (session.getAttribute("loggedInUser") != null) {
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


    // register
    @PostMapping("/api/register")
    public void registerUser(HttpServletRequest request,
                             @RequestParam("email") String email,
                             @RequestParam("password") String password,
                             @RequestParam("displayName") String displayName,
                             @RequestParam("languages") String myLanguages) {

//        create user object from form parameters
        User newUser = new User(email, password, displayName);
        newUser.getUserDetails().setProfileImage(new Image());
        newUser.getUserDetails().getProfileImage().setUrl("none");

//        create user language preferences from form
        String[] languageStrings = myLanguages.split("\\s*,\\s*");
        List<Language> languageList = new ArrayList();

        for (String langName : languageStrings) {
            languageList.add(languageDao.findByLanguage(langName));
        }

        newUser.getUserDetails().setLanguages(languageList);

//         Save user in db
        userDao.save(newUser);
    }

    // User edits their profile image
    @PostMapping("/api/users/{id}/profileimage/edit")
    public void uploadNewProfileImage(@PathVariable long id, @RequestParam("imageUrl") String imageUrl) {

        User user = userDao.findById(id).orElse(null);

        user.getUserDetails().setProfileImage(new Image());
        user.getUserDetails().getProfileImage().setUrl(imageUrl);

        userDao.save(user);
    }
}