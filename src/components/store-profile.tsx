import { Label } from './ui/label'
import { Button } from './ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './ui/dialog'
import { Input } from './ui/input'
import {
  GetManagedRestaurantResponse,
  getManagedRestaurant,
} from '@/api/get-managed-restaurant'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Textarea } from './ui/textarea'
import { updateProfile } from '@/api/update-profile'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function StoreProfile() {
  const queryClient = useQueryClient()

  const { data: storeProfile, isLoading: isLoadingStoreProfile } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { mutateAsync: updateProfileFn, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: updateProfile,
      onMutate: async ({ name, description }) => {
        const managedRestaurantCache =
          queryClient.getQueryData<GetManagedRestaurantResponse>([
            'managed-restaurant',
          ])

        if (managedRestaurantCache) {
          queryClient.setQueryData<GetManagedRestaurantResponse>(
            ['managed-restaurant'],
            {
              ...managedRestaurantCache,
              name,
              description,
            },
          )
        }
      },
    })

  async function handleUpdateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const name = data.name.toString()
    const description = data.description.toString()

    await updateProfileFn({
      name,
      description,
    })

    toast.success('Perfil atualizado com sucesso!')
  }

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis aos seus
          clientes.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleUpdateProfile}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              name="name"
              id="name"
              defaultValue={storeProfile?.name ?? ''}
              className="col-span-3"
              disabled={isLoadingStoreProfile}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-baseline gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              name="description"
              id="description"
              defaultValue={storeProfile?.description ?? ''}
              className="col-span-3 min-h-[100px]"
              disabled={isLoadingStoreProfile}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="success"
            disabled={isLoadingStoreProfile || isUpdatingProfile}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
