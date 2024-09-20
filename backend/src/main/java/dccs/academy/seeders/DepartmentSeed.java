package dccs.academy.seeders;

import dccs.academy.dtos.DepartmentDto;
import dccs.academy.repositories.DepartmentRepository;
import dccs.academy.services.DepartmentService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import io.quarkus.runtime.StartupEvent;

import java.util.HashSet;

@ApplicationScoped
public class DepartmentSeed {

    @Inject
    DepartmentService departmentService;

    @Inject
    DepartmentRepository departmentRepository;

    @Transactional
    void onStart(@Observes StartupEvent ev) {
        seedDepartments();
    }

    public void seedDepartments() {
        var departments = new HashSet<String>();
        departments.add("HR");
        departments.add("Engineering");
        departments.add("Sales");
        departments.add("Marketing");
        departments.add("Finance");

        if (departmentRepository.listAll().isEmpty()) {
            for (String title : departments) {
                DepartmentDto departmentDto = new DepartmentDto();
                departmentDto.setTitle(title);
                departmentService.createDepartment(departmentDto);
            }
        }
    }
}
