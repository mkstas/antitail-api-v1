import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Subject } from '@prisma/client';
import { JwtPayload, JwtRequest } from 'src/common/utils/jwt-cookies';
import { AccessTokenGuard } from '../iam/auth/guards/access-token.guard';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly subjectsService: SubjectsService,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Req() req: JwtRequest, @Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const { sub: phoneId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    return this.subjectsService.create(phoneId, createSubjectDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(@Req() req: JwtRequest): Promise<Subject[]> {
    const { sub: phoneId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    return this.subjectsService.findAll(phoneId);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string): Promise<Subject> {
    return this.subjectsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string): Promise<Subject> {
    return this.subjectsService.remove(id);
  }
}
