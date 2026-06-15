import { applyDecorators } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/output/error-fields.dto';

export function ApiCommonResponses() {
  return applyDecorators(
    ApiBadGatewayResponse({ description: 'Bad Gateway' }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: ErrorResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Not Found', type: ErrorResponseDto }),
    ApiRequestTimeoutResponse({ description: 'Request Timeout' }),
  );
}
