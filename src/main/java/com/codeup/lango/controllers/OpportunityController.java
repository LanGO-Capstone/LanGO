package com.codeup.lango.controllers;

import com.codeup.lango.models.Opportunity;
import com.codeup.lango.repositories.OpportunityRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/api/opportunities/{id}")
    public Opportunity getOpportunityById(@PathVariable long id) {
        return opportunityDao.findById(id).orElse(null);
    }
}
