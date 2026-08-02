package com.konekokonekone.nekodion.api.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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

    private BigDecimal balance;

    @Min(1)
    @Max(31)
    private Integer closingDay;
}
