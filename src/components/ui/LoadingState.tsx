export function LoadingState({ message = 'Carregando...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      <p className="text-gray-600">{message}</p>
    </div>
  )
}
