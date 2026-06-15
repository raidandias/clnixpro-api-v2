// src/prisma/prisma.middleware.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const { model, action, args } = params;

  console.log(`Queryyyyyys: ${model}.${action}`);

  // Verifique se o context tem accountId
  //@ts-ignore
  const accountId = params.context?.accountId;

  if (accountId) {
    // Adiciona o accountId ao where das queries
    if (args?.where) {
      args.where = {
        ...args.where,
        accountId: accountId,
      };
    } else {
      args.where = {
        accountId: accountId,
      };
    }
  }

  const result = await next(params);
  return result;
});

export default prisma;
