package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.MembershipPlan;
import com.example.demo.repository.MembershipPlanRepository;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/membership-plans")
public class MembershipPlanController {

    private final MembershipPlanRepository membershipPlanRepository;

    public MembershipPlanController(MembershipPlanRepository membershipPlanRepository) {
        this.membershipPlanRepository = membershipPlanRepository;
    }

    @GetMapping
    public List<MembershipPlan> getMembershipPlans() {
        return membershipPlanRepository.findAll();
    }

    @GetMapping("/{id}")
    public MembershipPlan getMembershipPlanById(@PathVariable Long id) {
        return membershipPlanRepository.findById(id).orElse(null);
    }

    @PostMapping
    public MembershipPlan addMembershipPlan(@RequestBody MembershipPlan plan) {
        return membershipPlanRepository.save(plan);
    }

    @PutMapping("/{id}")
    public MembershipPlan updateMembershipPlan(
            @PathVariable Long id,
            @RequestBody MembershipPlan plan) {

        plan.setId(id);
        return membershipPlanRepository.save(plan);
    }

    @DeleteMapping("/{id}")
    public String deleteMembershipPlan(@PathVariable Long id) {
        membershipPlanRepository.deleteById(id);
        return "Membership plan deleted successfully";
    }
}