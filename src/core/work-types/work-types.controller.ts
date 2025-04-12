import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WorkType } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { JwtRequest, JwtPayload } from 'src/tokens/tokens.types';
import { WorkTypesService } from './work-types.service';
import { CreateWorkTypeDto } from './dto/create-work-type.dto';
import { UpdateWorkTypeDto } from './dto/update-work-type.dto';

@Controller('work-types')
export class WorkTypesController {
  constructor(
    private readonly workTypesService: WorkTypesService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: JwtRequest, @Body() dto: CreateWorkTypeDto): Promise<WorkType> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const workType = await this.workTypesService.create(userId, dto);
    return workType;
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: JwtRequest): Promise<WorkType[]> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const workTypes = await this.workTypesService.findAll(userId);
    return workTypes;
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) workTypeId: number,
    @Req() req: JwtRequest,
    @Body() dto: UpdateWorkTypeDto,
  ): Promise<WorkType> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const workType = await this.workTypesService.update(userId, workTypeId, dto);
    return workType;
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) workTypeId: number,
    @Req() req: JwtRequest,
  ): Promise<WorkType> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const workType = await this.workTypesService.delete(userId, workTypeId);
    return workType;
  }
}
