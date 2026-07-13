package com.konekokonekone.nekodion.category.service;

import com.konekokonekone.nekodion.category.entity.Category;
import com.konekokonekone.nekodion.category.entity.CategoryMapping;
import com.konekokonekone.nekodion.category.repository.CategoryMappingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryMappingService {

    private final CategoryMappingRepository categoryMappingRepository;

    private final CategoryService categoryService;

    /**
     * 取引名からカテゴリーを解決する。マッチしない場合は未分類を返す。
     * ユーザー固有マッピングを優先し、次にグローバルマッピングを参照する。
     *
     * @param userId          ユーザーID
     * @param transactionName 取引名（完全一致）
     * @param isIncome        収入ならtrue
     * @return 解決されたカテゴリー
     */
    public Category resolveCategory(String userId, String transactionName, boolean isIncome) {
        var userMatch = categoryMappingRepository.findMatchingByUserId(userId, transactionName)
                .stream().findFirst();
        if (userMatch.isPresent()) {
            return userMatch.get().getCategory();
        }
        return categoryMappingRepository.findMatchingGlobal(transactionName)
                .stream().findFirst()
                .map(CategoryMapping::getCategory)
                .orElseGet(() -> categoryService.findUnclassified(isIncome));
    }

    /**
     * ユーザー固有のキーワードマッピングを保存する。同一キーワードが既に存在する場合は上書き。
     *
     * @param userId          ユーザーID
     * @param transactionName 取引名（マッピングキーワードとして使用）
     * @param category        紐づけるカテゴリー
     */
    public void upsertMapping(String userId, String transactionName, Category category) {
        var mapping = categoryMappingRepository.findByUserIdAndKeyword(userId, transactionName)
                .orElseGet(CategoryMapping::new);
        mapping.setUserId(userId);
        mapping.setKeyword(transactionName);
        mapping.setCategory(category);
        categoryMappingRepository.save(mapping);
    }
}
