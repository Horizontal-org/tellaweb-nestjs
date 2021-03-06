import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RemoteConfigurationEntity } from '../domain';
import { EditRemoteConfigurationDto } from '../dto';
import { NotFoundRemoteConfigurationException } from '../exceptions';
import { IEditRemoteConfigurationService } from '../interfaces';

@Injectable()
export class EditRemoteConfigurationService
  implements IEditRemoteConfigurationService {
  constructor(
    @InjectRepository(RemoteConfigurationEntity)
    private remoteConfigurationRepository: Repository<RemoteConfigurationEntity>,
  ) {}
  async execute(
    editRemoteConfigurationDto: EditRemoteConfigurationDto,
  ): Promise<RemoteConfigurationEntity> {
    try {
      const configuration = await this.remoteConfigurationRepository.findOne(
        editRemoteConfigurationDto.id,
      );

      configuration.name = editRemoteConfigurationDto.name;
      configuration.camouflage = editRemoteConfigurationDto.camouflage;
      configuration.crashReports = editRemoteConfigurationDto.crashReports;
      configuration.serversVisible = editRemoteConfigurationDto.serversVisible;
      
      return this.remoteConfigurationRepository.save(configuration);
    } catch (_) {
      throw new NotFoundRemoteConfigurationException(
        editRemoteConfigurationDto.id,
      );
    }
  }
}
