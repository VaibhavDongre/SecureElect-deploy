package com.learning.secureelect.controller;

import com.learning.secureelect.entity.Candidate;
import com.learning.secureelect.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/elections")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @PostMapping("/{electionId}/candidates")
    public ResponseEntity<?> addCandidate(@PathVariable Long electionId, @RequestBody Candidate candidate) {
        Candidate saved = candidateService.addCandidateToElection(electionId, candidate);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/{electionId}/candidates")
    public ResponseEntity<?> getCandidates(@PathVariable Long electionId) {
        List<Candidate> saved = candidateService.getCandidatesByElection(electionId);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/candidates/{candidateId}")
    public ResponseEntity<?> deleteCandidate(@PathVariable Long candidateId) {
        candidateService.removeCandidate(candidateId);
        return ResponseEntity.noContent().build(); //returns 204 No content
    }
}
