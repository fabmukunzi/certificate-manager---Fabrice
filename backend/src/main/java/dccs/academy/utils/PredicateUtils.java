package dccs.academy.utils;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;

public class PredicateUtils {

  public static Predicate createLikePredicate(
      CriteriaBuilder cb, Expression<String> field, String value) {
    if (value == null) {
      return null;
    }
    return cb.like(cb.lower(field), "%" + value.toLowerCase().trim() + "%");
  }
}
