import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import * as faker from 'faker';
import { CommandBus } from '@nestjs/cqrs';
import { GetRandomResult } from './get-random/get-random.result';

describe('Quotes Controller', () => {
    let controller: QuotesController;
    let commandBus: CommandBus;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuotesController],
            providers: [CommandBus],
        }).compile();

        controller = module.get<QuotesController>(QuotesController);
        commandBus = module.get(CommandBus);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('fetches a random quote', async () => {
        const randomResult = new GetRandomResult(
            faker.name.firstName(),
            faker.random.words(20),
        );

        jest.spyOn(commandBus, 'execute').mockImplementation(() =>
            Promise.resolve(randomResult),
        );

        const response: GetRandomResult = await controller.getRandom();

        expect(response).toEqual(randomResult);
    });
});
