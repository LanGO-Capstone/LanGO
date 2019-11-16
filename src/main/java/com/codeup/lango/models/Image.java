package com.codeup.lango.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String url;

    @ManyToMany(mappedBy = "images")
    @JsonBackReference
    private List<Opportunity> opportunity;

    public Image() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<Opportunity> getOpportunity() {
        return opportunity;
    }

    public void setOpportunity(List<Opportunity> opportunity) {
        this.opportunity = opportunity;
    }
}
