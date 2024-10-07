package dccs.academy.repositories;

import dccs.academy.entities.CommentEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class CommentRepository implements PanacheRepository<CommentEntity> {}
