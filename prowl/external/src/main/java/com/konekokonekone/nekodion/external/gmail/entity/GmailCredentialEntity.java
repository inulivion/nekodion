package com.konekokonekone.nekodion.external.gmail.entity;

import com.konekokonekone.nekodion.support.entity.AbstractBaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "gmail_credentials")
@NoArgsConstructor
public class GmailCredentialEntity extends AbstractBaseEntity {

    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "access_token", columnDefinition = "TEXT")
    private String accessToken;

    @Column(name = "refresh_token", columnDefinition = "TEXT")
    private String refreshToken;

    @Column(name = "expiration_time_ms")
    private Long expirationTimeMs;
}
