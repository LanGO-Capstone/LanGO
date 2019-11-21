package com.codeup.lango.controllers;

import com.codeup.lango.models.Opportunity;
import com.codeup.lango.repositories.OpportunityRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
}
