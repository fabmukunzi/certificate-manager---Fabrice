package dccs.academy.seeders;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.enterprise.event.Startup;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class SeedsRunner {
    @Inject DepartmentSeed departmentSeed;
    @Inject UserSeed userSeed;
    @Inject SupplierSeed supplierSeed;
    @Transactional
    void onStart(@Observes Startup event){
        departmentSeed.seedDepartments();
        userSeed.seedUser();
        supplierSeed.seedSuppliers();
    }
}
