package com.learning.secureelect.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String faction;

    private int votes = 0;

    @ManyToOne
    @JoinColumn(name = "election_id")
    @JsonBackReference
    private Election election;
}
