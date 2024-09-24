package dccs.academy.repositories;

import dccs.academy.entities.DepartmentEntity;
import dccs.academy.entities.DepartmentEntity_;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class DepartmentRepository implements PanacheRepository<DepartmentEntity> {
    @Inject
    EntityManager entityManager;
    public DepartmentEntity findDepartmentByTitle(String title) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<DepartmentEntity> query = cb.createQuery(DepartmentEntity.class);
        Root<DepartmentEntity> root = query.from(DepartmentEntity.class);

        query.select(root).where(cb.equal(cb.lower(root.get(DepartmentEntity_.TITLE)), title.trim().toLowerCase()));

        return entityManager.createQuery(query).getResultStream().findFirst().orElse(null);
    }
}
