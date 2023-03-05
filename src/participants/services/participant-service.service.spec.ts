import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantServiceService } from './participant-service.service';

describe('ParticipantServiceService', () => {
  let service: ParticipantServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantServiceService],
    }).compile();

    service = module.get<ParticipantServiceService>(ParticipantServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
