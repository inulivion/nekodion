package com.konekokonekone.nekodion.api.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDetailResponse {

    private Long id;

    private Long accountId;

    private Long categoryId;

    private String transactionType;

    private String direction;

    private String transactionName;

    private BigDecimal amount;

    private LocalDateTime transactionDateTime;

    private String description;

    private Boolean isAggregated;

    private Boolean isDeletable;
}
