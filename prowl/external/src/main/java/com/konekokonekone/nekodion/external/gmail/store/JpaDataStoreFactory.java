package com.konekokonekone.nekodion.external.gmail.store;

import com.google.api.client.util.store.AbstractDataStoreFactory;
import com.google.api.client.util.store.DataStore;
import com.konekokonekone.nekodion.external.gmail.crypto.TokenEncryptor;
import com.konekokonekone.nekodion.external.gmail.repository.GmailCredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@RequiredArgsConstructor
public class JpaDataStoreFactory extends AbstractDataStoreFactory {

    private final GmailCredentialRepository repository;
    private final TokenEncryptor tokenEncryptor;

    @Override
    @SuppressWarnings("unchecked")
    protected <V extends Serializable> DataStore<V> createDataStore(String id) {
        return (DataStore<V>) new JpaStoredCredentialDataStore(this, id, repository, tokenEncryptor);
    }
}
