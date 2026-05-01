package com.konekokonekone.nekodion.transaction.service;

import com.konekokonekone.nekodion.support.exception.EntityExistException;
import com.konekokonekone.nekodion.support.exception.EntityNotFoundException;
import com.konekokonekone.nekodion.transaction.entity.Account;
import com.konekokonekone.nekodion.transaction.enums.AccountType;
import com.konekokonekone.nekodion.transaction.repository.AccountRepository;
import com.konekokonekone.nekodion.transaction.repository.AccountTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;

    private final AccountTemplateRepository accountTemplateRepository;

    /**
     * ユーザーの口座一覧取得
     *
     * @param userId ユーザーID
     * @return 口座一覧
     */
    public List<Account> findByUserId(String userId) {
        return accountRepository.findByUserIdWithTransactions(userId);
    }

    /**
     * 口座詳細取得
     *
     * @param id 口座ID
     * @param userId ユーザーID
     * @return 口座
     */
    public Account findByIdAndUserId(Long id, String userId) {
        return accountRepository.findByIdAndUserIdWithTransactions(id, userId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("口座が見つかりません。口座Id[%d]", id)));
    }

    /**
     * 口座作成
     *
     * @param userId ユーザーID
     * @param accountTypeString 口座種別文字列
     * @param accountTemplateId 口座テンプレートID（任意）
     * @param accountName 口座名
     * @param initialAmount 初期残高（任意、null は 0 扱い）
     */
    public void createAccount(String userId, String accountTypeString, Long accountTemplateId, String accountName, BigDecimal initialAmount) {
        var exists = accountRepository.existsByUserIdAndAccountName(userId, accountName);
        if (exists) {
            throw new EntityExistException(String.format("既に登録済みです。口座名[%s]", accountName));
        }

        var account = new Account();
        account.setAccountType(AccountType.codeOf(accountTypeString));
        account.setAccountName(accountName);
        account.setUserId(userId);
        account.setInitialAmount(initialAmount != null ? initialAmount : BigDecimal.ZERO);

        if (accountTemplateId != null) {
            var template = accountTemplateRepository.findById(accountTemplateId)
                    .orElseThrow(() -> new EntityNotFoundException(String.format("口座テンプレートが見つかりません。口座テンプレートId[%d]", accountTemplateId)));
            account.setAccountTemplate(template);
        }

        accountRepository.save(account);
    }

    /**
     * 口座更新
     *
     * @param id 口座ID
     * @param userId ユーザーID
     * @param accountTypeString 口座種別文字列
     * @param accountTemplateId 口座テンプレートID（任意）
     * @param accountName 口座名
     */
    public void updateAccount(Long id, String userId, String accountTypeString, Long accountTemplateId, String accountName) {
        var account = accountRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("口座が見つかりません。口座Id[%d]", id)));

        if (!account.getAccountName().equals(accountName)) {
            var exists = accountRepository.existsByUserIdAndAccountName(userId, accountName);
            if (exists) {
                throw new EntityExistException(String.format("既に登録済みです。口座名[%s]", accountName));
            }
        }

        account.setAccountType(AccountType.codeOf(accountTypeString));
        account.setAccountName(accountName);

        if (accountTemplateId != null) {
            var template = accountTemplateRepository.findById(accountTemplateId)
                    .orElseThrow(() -> new EntityNotFoundException(String.format("口座テンプレートが見つかりません。口座テンプレートId[%d]", accountTemplateId)));
            account.setAccountTemplate(template);
        } else {
            account.setAccountTemplate(null);
        }

        accountRepository.save(account);
    }

    /**
     * 口座削除
     *
     * @param id 口座ID
     * @param userId ユーザーID
     */
    public void deleteAccount(Long id, String userId) {
        var account = accountRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("口座が見つかりません。口座Id[%d]", id)));
        accountRepository.delete(account);
    }
}
