package com.konekokonekone.nekodion.external.gmail.repository;

import com.konekokonekone.nekodion.external.gmail.entity.GmailCredentialEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GmailCredentialRepository extends JpaRepository<GmailCredentialEntity, String> {
}
