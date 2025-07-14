import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async extensions() {
    return this.$extends({
      query: {
        $allModels: {
          delete: async ({ model, args }) => {
            await this[model].update({
              where: args.where,
              data: { deletedAt: new Date() },
            });
          },

          deleteMany: async ({ model, args }) => {
            await this[model].updateMany({
              where: args.where,
              data: { deletedAt: new Date() },
            });
          },

          findFirst: async ({ model, args, query }) => {
            args.where = { ...args.where, deletedAt: null };
            return await query(args);
          },

          findMany: async ({ model, args, query }) => {
            args.where = { ...args.where, deletedAt: null };
            return await query(args);
          },

          findUnique: async ({ args, query }) => {
            args.where = { ...args.where, deletedAt: null };
            return await query(args);
          },

          count: async ({ model, args, query }) => {
            args.where = { ...args.where, deletedAt: null };
            return await query(args);
          },
        },
      },
    });
  }
}
