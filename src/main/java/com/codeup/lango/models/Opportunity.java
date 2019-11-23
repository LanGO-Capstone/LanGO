package com.codeup.lango.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
@Table(name = "opportunities")
public class Opportunity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String title;

    @Column
    private String body;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    @JsonManagedReference
    private User creator;

    @Column
    private String address;

    @Column
    private LocalDateTime eventDate;

    @Column
    private LocalDateTime createdDate;

    @Column
    private boolean isActive;

    @ManyToOne
    @JoinColumn(name = "language_id")
    @JsonManagedReference
    private Language language;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "images_opportunities",
            joinColumns = {@JoinColumn(name = "opportunity_id")},
            inverseJoinColumns = {@JoinColumn(name = "image_id")}
    )
    @JsonManagedReference
    private List<Image> images;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "interestedusers_opportunities",
            joinColumns = {@JoinColumn(name = "opportunity_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    @JsonManagedReference
    private List<User> interestedUsers;

    public Opportunity() {
    }

    public Opportunity(String title, String datetime, String address, String body, String oppLanguage) {
        this.title = title;
        this.body = body;
        this.address = address;
        this.createdDate = LocalDateTime.now();
        this.isActive = true;

        // Format datetime String
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        StringBuilder formattedTime = new StringBuilder(datetime);
        formattedTime.setCharAt(10, ' ');
        this.eventDate = LocalDateTime.parse(formattedTime, formatter);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<User> getInterestedUsers() {
        return interestedUsers;
    }

    public void setInterestedUsers(List<User> interestedUsers) {
        this.interestedUsers = interestedUsers;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public void addInterestedUser(User user) {this.interestedUsers.add(user);}

    @Override
    public String toString() {
        return "Opportunity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                '}';
    }
}
