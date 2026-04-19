package com.konekokonekone.nekodion.api.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AccountRequest {

    @NotBlank
    private String accountType;

    private Long accountTemplateId;

    @NotBlank
    private String accountName;
}
