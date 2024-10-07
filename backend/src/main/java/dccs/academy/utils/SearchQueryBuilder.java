package dccs.academy.utils;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SearchQueryBuilder {
  public static <T> CriteriaQuery<T> searchQueryBuilder(
      Class<T> entityClass, CriteriaBuilder cb, Map<String, Object> conditions) {
    CriteriaQuery<T> query = cb.createQuery(entityClass);
    Root<T> root = query.from(entityClass);

    List<Predicate> predicates = new ArrayList<>();

    for (Map.Entry<String, Object> condition : conditions.entrySet()) {
      String field = condition.getKey();
      Object value = condition.getValue();
      if (value != null) {
        if (value instanceof String) {
          predicates.add(
              cb.like(
                  cb.lower(root.get(field)), "%" + value.toString().toLowerCase().trim() + "%"));
        } else {
          predicates.add(cb.equal(root.get(field), value));
        }
      }
    }

    return query.where(cb.and(predicates.toArray(new Predicate[0])));
  }
}
