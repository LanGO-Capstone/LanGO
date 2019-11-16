package com.codeup.lango.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.Email;
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

    @ManyToMany(mappedBy = "interestedUsers")
    @JsonBackReference
    private List<Opportunity> opportunitiesInterestedIn;

    public User() {
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
        this.password = password;
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
}
