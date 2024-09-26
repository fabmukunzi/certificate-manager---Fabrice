package dccs.academy.utils.mappers;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.dtos.CommentDto;
import dccs.academy.dtos.UserDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.CommentEntity;
import dccs.academy.entities.SupplierEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.repositories.UserRepository;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

public class CertificateMapper {
    @Inject
    static SupplierRepository supplierRepository;
    @Inject
    static UserRepository userRepository;

    public static CertificateDto toDto(CertificateEntity certificateEntity) {
        CertificateDto certificateDto = new CertificateDto();
        certificateDto.setId(certificateEntity.getId());
        certificateDto.setValidFrom(certificateEntity.getValidFrom());
        certificateDto.setValidTo(certificateEntity.getValidTo());
        certificateDto.setCertificateType(certificateEntity.getCertificateType());
        certificateDto.setPdfUrl(certificateEntity.getPdfUrl());
        if (certificateEntity.getSupplier() == null) {
            throw new EntityNotFoundException("Please provide a valid supplier id");
        }
        certificateDto.setSupplier(certificateEntity.getSupplier());
        return certificateDto;
    }

    public static CertificateEntity toEntity(CertificateDto certificateDto) {
        CertificateEntity entity = new CertificateEntity();
        entity.setValidFrom(certificateDto.getValidFrom());
        entity.setValidTo(certificateDto.getValidTo());
        entity.setCertificateType(certificateDto.getCertificateType());
        entity.setPdfUrl(certificateDto.getPdfUrl());
        return entity;
    }
}

