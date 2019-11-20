package com.codeup.lango.controllers;

import com.codeup.lango.models.Language;
import com.codeup.lango.repositories.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LanguageController {

    private LanguageRepository languageDao;

    @Autowired
    public LanguageController(LanguageRepository languageDao) {
        this.languageDao = languageDao;
    }

    @GetMapping("/api/languages")
    public List<Language> getAllLanguages() {return languageDao.findAll(); }
}
