package com.konekokonekone.nekodion.external.gmail.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.DataStoreFactory;
import com.google.api.services.gmail.GmailScopes;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.List;

@Service
public class GmailOAuthService {

    private static final GsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    private static final List<String> SCOPES = List.of(GmailScopes.GMAIL_READONLY);

    @Getter
    private final NetHttpTransport httpTransport;

    private final GoogleAuthorizationCodeFlow flow;

    public GmailOAuthService(@Value("${gmail.credentials-path}") String credentialsPath, DataStoreFactory dataStoreFactory) throws Exception {
        // GoogleのOAuthクライアントを初期化
        this.httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        GoogleClientSecrets clientSecrets;
        try (var reader = new InputStreamReader(new FileInputStream(credentialsPath))) {
            clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, reader);
        }
        // 認証フローを構築
        this.flow = new GoogleAuthorizationCodeFlow.Builder(
                httpTransport, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(dataStoreFactory)
                .setAccessType("offline")
                .build();
    }

    /**
     * ユーザーをGoogleの認証ページにリダイレクトするためのURLを生成する
     *
     * @param state CSRF攻撃を防止するためのランダムな文字列。コールバック時に同じ値が返されることを確認する。
     * @param redirectUri Googleの認証後にユーザーがリダイレクトされるURL。Google Cloud Consoleで設定したものと一致させる必要がある。
     * @return ユーザーをGoogleの認証ページにリダイレクトするためのURL
     */
    public String buildAuthorizationUrl(String state, String redirectUri) {
        return flow.newAuthorizationUrl()
                .setRedirectUri(redirectUri)
                .setState(state)
                .set("prompt", "consent")
                .build();
    }

    /**
     * Googleから返された認証コードをアクセストークンに交換し、ユーザーの資格情報を保存する
     *
     * @param userId ユーザーID
     * @param code Googleから返された認証コード
     * @param redirectUri Googleの認証後にユーザーがリダイレクトされるURL。Google Cloud Consoleで設定したものと一致させる必要がある。
     * @throws Exception 失敗
     */
    public void exchangeCodeForToken(String userId, String code, String redirectUri) throws Exception {
        GoogleTokenResponse tokenResponse = flow.newTokenRequest(code)
                .setRedirectUri(redirectUri)
                .execute();
        flow.createAndStoreCredential(tokenResponse, userId);
    }

    public boolean isAuthorized(String userId) throws IOException {
        return flow.loadCredential(userId) != null;
    }

    public Credential loadCredential(String userId) throws IOException {
        return flow.loadCredential(userId);
    }
}
