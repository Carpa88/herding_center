import { z } from "zod";

export interface ITrial {
  id: string;
  name: string;
  start_at: string;
  ends_on: string;
  judge_id: string;
  description?: string;
}

export interface ITrialError {
  id: string[];
  name: string[];
  start_at: string[];
  ends_on: string[];
  judge_id: string[];
  description?: string[];
}

export type PartialTrial = Partial<ITrialError>;

const FormSchema = z.object({
  id: z.string().min(3, { message: 'ID must be at least 3 characters long.' }),
  name: z.string().min(3, { message: 'Имя должно быть не короче трех символов' }),
  start_at: z.string().min(3, { message: 'Start date must be at least 3 characters long.' }),
  ends_on: z.string().min(3, { message: 'End date must be at least 3 characters long.' }),
  judge_id: z.string().min(3, { message: 'Judge ID must be at least 3 characters long.' }),
  description: z.string().nullable(),
});

export const CreateTrial = FormSchema.omit({ id: true });