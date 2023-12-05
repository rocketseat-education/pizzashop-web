import { useMutation } from '@tanstack/react-query'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'

export function SignIn() {
  const { mutateAsync: authenticate, isPending: isAuthenticating } =
    useMutation({
      mutationFn: async (email: string) => {
        await api.post('/authenticate', { email })
      },
    })

  async function handleAuthenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const email = data.email.toString()

    await authenticate(email)

    toast.success('Enviamos um link de autenticação para seu e-mail.', {
      action: {
        label: 'Reenviar',
        onClick: () => authenticate(email),
      },
    })
  }

  return (
    <div className="lg:p-8">
      <a
        href="/sign-up"
        className={twMerge(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        Novo estabelecimento
      </a>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleAuthenticate}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                />
              </div>

              <Button type="submit" disabled={isAuthenticating}>
                Acessar painel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
