package com.konekokonekone.nekodion.api.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionRequest {

    @NotNull
    private Long accountId;

    @NotBlank
    private String transactionType;

    @NotBlank
    private String transactionName;

    @NotNull
    @Positive
    private BigDecimal amount;

    @NotNull
    private LocalDate transactionDate;

    private String description;
}
