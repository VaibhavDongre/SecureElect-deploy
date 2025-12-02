package com.learning.secureelect.service;

import com.learning.secureelect.entity.Candidate;
import com.learning.secureelect.entity.Election;

import java.util.List;

public interface CandidateService {

    Candidate addCandidateToElection(Long electionId, Candidate candidate);

    List<Candidate> getCandidatesByElection(Long electionId);

    void removeCandidate(Long candidateId);
}
