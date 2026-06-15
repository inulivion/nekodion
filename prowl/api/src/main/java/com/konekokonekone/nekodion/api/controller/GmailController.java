package com.konekokonekone.nekodion.api.controller;

import com.konekokonekone.nekodion.api.response.GmailMessageResponse;
import com.konekokonekone.nekodion.api.security.CurrentUser;
import com.konekokonekone.nekodion.api.usecase.GmailUseCase;
import com.konekokonekone.nekodion.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gmail")
@RequiredArgsConstructor
public class GmailController {

    private final GmailUseCase gmailUseCase;

    @GetMapping("/messages")
    public ResponseEntity<List<GmailMessageResponse>> getMessages(
            @CurrentUser UserDto currentUser,
            @RequestParam String query,
            @RequestParam(defaultValue = "10") int maxResults
    ) {
        return ResponseEntity.ok(gmailUseCase.getMessages(currentUser.getId(), query, maxResults));
    }
}
