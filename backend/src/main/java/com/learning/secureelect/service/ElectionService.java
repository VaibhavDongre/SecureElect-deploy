package com.learning.secureelect.service;

import com.learning.secureelect.entity.Candidate;
import com.learning.secureelect.entity.Election;

import java.util.List;
import java.util.Map;

public interface ElectionService {

    Election createElection(Election election);

    List<Election> getAllElection();

    Election getElectionById(Long id);

    Election startElection(Long id);

    Election endElection(Long id);

    List<Candidate> getResults(Long electionId);

    Map<String, Object> getElectionStats(Long electionId);
}
