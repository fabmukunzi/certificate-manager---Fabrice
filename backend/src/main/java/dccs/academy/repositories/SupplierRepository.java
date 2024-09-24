package dccs.academy.repositories;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.entities.SupplierEntity;
import dccs.academy.entities.SupplierEntity_;
import dccs.academy.utils.SearchQueryBuilder;
import dccs.academy.utils.mappers.SupplierMapper;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class SupplierRepository implements PanacheRepository<SupplierEntity> {

    @Inject
    EntityManager entityManager;

    public List<SupplierDto> supplierSearch(String name, String city, String index){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        Map<String, Object> conditions = new HashMap<>();
        conditions.put(SupplierEntity_.NAME, name);
        conditions.put(SupplierEntity_.CITY, city);
        conditions.put(SupplierEntity_.INDEX, index);
        List<SupplierEntity> suppliers = entityManager.createQuery(SearchQueryBuilder.searchQueryBuilder(SupplierEntity.class,cb,conditions)).getResultList();
        return suppliers.stream().map(SupplierMapper::toDto).collect(Collectors.toList());
    }

}
