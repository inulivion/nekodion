package com.konekokonekone.nekodion.transaction.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionRequestDto {

    private Long accountId;

    private String transactionType;

    private String transactionName;

    private BigDecimal amount;

    private LocalDate transactionDate;

    private String description;
}
