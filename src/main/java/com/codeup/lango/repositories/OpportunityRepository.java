package com.codeup.lango.repositories;

import com.codeup.lango.models.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {

}
