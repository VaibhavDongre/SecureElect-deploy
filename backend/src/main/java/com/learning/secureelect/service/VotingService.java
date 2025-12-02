package com.learning.secureelect.service;

public interface VotingService {
    void castVote(Long userId, Long electionId, Long candidateId);
}
