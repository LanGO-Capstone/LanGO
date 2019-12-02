package com.codeup.lango.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "userdetails")
public class UserDetails {

    @Id
    @Column(name = "id")
    private long id;

    @OneToOne
    @MapsId
    @JsonBackReference
    private User user;

    @Column
    private String displayName;

    @OneToOne(cascade = CascadeType.ALL)
    private Image profileImage;

    @Column
    private String location;

    @Column
    private String interests;

    @Column(length = 500)
    private String aboutMe;

    @Column(nullable = false)
    private LocalDate joinDate;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "userdetails_languages",
            joinColumns = {@JoinColumn(name = "userdetails_id")},
            inverseJoinColumns = {@JoinColumn(name = "language_id")}
    )
    @JsonManagedReference
    private List<Language> languages = new ArrayList<>();

    public UserDetails() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public Image getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(Image profileImage) {
        this.profileImage = profileImage;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(List<Language> languages) {
        this.languages = languages;
    }

    public void addLanguage(Language language) {
        this.languages.add(language);
    }

    @Override
    public String toString() {
        return "UserDetails{" +
                "id=" + id +
                ", displayName='" + displayName + '\'' +
                ", profileImage=" + profileImage +
                ", location='" + location + '\'' +
                ", interests='" + interests + '\'' +
                ", aboutMe='" + aboutMe + '\'' +
                ", joinDate=" + joinDate +
                ", languages=" + languages +
                '}';
    }
}
