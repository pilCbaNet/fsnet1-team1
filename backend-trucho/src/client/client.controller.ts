import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClientService } from './client.service';
import { AddBalanceDto } from './dto/add-balance.dto';

@Controller('client')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      return this.clientService.findOneByName(id);
    }
    return this.clientService.findOne(+id);
  }

  @Post('addbalance')
  addBalance(@Body() addBalanceDto: AddBalanceDto) {
    return this.clientService.addBalance(addBalanceDto);
  }
}
