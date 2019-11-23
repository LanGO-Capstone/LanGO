package com.codeup.lango.controllers;

import com.codeup.lango.models.Opportunity;
import com.codeup.lango.models.User;
import com.codeup.lango.repositories.LanguageRepository;
import com.codeup.lango.repositories.OpportunityRepository;
import com.codeup.lango.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class OpportunityController {

    private OpportunityRepository opportunityDao;
    private UserRepository userDao;
    private LanguageRepository languageDao;

    public OpportunityController(OpportunityRepository opportunityDao, UserRepository userDao, LanguageRepository languageDao) {
        this.opportunityDao = opportunityDao;
        this.userDao = userDao;
        this.languageDao = languageDao;
    }

    @GetMapping("/api/opportunities")
    public List<Opportunity> getAllOpportunities() {
        return opportunityDao.findAll();
    }

    @GetMapping("/api/opportunities/upcoming")
    public List<Opportunity> getAllUpcomingOpportunities() {
        return opportunityDao.findByEventDateAfterOrderByEventDate(LocalDateTime.now());
    }

    @GetMapping("/api/opportunities/{id}")
    public Opportunity getOpportunityById(@PathVariable long id) {
        // Use this method instead of .getOne to avoid issues
        return opportunityDao.findById(id).orElse(null);
    }

    @GetMapping("/api/users/{userId}/created")
    public List<Opportunity> getAllCreatedByUserId(@PathVariable long userId) {
        return opportunityDao.getAllCreatedByUserId(userId);
    }

    @GetMapping("/api/users/{userId}/interestedin")
    public List<Opportunity> getAllInterestedByUserId(@PathVariable long userId) {
        return opportunityDao.getAllInterestedByUserId(userId);
    }

    @PostMapping("/api/opportunities/create")
    public void createOpportunity(HttpServletRequest request,
                                  @RequestParam("title") String title,
                                  @RequestParam("datetime") String datetime,
                                  @RequestParam("address") String address,
                                  @RequestParam("body") String body,
                                  @RequestParam("oppLanguage") String oppLanguage) {


        HttpSession session = request.getSession();

        Opportunity newOpportunity = new Opportunity(title, datetime, address, body, oppLanguage);
//        hard code user id
        newOpportunity.setCreator(userDao.findById(1L).orElse(null));
        newOpportunity.setLanguage(languageDao.findByLanguage(oppLanguage));

        opportunityDao.save(newOpportunity);
    }

    @PostMapping("/api/opportunities/{oppId}/delete")
    public void deleteOpportunity(@PathVariable long oppId) {
        opportunityDao.deleteById(oppId);
    }

    @PostMapping("/api/users/{userId}/add/{oppId}")
    public void interestedIn(@PathVariable long userId, @PathVariable long oppId) {
        User interestedUser = userDao.findById(userId).orElse(null);
        Opportunity opportunity = opportunityDao.findById(oppId).orElse(null);

        opportunity.addInterestedUser(interestedUser);
        interestedUser.addOpportunityInterestedIn(opportunity);
        userDao.save(interestedUser);
//        opportunityDao.save(opportunityDao.findById(oppId).orElse(null));

    }
}
