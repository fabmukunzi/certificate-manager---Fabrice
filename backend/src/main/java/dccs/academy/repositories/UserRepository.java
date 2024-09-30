package dccs.academy.repositories;

import dccs.academy.dtos.UserDto;
import dccs.academy.entities.DepartmentEntity;
import dccs.academy.entities.DepartmentEntity_;
import dccs.academy.entities.UserEntity;
import dccs.academy.entities.UserEntity_;
import dccs.academy.utils.PredicateUtils;
import dccs.academy.utils.SearchQueryBuilder;
import dccs.academy.utils.mappers.UserMapper;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class UserRepository implements PanacheRepository<UserEntity> {
    @Inject
    DepartmentRepository departmentRepository;
    @Inject
    EntityManager entityManager;

    public List<UserDto> userSearch(String firstName, String lastName, String plant, String userId, String department) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        var query = cb.createQuery(UserEntity.class);
        var root = query.from(UserEntity.class);
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(PredicateUtils.createLikePredicate(cb, root.get(UserEntity_.FIRST_NAME), firstName));
        predicates.add(PredicateUtils.createLikePredicate(cb, root.get(UserEntity_.LAST_NAME), lastName));
        predicates.add(PredicateUtils.createLikePredicate(cb, root.get(UserEntity_.PLANT), plant));
        predicates.add(PredicateUtils.createLikePredicate(cb, root.get(UserEntity_.USER_ID), userId));
        if (department != null) {
            var departmentJoin = root.join(UserEntity_.DEPARTMENT);
            predicates.add(PredicateUtils.createLikePredicate(cb, departmentJoin.get(DepartmentEntity_.TITLE), department));
        }
        query.select(root).where(cb.and(predicates.stream().filter(Objects::nonNull).toArray(Predicate[]::new)));
        var users = entityManager.createQuery(query).getResultList();
        return users.stream().map(UserMapper::toDto).collect(Collectors.toList());
    }

}
