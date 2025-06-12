import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { EnvironmentConfig } from '../config/configuration';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const apiKey = request.headers['x-api-key'];
        const expectedApiKey = this.configService.get<EnvironmentConfig>('security.apiKey');
        
        console.log('API Key Check:');
        console.log('Received API Key:', apiKey);
        console.log('Expected API Key:', expectedApiKey);
        
        return apiKey === expectedApiKey;
    }
}
