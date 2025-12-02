package com.learning.secureelect.dto;

import lombok.Data;

@Data
public class UserElectionDTO {
    private Long id;
    private String title;
    private String description;
    private boolean active;
    private boolean completed;
    private boolean hasVoted;
}
