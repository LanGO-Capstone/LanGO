package com.codeup.lango.repositories;

import com.codeup.lango.models.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {

    List<Opportunity> findByEventDateAfterOrderByEventDate(LocalDateTime now);
}
