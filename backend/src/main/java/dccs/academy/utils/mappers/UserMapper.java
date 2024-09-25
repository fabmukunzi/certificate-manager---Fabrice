package dccs.academy.utils.mappers;

import dccs.academy.dtos.UserDto;
import dccs.academy.entities.UserEntity;

public class UserMapper {

    public static UserEntity toEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setLastName(userDto.getLastName());
        userEntity.setPlant(userDto.getPlant());

        return userEntity;
    }

    public static UserDto toDto(UserEntity userEntity) {
        if (userEntity == null) {
            return null;
        }
        UserDto userDto = new UserDto();
        userDto.setId(userEntity.getId());
        userDto.setFirstName(userEntity.getFirstName());
        userDto.setLastName(userEntity.getLastName());
        userDto.setPlant(userEntity.getPlant());
        userDto.setDepartmentId(userEntity.getDepartment().getId());

        return userDto;
    }
}
