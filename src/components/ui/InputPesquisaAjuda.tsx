import { Icon } from "@/script/Icon";
import type { InputPesquisaAjudaProps } from "@/types/ui/input-pesquisa-ajuda.types";

export function InputPesquisaAjuda({ value, onChange, placeholder = "Pesquise aqui a sua dúvida" }: InputPesquisaAjudaProps) {
  return (
    <div className="flex items-center gap-[8px] w-full h-[36px] border bg-neutral-25 border-neutral-100 rounded-lg p-[8px_8px_8px_4px] text-sm text-neutral-500 ">
      <Icon name="iconLupaPesquisar" />
      <input
        className="w-[90%] h-[20px] placeholder:text-neutral-500 outline-none px-2 bg-neutral-25"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
