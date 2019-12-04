package com.codeup.lango.controllers;

import com.codeup.lango.models.Image;
import com.codeup.lango.models.Opportunity;
import com.codeup.lango.models.User;
import com.codeup.lango.repositories.ImageRepository;
import com.codeup.lango.repositories.LanguageRepository;
import com.codeup.lango.repositories.OpportunityRepository;
import com.codeup.lango.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
public class OpportunityController {

    private OpportunityRepository opportunityDao;
    private UserRepository userDao;
    private LanguageRepository languageDao;
    private ImageRepository imageDao;

    public OpportunityController(OpportunityRepository opportunityDao, UserRepository userDao, LanguageRepository languageDao, ImageRepository imageDao) {
        this.opportunityDao = opportunityDao;
        this.userDao = userDao;
        this.languageDao = languageDao;
        this.imageDao = imageDao;
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
                                  @RequestParam("oppLanguage") String oppLanguage,
                                  @RequestParam("fsHandle") String fsHandle) {

        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("loggedInUser");

        Opportunity newOpportunity = new Opportunity(title, datetime, address, body, oppLanguage);

        newOpportunity.setCreator(userDao.findById(user.getId()).orElse(null));
        newOpportunity.setLanguage(languageDao.findByLanguage(oppLanguage));

        if (!fsHandle.isEmpty()) {
            List<Image> oppImages = new ArrayList<>();
            Image image = new Image();

            image.setUrl("https://cdn.filestackcontent.com/" + fsHandle);
            oppImages.add(image);
            newOpportunity.setImages(oppImages);
        }

        opportunityDao.save(newOpportunity);
    }

    @PostMapping("/api/opportunities/{oppId}/delete")
    public void deleteOpportunity(@PathVariable long oppId) {
        Opportunity opportunity = opportunityDao.findById(oppId).orElse(null);
        List<User> oppInterestedUsers = opportunity.getInterestedUsers();

        for (int i = 0; i < oppInterestedUsers.size(); i++) {
            oppInterestedUsers.remove(oppInterestedUsers.get(i));
        }
        opportunity.setInterestedUsers(oppInterestedUsers);

        opportunityDao.deleteById(oppId);
    }

    @PostMapping("/api/users/{userId}/interestedin/{oppId}/add")
    public void interestedIn(@PathVariable long userId, @PathVariable long oppId) {

        User interestedUser = userDao.findById(userId).orElse(null);
        Opportunity opportunity = opportunityDao.findById(oppId).orElse(null);

        opportunity.addInterestedUser(interestedUser);
        interestedUser.addOpportunityInterestedIn(opportunity);

        userDao.save(interestedUser);
    }

    @PostMapping("/api/users/{userId}/interestedin/{oppId}/remove")
    public void uninterestedIn(@PathVariable long userId, @PathVariable long oppId) {

        User interestedUser = userDao.findById(userId).orElse(null);
        Opportunity opportunity = opportunityDao.findById(oppId).orElse(null);

        opportunity.removeInterestedUser(interestedUser);
        interestedUser.removeOpportunityInterestedIn(opportunity);

        userDao.save(interestedUser);
    }

    @PostMapping("/api/opportunities/{oppId}/edit")
    public void updateOpportunity(@PathVariable long oppId,
                                  @RequestParam("title") String title,
                                  @RequestParam("eventDate") String datetime,
                                  @RequestParam("address") String address,
                                  @RequestParam("body") String body) {

        Opportunity opportunity = opportunityDao.findById(oppId).orElse(null);

        opportunity.setTitle(title);

        if (datetime.equals("")) {
            LocalDateTime time = LocalDateTime.parse(datetime);
            opportunity.setEventDate(time);
        }

        opportunity.setAddress(address);
        opportunity.setBody(body);

        opportunityDao.save(opportunity);
    }

    @PostMapping("/api/opportunities/{oppId}/images/add")
    public void addOpportunityImage(@PathVariable long oppId,
                                    @RequestParam("fsHandle") String fsHandle) {

        Opportunity opportunity = opportunityDao.findById(oppId).orElse(null);
        List<Image> oppImages = opportunity.getImages();
        Image image = new Image();

        image.setUrl("https://cdn.filestackcontent.com/" + fsHandle);
        oppImages.add(image);
        opportunity.setImages(oppImages);

        opportunityDao.save(opportunity);
    }

    @PostMapping("/api/opportunities/{oppId}/images/{imageId}/delete")
    public void deleteOpportunityImage(@PathVariable long oppId, @PathVariable long imageId) {

        Opportunity opportunity = opportunityDao.findById(oppId).orElse(null);
        List<Image> oppImages = opportunity.getImages();
        Image image = imageDao.findById(imageId).orElse(null);

        oppImages.remove(image);
        opportunity.setImages(oppImages);

        imageDao.deleteById(imageId);

    }


}
