import { User } from '@prisma/client';
import { Request, Response } from 'express';

export interface RequestCustom extends Request {
  user: User;
}

export interface ResponseCustom extends Response {}

export interface ResponseData<T extends Record<string, any> = any> {
  statusCode: number;
  message: string;
  data: T | null;
  success: boolean;
}
