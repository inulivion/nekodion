package com.konekokonekone.nekodion.external.gmail.store;

import com.google.api.client.auth.oauth2.StoredCredential;
import com.google.api.client.util.store.AbstractDataStore;
import com.google.api.client.util.store.DataStore;
import com.google.api.client.util.store.DataStoreFactory;
import com.konekokonekone.nekodion.external.gmail.crypto.TokenEncryptor;
import com.konekokonekone.nekodion.external.gmail.entity.GmailCredentialEntity;
import com.konekokonekone.nekodion.external.gmail.repository.GmailCredentialRepository;

import java.io.IOException;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class JpaStoredCredentialDataStore extends AbstractDataStore<StoredCredential> {

    private final GmailCredentialRepository repository;
    private final TokenEncryptor tokenEncryptor;

    protected JpaStoredCredentialDataStore(DataStoreFactory factory, String id, GmailCredentialRepository repository, TokenEncryptor tokenEncryptor) {
        super(factory, id);
        this.repository = repository;
        this.tokenEncryptor = tokenEncryptor;
    }

    @Override
    public StoredCredential get(String key) throws IOException {
        return repository.findById(key)
                .map(entity -> {
                    StoredCredential cred = new StoredCredential();
                    cred.setAccessToken(tokenEncryptor.decrypt(entity.getAccessToken()));
                    cred.setRefreshToken(tokenEncryptor.decrypt(entity.getRefreshToken()));
                    cred.setExpirationTimeMilliseconds(entity.getExpirationTimeMs());
                    return cred;
                })
                .orElse(null);
    }

    @Override
    public DataStore<StoredCredential> set(String key, StoredCredential value) throws IOException {
        GmailCredentialEntity entity = repository.findById(key)
                .orElse(new GmailCredentialEntity());
        entity.setUserId(key);
        entity.setAccessToken(tokenEncryptor.encrypt(value.getAccessToken()));
        if (value.getRefreshToken() != null) {
            entity.setRefreshToken(tokenEncryptor.encrypt(value.getRefreshToken()));
        }
        entity.setExpirationTimeMs(value.getExpirationTimeMilliseconds());
        repository.save(entity);
        return this;
    }

    @Override
    public DataStore<StoredCredential> delete(String key) throws IOException {
        repository.deleteById(key);
        return this;
    }

    @Override
    public DataStore<StoredCredential> clear() throws IOException {
        repository.deleteAll();
        return this;
    }

    @Override
    public Set<String> keySet() throws IOException {
        return repository.findAll().stream()
                .map(GmailCredentialEntity::getUserId)
                .collect(Collectors.toSet());
    }

    @Override
    public Collection<StoredCredential> values() throws IOException {
        return repository.findAll().stream()
                .map(entity -> {
                    StoredCredential cred = new StoredCredential();
                    cred.setAccessToken(tokenEncryptor.decrypt(entity.getAccessToken()));
                    cred.setRefreshToken(tokenEncryptor.decrypt(entity.getRefreshToken()));
                    cred.setExpirationTimeMilliseconds(entity.getExpirationTimeMs());
                    return cred;
                })
                .collect(Collectors.toList());
    }
}
