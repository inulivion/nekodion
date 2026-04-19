package com.konekokonekone.nekodion.api.controller;

import com.konekokonekone.nekodion.api.request.AccountRequest;
import com.konekokonekone.nekodion.api.response.AccountDetailResponse;
import com.konekokonekone.nekodion.api.response.AccountSummaryResponse;
import com.konekokonekone.nekodion.api.response.AccountTemplateResponse;
import com.konekokonekone.nekodion.api.usecase.AccountUseCase;
import com.konekokonekone.nekodion.api.security.CurrentUser;
import com.konekokonekone.nekodion.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountUseCase accountUseCase;

    @GetMapping
    public ResponseEntity<List<AccountSummaryResponse>> getAccounts(
            @CurrentUser UserDto currentUser) {
        return ResponseEntity.ok(accountUseCase.getAccounts(currentUser.getId()));
    }

    @GetMapping("/templates")
    public ResponseEntity<List<AccountTemplateResponse>> getAccountTemplates() {
        return ResponseEntity.ok(accountUseCase.getAccountTemplates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDetailResponse> getAccount(
            @CurrentUser UserDto currentUser,
            @PathVariable Long id) {
        return ResponseEntity.ok(accountUseCase.getAccount(id, currentUser.getId()));
    }

    @PostMapping
    public ResponseEntity<Void> createAccount(
            @CurrentUser UserDto currentUser,
            @RequestBody @Validated AccountRequest request) {
        accountUseCase.createAccount(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<Void> updateAccount(
            @CurrentUser UserDto currentUser,
            @PathVariable Long id,
            @RequestBody @Validated AccountRequest request) {
        accountUseCase.updateAccount(id, currentUser.getId(), request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(
            @CurrentUser UserDto currentUser,
            @PathVariable Long id) {
        accountUseCase.deleteAccount(id, currentUser.getId());
        return ResponseEntity.noContent().build();
    }
}
