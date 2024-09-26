package dccs.academy.seeders;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.services.SupplierService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
@Transactional
public class SupplierSeed {

    @Inject
    SupplierService supplierService;
    @Inject
    SupplierRepository supplierRepository;

    public void seedSuppliers() {
        List<SupplierDto> suppliers = new ArrayList<>();

        SupplierDto supplier1 = new SupplierDto();
        supplier1.setName("Fabrice Mukunzi");
        supplier1.setCity("Kigali");
        suppliers.add(supplier1);

        SupplierDto supplier2 = new SupplierDto();
        supplier2.setName("Vicky Luanda");
        supplier2.setCity("Luanda");
        suppliers.add(supplier2);

        SupplierDto supplier3 = new SupplierDto();
        supplier3.setName("Adele Sambo");
        supplier3.setCity("Kanata");
        suppliers.add(supplier3);

        SupplierDto supplier4 = new SupplierDto();
        supplier4.setName("Thulani Chris");
        supplier4.setCity("Cape Town");
        suppliers.add(supplier4);

        SupplierDto supplier5 = new SupplierDto();
        supplier5.setName("Lee Mojaki");
        supplier5.setCity("Midland");
        suppliers.add(supplier5);

        SupplierDto supplier6 = new SupplierDto();
        supplier6.setName("Patience Butera");
        supplier6.setCity("Lehigh");
        suppliers.add(supplier6);

        SupplierDto supplier7 = new SupplierDto();
        supplier7.setName("Paccy Masengesho");
        supplier7.setCity("Lehigh");
        suppliers.add(supplier7);

        if(supplierRepository.count()==0){
            for (SupplierDto supplier : suppliers) {
                supplierService.createSupplier(supplier);
            }
        }
    }
}
