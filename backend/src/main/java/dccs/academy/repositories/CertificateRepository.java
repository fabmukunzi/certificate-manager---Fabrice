package dccs.academy.repositories;

import dccs.academy.entities.CertificateEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class CertificateRepository implements PanacheRepository<CertificateEntity> {
}
