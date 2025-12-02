package com.learning.secureelect.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class Election {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private boolean active; //true means election open
    private boolean completed; //true means results calculated

    @Column(nullable = false)
    private Boolean archived = false; //for delete

    //cascade means if any operation happens on election then candidate will automatically be affected
    //means if election is deleted all the candidates in it will also be deleted
    @OneToMany(mappedBy = "election", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Candidate> candidates;


    //This will create a new table-->election_eligible_voters
    //It will store pairs: (election_id, user_id)
    //Means:This user is eligible for this election
    @ManyToMany
    @JoinTable(
            name = "election_eligible_voters",
            joinColumns = @JoinColumn(name = "election_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> eligibleVoters = new HashSet<>();
}


