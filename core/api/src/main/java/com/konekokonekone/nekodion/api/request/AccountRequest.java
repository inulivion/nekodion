package com.konekokonekone.nekodion.api.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AccountRequest {

    @NotBlank
    private String accountType;

    private Long accountTemplateId;

    @NotBlank
    private String accountName;

    private BigDecimal initialAmount;
}
