package com.learning.secureelect.controller;

import com.learning.secureelect.dto.UserElectionDTO;
import com.learning.secureelect.entity.Candidate;
import com.learning.secureelect.entity.Election;
import com.learning.secureelect.entity.User;
import com.learning.secureelect.jwt.JwtUtil;
import com.learning.secureelect.repository.ElectionRepository;
import com.learning.secureelect.repository.UserRepository;
import com.learning.secureelect.repository.VoterRecordRepository;
import com.learning.secureelect.service.ElectionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private ElectionRepository electionRepository;

    @Autowired
    private VoterRecordRepository  voterRecordRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ElectionService electionService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/elections")
    public ResponseEntity<?> getUserElection(HttpServletRequest request) {
        //Extract email from token
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User not found"));

        Long userId = user.getId();

        //Fetch all elections
        List<Election> elections = electionRepository.findAll();

        List<UserElectionDTO> response = elections.stream().map(el->{

            UserElectionDTO dto = new UserElectionDTO();
            dto.setId(el.getId());
            dto.setTitle(el.getTitle());
            dto.setDescription(el.getDescription());
            dto.setActive(el.isActive());
            dto.setCompleted(el.isCompleted());

            //Check if user has voted in this election
            boolean voted = voterRecordRepository.existsByUserIdAndElectionId(userId, el.getId());
            dto.setHasVoted(voted);

            return dto;

        }).toList();

        return ResponseEntity.ok(response);

//        List<Election> list = electionRepository.findAll()
//                .stream()
//                .filter(e->e.getEligibleVoters()
//                        .stream()
//                        .anyMatch(u->u.getId().equals(userId)))
//                .collect(Collectors.toList());
//
//        //return list;
//
//        return ResponseEntity.ok(list);
    }

    @GetMapping("/elections/{id}/results")
    public ResponseEntity<?> getResultsForUser(@PathVariable Long id){
        List<Candidate> list = electionService.getResults((id));
        return ResponseEntity.ok(list);

    }
}
