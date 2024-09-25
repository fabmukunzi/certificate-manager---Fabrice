package dccs.academy.utils.mappers;

import dccs.academy.dtos.DepartmentDto;
import dccs.academy.entities.DepartmentEntity;

public class DepartmentMapper {

    public static DepartmentEntity toEntity(DepartmentDto departmentDto) {
        if (departmentDto == null) {
            return null;
        }

        DepartmentEntity departmentEntity = new DepartmentEntity();
        departmentEntity.setTitle(departmentDto.getTitle());
        return departmentEntity;
    }

    public static DepartmentDto toDto(DepartmentEntity departmentEntity) {
        if (departmentEntity == null) {
            return null;
        }

        DepartmentDto departmentDto = new DepartmentDto();
        departmentDto.setId(departmentEntity.getId());
        departmentDto.setTitle(departmentEntity.getTitle());
        return departmentDto;
    }
}
