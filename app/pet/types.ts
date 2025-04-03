import { z } from '@node_modules/zod';

export type ISex = 'female' | 'male';
export type IPetType = 'dog' | 'cat';

export interface IDogCreated {
  name: string;
  breed: string;
  birth_year: number;
  sex: ISex;
  owner_id: string;
  type: IPetType;
}

export interface IDog extends IDogCreated {
  id: string;
}

export interface IDogCreatedError {
  name: string[];
  breed: string[];
  birth_year: string[];
  sex: string[];
  type: string[];
  owner_id: string[];
}

export type PartialDog = Partial<IDogCreatedError>;

const currentYear = new Date().getFullYear();

const PetFormSchema = z.object({
  id: z.string().min(3, { message: 'ID должно быть минимум три символа' }),
  name: z
    .string()
    .min(3, { message: 'Имя должно быть не короче трех символов' }),
  breed: z
    .string()
    .min(3, { message: 'Строка должна содержать минимум три символа' }),
  birth_year: z
    .number()
    .int('Год должен быть целым числом')
    .gte(1000, 'Год должен состоять из 4 цифр')
    .lte(currentYear, `Год не может быть больше ${currentYear}`),
  sex: z.enum(['male', 'female'], {
    errorMap: () => ({
      message:
        'Т.к биологических пола только два, вам придется выбрать: сука или кабель',
    }),
  }),
  type: z.enum(['dog', 'cat'], {
    errorMap: () => ({
      message: 'В настоящее время, мы готовы принять только собак или котов',
    }),
  }),
  owner_id: z
    .string()
    .min(3, { message: 'ID должно быть минимум три символа' }),
});

export const CreatePetSchema = PetFormSchema.omit({ id: true, owner_id: true });
