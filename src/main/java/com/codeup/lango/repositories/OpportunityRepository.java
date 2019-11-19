package com.codeup.lango.repositories;

import com.codeup.lango.models.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {

    @Query(value = "SELECT * FROM opportunities WHERE creator_id = :userId",
            nativeQuery = true)
    List<Opportunity> getAllCreatedByUserId(@Param("userId") long userId);

    @Query(value = "SELECT * FROM opportunities WHERE id IN (SELECT opportunity_id from interestedusers_opportunities WHERE user_id = :userId)",
        nativeQuery = true)
    List<Opportunity> getAllInterestedByUserId(@Param("userId") long userId);


}
