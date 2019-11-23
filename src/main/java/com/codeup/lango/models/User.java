package com.codeup.lango.models;

import com.codeup.lango.Util.Password;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    @Email
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private UserDetails userDetails;

    @OneToMany(mappedBy = "creator")
    @JsonBackReference
    private List<Opportunity> opportunitiesCreated;

    @ManyToMany(mappedBy = "interestedUsers", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Opportunity> opportunitiesInterestedIn;

    public User() {
    }

    //    for user login
    public User(String email, String password) {
        this.email = email;
        this.password = password;
        setPassword(password);
    }

    //for new user registration
    public User(String email, String password, String displayName) {
        this.email = email;
        this.password = password;
        this.userDetails = new UserDetails();
        this.userDetails.setUser(this);
        this.userDetails.setJoinDate(LocalDate.now());
        this.userDetails.setDisplayName(displayName);
        this.userDetails.setProfileImage(new Image());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = Password.encrypt(password);
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }

    public List<Opportunity> getOpportunitiesCreated() {
        return opportunitiesCreated;
    }

    public void setOpportunitiesCreated(List<Opportunity> opportunitiesCreated) {
        this.opportunitiesCreated = opportunitiesCreated;
    }

    public List<Opportunity> getOpportunitiesInterestedIn() {
        return opportunitiesInterestedIn;
    }

    public void setOpportunitiesInterestedIn(List<Opportunity> opportunitiesInterestedIn) {
        this.opportunitiesInterestedIn = opportunitiesInterestedIn;
    }

    public void addOpportunityInterestedIn(Opportunity opportunity) { this.opportunitiesInterestedIn.add(opportunity);}

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", userDetails=" + userDetails +
                ", opportunitiesCreated=" + opportunitiesCreated +
                ", opportunitiesInterestedIn=" + opportunitiesInterestedIn +
                '}';
    }
}
