import { DataSource } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';

export const clientProviders = [
  {
    provide: 'CLIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Client),
    inject: ['DATA_SOURCE'],
  },
];
