import { api } from '@/lib/axios'

export interface RegisterRestaurantRequest {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function RegisterRestaurant({
  restaurantName,
  managerName,
  email,
  phone,
}: RegisterRestaurantRequest) {
  await api.post('/restaurants', { restaurantName, managerName, email, phone })
}
