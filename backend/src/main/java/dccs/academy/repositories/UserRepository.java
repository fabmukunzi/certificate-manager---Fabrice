package dccs.academy.repositories;

import dccs.academy.dtos.UserDto;
import dccs.academy.entities.DepartmentEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.entities.UserEntity_;
import dccs.academy.utils.SearchQueryBuilder;
import dccs.academy.utils.mappers.UserMapper;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class UserRepository implements PanacheRepository<UserEntity> {
    @Inject DepartmentRepository departmentRepository;
    @Inject
    EntityManager entityManager;

    public List<UserDto> userSearch(String firstName, String lastName, String plant, String userId , String department){
        CriteriaBuilder cb= getEntityManager().getCriteriaBuilder();
        Map<String,Object> conditions=new HashMap<>();
        conditions.put(UserEntity_.FIRST_NAME,firstName);
        conditions.put(UserEntity_.LAST_NAME,lastName);
        conditions.put(UserEntity_.PLANT,plant);
        conditions.put(UserEntity_.USER_ID,userId);
        if (department != null) {
            var departmentEntity = departmentRepository.findDepartmentByTitle(department);
            if (departmentEntity == null) {
                return new ArrayList<>();
            }
            conditions.put(UserEntity_.DEPARTMENT,departmentEntity);
        }
        var users= entityManager.createQuery(SearchQueryBuilder.searchQueryBuilder(UserEntity.class,cb,conditions)).getResultList();
        return users.stream().map(UserMapper::toDto).collect(Collectors.toList());
    }
}
