export class CreateAddressOutputDto {
  id: string;
  userId: string;
  label: string;
  street: string;
  city: string;
  state: string;
  country: string;
  complement?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
