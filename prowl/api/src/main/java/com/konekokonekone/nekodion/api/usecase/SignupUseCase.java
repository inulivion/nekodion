package com.konekokonekone.nekodion.api.usecase;

import com.konekokonekone.nekodion.transaction.service.AccountService;
import com.konekokonekone.nekodion.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SignupUseCase {

    private final UserService userService;

    private final AccountService accountService;

    public void syncUser(Jwt jwt) {
        String auth0Id = jwt.getClaimAsString("sub");
        String email = jwt.getClaimAsString("http://claim/email");

        var newUserId = userService.saveUserIfNotExists(auth0Id, email);
        if (newUserId != null) {
            accountService.createUncategorizedAccount(newUserId);
        }
    }
}
