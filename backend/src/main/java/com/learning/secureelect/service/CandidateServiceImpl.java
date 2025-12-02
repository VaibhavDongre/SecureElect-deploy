package com.learning.secureelect.service;

import com.learning.secureelect.entity.Candidate;
import com.learning.secureelect.entity.Election;
import com.learning.secureelect.repository.CandidateRepository;
import com.learning.secureelect.repository.ElectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateServiceImpl implements CandidateService{

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ElectionRepository electionRepository;


    @Override
    public Candidate addCandidateToElection(Long electionId, Candidate candidate) {
        Election election = electionRepository.findById(electionId)
                .orElseThrow(()->new RuntimeException("Election not found"));

        candidate.setElection(election);
        candidate.setVotes(0);
        return candidateRepository.save(candidate);
    }

    @Override
    public List<Candidate> getCandidatesByElection(Long electionId) {
        electionRepository.findById(electionId)
                .orElseThrow(()->new RuntimeException("Election not found"));
        return candidateRepository.findByElectionId(electionId);
    }

    @Override
    public void removeCandidate(Long candidateId) {
        candidateRepository.findById(candidateId)
                .orElseThrow(()->new RuntimeException("Candidate not found"));
        candidateRepository.deleteById(candidateId);
    }
}
