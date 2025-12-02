package com.learning.secureelect.service;

import com.learning.secureelect.entity.Candidate;
import com.learning.secureelect.entity.Election;
import com.learning.secureelect.entity.User;
import com.learning.secureelect.entity.VoterRecord;
import com.learning.secureelect.repository.CandidateRepository;
import com.learning.secureelect.repository.ElectionRepository;
import com.learning.secureelect.repository.UserRepository;
import com.learning.secureelect.repository.VoterRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VotingServiceImpl implements VotingService{

    @Autowired
    private ElectionRepository electionRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private VoterRecordRepository voterRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void castVote(Long userId, Long electionId, Long candidateId) {
        //to validate election
        Election election  = electionRepository.findById(electionId)
                .orElseThrow(()->new RuntimeException("Election do not exists"));

        //to check if election is active or ended
        if (!election.isActive()) {
            throw new RuntimeException("Election is closed");
        }

        //to validate candidate
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(()->new RuntimeException("Candidate not found"));

        //to check if candidate belongs to this election
        if(!candidate.getElection().getId().equals(electionId)) {
            throw new RuntimeException("Candidate does not belong to this election");
        }

        //to check if user already voted
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new RuntimeException("user not found"));

        //Check if user is eligible
        boolean isEligible = election.getEligibleVoters()
                .stream()
                .anyMatch(u->u.getId().equals(userId));

        //Create and save Voter Record
        VoterRecord record = new VoterRecord();
        record.setUser(user);
        record.setElection(election);
        record.setCandidate(candidate);
        record.setVotedAt(LocalDateTime.now());
        voterRecordRepository.save(record);

        //Increment candidate votes and save
        candidate.setVotes(candidate.getVotes() + 1);
        candidateRepository.save(candidate);
    }
}
