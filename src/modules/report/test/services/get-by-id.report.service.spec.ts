import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReportEntity } from '../../domain/report.entity';
import { GetByIdReportService } from '../../services/get-by-id.report.service';
import { Repository } from 'typeorm';
import { TYPES } from '../../../file/interfaces/types';
import { IGetByIdReportService } from '../../interfaces/services/get-by-id.report.service.interface';

describe('GetByIdReportService', () => {
  let service: IGetByIdReportService;
  let repositoryMock: Repository<ReportEntity>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: TYPES.services.IGetByIdFileService,
          useClass: GetByIdReportService,
        },
        {
          provide: getRepositoryToken(ReportEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = app.get<IGetByIdReportService>(
      TYPES.services.IGetByIdFileService,
    );

    repositoryMock = app.get<Repository<ReportEntity>>(
      getRepositoryToken(ReportEntity),
    );

    return;
  });

  describe('findById', () => {
    it('should find report by id', async () => {
      const report: Partial<ReportEntity> = {
        id: '111AAA',
      };

      jest
        .spyOn(repositoryMock, 'findOne')
        .mockResolvedValue(report as ReportEntity);

      expect(await service.execute(report.id)).toEqual(report);
    });
  });
});
