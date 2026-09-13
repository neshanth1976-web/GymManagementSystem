package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;
    private String planName;
    private double amount;
    private String paymentDate;
    private String paymentMethod;
    private String status;

    public Payment(){}

    public Long getId(){ return id; }
    public void setId(Long id){ this.id=id; }

    public Long getMemberId(){ return memberId; }
    public void setMemberId(Long memberId){ this.memberId=memberId; }

    public String getPlanName(){ return planName; }
    public void setPlanName(String planName){ this.planName=planName; }

    public double getAmount(){ return amount; }
    public void setAmount(double amount){ this.amount=amount; }

    public String getPaymentDate(){ return paymentDate; }
    public void setPaymentDate(String paymentDate){ this.paymentDate=paymentDate; }

    public String getPaymentMethod(){ return paymentMethod; }
    public void setPaymentMethod(String paymentMethod){ this.paymentMethod=paymentMethod; }

    public String getStatus(){ return status; }
    public void setStatus(String status){ this.status=status; }
}