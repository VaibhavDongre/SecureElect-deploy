package com.learning.secureelect.service;

import com.learning.secureelect.entity.Candidate;
import com.learning.secureelect.entity.Election;
import com.learning.secureelect.repository.CandidateRepository;
import com.learning.secureelect.repository.ElectionRepository;
import com.learning.secureelect.repository.VoterRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ElectionServiceImpl implements ElectionService{

    @Autowired
    private ElectionRepository electionRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private VoterRecordRepository voterRecordRepository;

    @Override
    public Election createElection(Election election) {
        //to check if title already exists
        if (electionRepository.findByTitle(election.getTitle()).isPresent()) {
            throw new RuntimeException("Election with this title already exist");
        }

        election.setActive(false);
        election.setCompleted(false);

        return electionRepository.save(election);
    }

    @Override
    public List<Election> getAllElection() {
        return electionRepository.findAll();
    }

    @Override
    public Election getElectionById(Long id) {
        return electionRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Election not found"));
    }

    @Override
    public Election startElection(Long id) {
        Election election = getElectionById(id);
        election.setActive(true);
        return electionRepository.save(election);
    }

    @Override
    public Election endElection(Long id) {
        Election election = getElectionById(id);
        election.setActive(false);
        election.setCompleted(true);
        return electionRepository.save(election);
    }

    @Override
    public List<Candidate> getResults(Long electionId) {
        Election election = electionRepository.findById(electionId)
                .orElseThrow(()->new RuntimeException("Election not found"));

        if(!election.isCompleted()) {
            throw new RuntimeException("Results are only available after election completion.");
        }

        List<Candidate> candidates = candidateRepository.findByElectionId(electionId);

        return candidates.stream()
                .sorted((c1, c2)->Integer.compare(c2.getVotes(), c1.getVotes()))
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getElectionStats(Long electionId) {
        Election election = electionRepository.findById(electionId)
                .orElseThrow(()->new RuntimeException("Election not found"));

        List<Candidate> candidates = candidateRepository.findByElectionId(electionId);

        long totalVotes = candidates.stream()
                .mapToLong(Candidate::getVotes)
                .sum();

        long totalVoters = voterRecordRepository.count();

        long candidateCount = candidates.size();

        Map<String, Object> stats = new HashMap<>();

        stats.put("electionId", electionId);
        stats.put("title", election.getTitle());
        stats.put("totalVotes", totalVotes);
        stats.put("candidateCount", candidateCount);
        stats.put("totalVoterRecords", totalVoters);
        stats.put("completed", election.isCompleted());
        return stats;
    }
}
