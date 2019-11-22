package com.codeup.lango.controllers;

import com.codeup.lango.models.Opportunity;
import com.codeup.lango.repositories.OpportunityRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class OpportunityController {

    private OpportunityRepository opportunityDao;

    public OpportunityController(OpportunityRepository opportunityDao) {
        this.opportunityDao = opportunityDao;
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


        System.out.println("title = " + title);
        System.out.println("datetime = " + datetime);
        System.out.println("address = " + address);
        System.out.println("body = " + body);
        System.out.println("oppLanguage = " + oppLanguage);
    }



}
