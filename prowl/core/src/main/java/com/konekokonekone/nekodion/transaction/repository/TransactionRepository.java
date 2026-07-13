package com.konekokonekone.nekodion.transaction.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.konekokonekone.nekodion.transaction.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    /**
     * 既読の入出金一覧取得（通常一覧用。初期残高・残高調整の取引は含めない）
     */
    @Query("""
            SELECT
                t
            FROM
                Transaction t
            WHERE
                t.userId = :userId
                AND t.isRead = true
                AND t.transactionType <> 'ADJUSTMENT'
            ORDER BY
                t.transactionDateTime DESC
            """)
    List<Transaction> findByUserId(String userId);

    /**
     * 未読の入出金一覧取得
     */
    @Query("""
            SELECT
                t
            FROM
                Transaction t
            WHERE
                t.userId = :userId
                AND t.isRead = false
            ORDER BY
                t.transactionDateTime DESC
            """)
    List<Transaction> findUnreadByUserId(String userId);

    /**
     * 未読の入出金件数取得
     */
    @Query("""
            SELECT
                COUNT(t)
            FROM
                Transaction t
            WHERE
                t.userId = :userId
                AND t.isRead = false
            """)
    long countUnreadByUserId(String userId);

    /**
     * 指定IDの入出金を既読にする（ユーザー所有確認込み）
     */
    @Modifying
    @Query("""
            UPDATE
                Transaction t
            SET
                t.isRead = true
            WHERE
                t.userId = :userId
                AND t.id IN :ids
            """)
    void markAsReadByIds(String userId, List<Long> ids);

    Optional<Transaction> findByIdAndUserId(Long id, String userId);

    /**
     * CREDITを除く入金合計を取得（総資産計算用）
     */
    @Query("""
            SELECT
                COALESCE(SUM(t.amount), 0)
            FROM
                Transaction t
            WHERE
                t.userId = :userId
                AND t.direction IN ('IN')
                AND t.account.accountType <> 'CREDIT'
                AND t.account.accountType <> 'UNCATEGORIZED'
            """)
    BigDecimal sumInExcludingCredit(String userId);

    /**
     * CREDITを除く出金合計を取得（総資産計算用）
     */
    @Query("""
            SELECT
                COALESCE(SUM(t.amount), 0)
            FROM
                Transaction t
            WHERE
                t.userId = :userId
                AND t.direction IN ('OUT')
                AND t.account.accountType <> 'CREDIT'
                AND t.account.accountType <> 'UNCATEGORIZED'
            """)
    BigDecimal sumOutExcludingCredit(String userId);

    /**
     * 月次収入合計を取得
     */
    @Query("""
            SELECT
                COALESCE(SUM(t.amount), 0)
            FROM
                Transaction t
            WHERE
                t.userId = :userId
                AND t.direction IN ('IN')
                AND YEAR(t.transactionDateTime) = :year
                AND MONTH(t.transactionDateTime) = :month
                AND t.isAggregated = true
            """)
    BigDecimal sumInOutByMonth(String userId, int year, int month);

    /**
     * 月次支出合計を取得
     */
    @Query("""
            SELECT
                COALESCE(SUM(t.amount), 0)
            FROM
                Transaction t
            WHERE
                t.userId = :userId
                AND t.direction IN ('OUT')
                AND YEAR(t.transactionDateTime) = :year
                AND MONTH(t.transactionDateTime) = :month
                AND t.isAggregated = true
            """)
    BigDecimal sumExpenseByMonth(String userId, int year, int month);

    /**
     * 月次カテゴリー種別ごとの金額集計を取得
     * [0] categoryTypeName (String)
     * [1] isIncome (Boolean)
     * [2] totalAmount (BigDecimal)
     */
    @Query("""
            SELECT
                ct.categoryTypeName,
                ct.isIncome,
                COALESCE(SUM(t.amount), 0)
            FROM
                Transaction t
                JOIN t.category c
                JOIN c.categoryType ct
            WHERE
                t.userId = :userId
                AND YEAR(t.transactionDateTime) = :year
                AND MONTH(t.transactionDateTime) = :month
                AND t.isAggregated = true
            GROUP BY
                ct.id, ct.categoryTypeName, ct.isIncome
            ORDER BY
                SUM(t.amount) DESC
            """)
    List<Object[]> sumByCategoryType(String userId, int year, int month);
}
