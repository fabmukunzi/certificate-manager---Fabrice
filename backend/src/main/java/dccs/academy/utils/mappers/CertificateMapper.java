package dccs.academy.utils.mappers;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.SupplierEntity;
import dccs.academy.utils.UtilityMethods;
import dccs.academy.utils.enums.CertificateType;

public class CertificateMapper {

    public static CertificateDto toDto(CertificateEntity certificateEntity) {
        CertificateDto certificateDto = new CertificateDto();
        certificateDto.setId(certificateEntity.getId());
        certificateDto.setValidFrom(certificateEntity.getValidFrom());
        certificateDto.setValidTo(certificateEntity.getValidTo());
        certificateDto.setType(CertificateType.stringToEnum(certificateEntity.getType().getDisplayName()));
        SupplierEntity supplier = certificateEntity.getSupplier();
        certificateDto.setSupplier(SupplierMapper.toDto(supplier));
        return certificateDto;
    }

    public static CertificateEntity toEntity(CertificateDto certificateDto, CertificateEntity entity) {
        entity.setValidFrom(certificateDto.getValidFrom());
        entity.setValidTo(certificateDto.getValidTo());
        entity.setType(certificateDto.getType());
        entity.setPdfUrl(UtilityMethods.decode(certificateDto.getPdfUrl()));
        return entity;
    }
}

