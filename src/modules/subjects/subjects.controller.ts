import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Subject } from '@prisma/client';
import { AccessTokenGuard } from '../iam/jwt-token/guards/access-token.guard';
import { JwtPayload, JwtRequest } from '../iam/jwt-token/interfaces/jwt-token.interface';
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
  findById(@Param('id') id: string): Promise<Subject> {
    return this.subjectsService.findById(id);
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
