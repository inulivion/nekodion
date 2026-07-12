package com.konekokonekone.nekodion.api.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TransactionRequest {

    private Long accountId;

    @NotNull
    private Long categoryId;

    @NotBlank
    private String transactionType;

    @NotBlank
    private String direction;

    @NotBlank
    private String transactionName;

    @NotNull
    @Positive
    private BigDecimal amount;

    @NotNull
    private LocalDateTime transactionDateTime;

    private String description;

    private Boolean isAggregated;
}
