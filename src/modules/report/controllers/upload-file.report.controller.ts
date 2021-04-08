import { Inject, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { AuthController } from 'common/decorators/auth-controller.decorator';

import { FileDto } from 'modules/file/dto';
import {
  TYPES as TYPES_FILES,
  ICreateFileApplication,
} from 'modules/file/interfaces';
import { OnlyAuthor } from '../guard/only-author.report.guard';

@AuthController('reports')
export class UploadFileReportController {
  constructor(
    @Inject(TYPES_FILES.applications.ICreateFileApplication)
    private createFileApplication: ICreateFileApplication,
  ) {}

  @ApiCreatedResponse({ type: FileDto })
  @UseGuards(OnlyAuthor)
  @Put(':reportId/:fileName')
  async handler(
    @Req() stream: Request,
    @Param('reportId') reportId: string,
    @Param('fileName') fileName: string,
  ): Promise<FileDto> {
    const file = await this.createFileApplication.execute({
      bucket: reportId,
      fileName,
      stream,
    });

    return file;
  }
}
